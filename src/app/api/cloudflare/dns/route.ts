import { NextRequest, NextResponse } from "next/server";

const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
const DOMAIN = "nxlbyldr.com";

interface CloudflareZone {
  id: string;
  name: string;
  status: string;
}

interface CloudflareDNSRecord {
  id: string;
  type: string;
  name: string;
  content: string;
  proxied: boolean;
  ttl: number;
}

async function cfFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${CF_TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const data = await res.json();
  return { status: res.status, data };
}

// GET - List DNS records or check specific CNAME
export async function GET(req: NextRequest) {
  try {
    if (!CF_TOKEN) {
      return NextResponse.json({ error: "Cloudflare API token not configured" }, { status: 500 });
    }

    const searchParams = req.nextUrl.searchParams;
    const subdomain = searchParams.get("subdomain"); // e.g. "hello"

    // Step 1: Get zone ID for the domain
    const zoneRes = await cfFetch(`/zones?name=${DOMAIN}`);
    if (!zoneRes.data.success || !zoneRes.data.result?.length) {
      return NextResponse.json({
        error: "Could not find Cloudflare zone",
        details: zoneRes.data.errors,
      }, { status: 400 });
    }

    const zone: CloudflareZone = zoneRes.data.result[0];
    const zoneId = zone.id;

    // Step 2: List DNS records
    const recordsRes = await cfFetch(`/zones/${zoneId}/dns_records?type=CNAME`);
    if (!recordsRes.data.success) {
      return NextResponse.json({
        error: "Failed to list DNS records",
        details: recordsRes.data.errors,
      }, { status: 500 });
    }

    const records: CloudflareDNSRecord[] = recordsRes.data.result;

    // Filter for specific subdomain if requested
    if (subdomain) {
      const fqdn = `${subdomain}.${DOMAIN}`;
      const match = records.find((r) => r.name === fqdn);
      return NextResponse.json({
        zone: { id: zoneId, name: zone.name, status: zone.status },
        subdomain,
        fqdn,
        found: !!match,
        record: match || null,
        all_cname_records: records.map((r) => ({
          name: r.name,
          content: r.content,
          proxied: r.proxied,
          id: r.id,
        })),
      });
    }

    return NextResponse.json({
      zone: { id: zoneId, name: zone.name, status: zone.status },
      cname_records: records.map((r) => ({
        name: r.name,
        content: r.content,
        proxied: r.proxied,
        id: r.id,
      })),
    });
  } catch (error) {
    console.error("Cloudflare DNS GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Create or update CNAME record
export async function POST(req: NextRequest) {
  try {
    if (!ADMIN_API_KEY || req.headers.get('x-admin-key') !== ADMIN_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!CF_TOKEN) {
      return NextResponse.json({ error: "Cloudflare API token not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { subdomain, target, proxied = false, ttl = 1 } = body; // ttl=1 means auto

    if (!subdomain || !target) {
      return NextResponse.json({ error: "subdomain and target are required" }, { status: 400 });
    }

    const fqdn = `${subdomain}.${DOMAIN}`;

    // Step 1: Get zone ID
    const zoneRes = await cfFetch(`/zones?name=${DOMAIN}`);
    if (!zoneRes.data.success || !zoneRes.data.result?.length) {
      return NextResponse.json({
        error: "Could not find Cloudflare zone",
        details: zoneRes.data.errors,
      }, { status: 400 });
    }

    const zone: CloudflareZone = zoneRes.data.result[0];
    const zoneId = zone.id;

    // Step 2: Check if record already exists
    const recordsRes = await cfFetch(`/zones/${zoneId}/dns_records?type=CNAME&name=${fqdn}`);
    if (!recordsRes.data.success) {
      return NextResponse.json({
        error: "Failed to check existing records",
        details: recordsRes.data.errors,
      }, { status: 500 });
    }

    const existing = recordsRes.data.result?.[0] as CloudflareDNSRecord | undefined;

    if (existing) {
      // Update existing record
      const updateRes = await cfFetch(`/zones/${zoneId}/dns_records/${existing.id}`, {
        method: "PUT",
        body: JSON.stringify({
          type: "CNAME",
          name: fqdn,
          content: target,
          proxied,
          ttl,
        }),
      });

      if (!updateRes.data.success) {
        return NextResponse.json({
          error: "Failed to update CNAME record",
          details: updateRes.data.errors,
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        action: "updated",
        record: updateRes.data.result,
        message: `CNAME record for ${fqdn} updated to → ${target}`,
      });
    }

    // Step 3: Create new record
    const createRes = await cfFetch(`/zones/${zoneId}/dns_records`, {
      method: "POST",
      body: JSON.stringify({
        type: "CNAME",
        name: fqdn,
        content: target,
        proxied,
        ttl,
      }),
    });

    if (!createRes.data.success) {
      return NextResponse.json({
        error: "Failed to create CNAME record",
        details: createRes.data.errors,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      action: "created",
      record: createRes.data.result,
      message: `CNAME record for ${fqdn} created → ${target}`,
    });
  } catch (error) {
    console.error("Cloudflare DNS POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE - Remove a CNAME record
export async function DELETE(req: NextRequest) {
  try {
    if (!ADMIN_API_KEY || req.headers.get('x-admin-key') !== ADMIN_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!CF_TOKEN) {
      return NextResponse.json({ error: "Cloudflare API token not configured" }, { status: 500 });
    }

    const searchParams = req.nextUrl.searchParams;
    const subdomain = searchParams.get("subdomain");
    const recordId = searchParams.get("recordId");

    if (!subdomain && !recordId) {
      return NextResponse.json({ error: "subdomain or recordId is required" }, { status: 400 });
    }

    // Get zone ID
    const zoneRes = await cfFetch(`/zones?name=${DOMAIN}`);
    if (!zoneRes.data.success || !zoneRes.data.result?.length) {
      return NextResponse.json({ error: "Could not find Cloudflare zone" }, { status: 400 });
    }

    const zone: CloudflareZone = zoneRes.data.result[0];
    const zoneId = zone.id;

    let targetId = recordId;

    if (!targetId && subdomain) {
      const fqdn = `${subdomain}.${DOMAIN}`;
      const recordsRes = await cfFetch(`/zones/${zoneId}/dns_records?type=CNAME&name=${fqdn}`);
      const existing = recordsRes.data.result?.[0] as CloudflareDNSRecord | undefined;
      if (!existing) {
        return NextResponse.json({ error: "Record not found" }, { status: 404 });
      }
      targetId = existing.id;
    }

    if (!targetId) {
      return NextResponse.json({ error: "Record ID not found" }, { status: 404 });
    }

    const deleteRes = await cfFetch(`/zones/${zoneId}/dns_records/${targetId}`, {
      method: "DELETE",
    });

    if (!deleteRes.data.success) {
      return NextResponse.json({
        error: "Failed to delete record",
        details: deleteRes.data.errors,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `CNAME record deleted`,
    });
  } catch (error) {
    console.error("Cloudflare DNS DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
