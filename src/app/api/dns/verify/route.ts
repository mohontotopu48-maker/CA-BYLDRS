import { NextRequest, NextResponse } from "next/server";

// Uses Cloudflare DNS-over-HTTPS (no auth needed) to verify DNS records
const CF_DOH = "https://cloudflare-dns.com/dns-query";
const GOOGLE_DOH = "https://dns.google/resolve";

interface DNSQueryResult {
  Status: number;
  TC: boolean;
  RD: boolean;
  RA: boolean;
  AD: boolean;
  CD: boolean;
  Question: Array<{ name: string; type: number }>;
  Answer?: Array<{ name: string; type: number; TTL: number; data: string }>;
  Authority?: Array<{ name: string; type: number; TTL: number; data: string }>;
}

function parseCnameAnswer(answer: DNSQueryResult): { found: boolean; target: string; ttl: number } {
  if (!answer.Answer || answer.Answer.length === 0) {
    return { found: false, target: "", ttl: 0 };
  }

  const cnameRecord = answer.Answer.find((a) => a.type === 5);
  if (cnameRecord) {
    return { found: true, target: cnameRecord.data.replace(/\.$/, ""), ttl: cnameRecord.TTL };
  }

  const aRecord = answer.Answer.find((a) => a.type === 1);
  if (aRecord) {
    return { found: false, target: "", ttl: 0 };
  }

  return { found: false, target: "", ttl: 0 };
}

// GET /api/dns/verify?domain=hello.nxlbyldr.com&expected=brand.ludicrous.cloud
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const domain = searchParams.get("domain") || "hello.nxlbyldr.com";
    const expected = searchParams.get("expected") || "brand.ludicrous.cloud";
    const type = searchParams.get("type") || "CNAME";

    const cfResponse = await fetch(
      `${CF_DOH}?name=${encodeURIComponent(domain)}&type=${type === "A" ? "A" : "CNAME"}`,
      {
        headers: { Accept: "application/dns-json" },
        cache: "no-store",
      }
    );

    const cfData: DNSQueryResult = await cfResponse.json();

    let googleData: DNSQueryResult | null = null;
    try {
      const gResponse = await fetch(
        `${GOOGLE_DOH}?name=${encodeURIComponent(domain)}&type=${type === "A" ? "A" : "CNAME"}`,
        { cache: "no-store" }
      );
      googleData = await gResponse.json();
    } catch {
      // Google DNS might fail
    }

    const cfResult = parseCnameAnswer(cfData);
    const googleResult = googleData ? parseCnameAnswer(googleData) : null;

    const cfMatch = cfResult.found && cfResult.target.toLowerCase() === expected.toLowerCase();
    const googleMatch = googleResult
      ? googleResult.found && googleResult.target.toLowerCase() === expected.toLowerCase()
      : null;

    const isVerified = cfMatch || (googleMatch === true);
    const dnsStatus = cfData.Status;

    const statusText: Record<number, string> = {
      0: "NOERROR",
      1: "FORMAT_ERROR",
      2: "SERVER_FAILURE",
      3: "DOMAIN_NOT_FOUND",
      4: "NOT_IMPLEMENTED",
      5: "REFUSED",
    };

    return NextResponse.json({
      domain,
      expected,
      recordType: type,
      verified: isVerified,
      status: {
        code: dnsStatus,
        text: statusText[dnsStatus] || "UNKNOWN",
      },
      cloudflare: {
        found: cfResult.found,
        target: cfResult.target,
        ttl: cfResult.ttl,
        matches: cfMatch,
        raw: cfData.Answer || [],
      },
      google: googleResult
        ? {
            found: googleResult.found,
            target: googleResult.target,
            ttl: googleResult.ttl,
            matches: googleMatch,
            raw: googleData?.Answer || [],
          }
        : { error: "Could not query Google DNS" },
      recommendations: getRecommendations(cfResult, googleResult, expected, dnsStatus),
    });
  } catch (error) {
    console.error("DNS verification error:", error);
    return NextResponse.json({ error: "Failed to verify DNS" }, { status: 500 });
  }
}

function getRecommendations(
  cfResult: { found: boolean; target: string },
  googleResult: { found: boolean; target: string } | null,
  expected: string,
  dnsStatus: number
): string[] {
  const recs: string[] = [];

  if (dnsStatus === 3) {
    recs.push("Domain does not exist in DNS (NXDOMAIN). Create the CNAME record in Cloudflare.");
    recs.push("See the /api/dns/setup-command endpoint for the exact curl command to run.");
    recs.push("IMPORTANT: Set proxy status to 'DNS only' (grey cloud), NOT 'Proxied' (orange cloud).");
    return recs;
  }

  if (!cfResult.found) {
    recs.push("No CNAME record found via Cloudflare DNS. The record may not exist or hasn't propagated.");
    recs.push("Create a CNAME record in Cloudflare DNS: hello.nxlbyldr.com → brand.ludicrous.cloud");
    recs.push("IMPORTANT: Set proxy status to 'DNS only' (grey cloud), NOT 'Proxied' (orange cloud).");
  } else if (cfResult.target.toLowerCase() !== expected.toLowerCase()) {
    recs.push(
      `CNAME record points to wrong target. Current: ${cfResult.target}, Expected: ${expected}`
    );
    recs.push("Update the CNAME record in Cloudflare to point to brand.ludicrous.cloud");
  } else {
    recs.push("CNAME record is correctly configured!");
    recs.push("If GHL still can't verify, wait 5-30 min for full propagation or check proxy is OFF (grey cloud).");
  }

  return recs;
}
