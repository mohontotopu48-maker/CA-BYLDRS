import { NextResponse } from "next/server";

const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const DOMAIN = "nxlbyldr.com";
const SUBDOMAIN = "hello";
const FQDN = `${SUBDOMAIN}.${DOMAIN}`;
const TARGET = "brand.ludicrous.cloud";

// Returns the exact curl commands the user needs to run from their local terminal
export async function GET() {
  const maskedToken = CF_TOKEN ? `${CF_TOKEN.slice(0, 8)}...${CF_TOKEN.slice(-4)}` : 'YOUR_CF_API_TOKEN';

  // Step 1: Get zone ID
  const step1 = [
    `# Step 1: Get your Cloudflare Zone ID for ${DOMAIN}`,
    `curl -s "https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}" \\`,
    `  -H "Authorization: Bearer ${maskedToken}" \\`,
    `  -H "Content-Type: application/json"`,
    ``,
    `# Look for "id" in the response - that's your ZONE_ID`,
  ].join("\n");

  // Step 2: Check existing
  const step2 = [
    ``,
    `# Step 2: Check if a CNAME record already exists for ${FQDN}`,
    `# Replace ZONE_ID with the ID from Step 1`,
    `curl -s "https://api.cloudflare.com/client/v4/zones/ZONE_ID/dns_records?type=CNAME&name=${FQDN}" \\`,
    `  -H "Authorization: Bearer ${maskedToken}" \\`,
    `  -H "Content-Type: application/json"`,
  ].join("\n");

  // Step 3: Create record
  const step3 = [
    ``,
    `# Step 3: Create the CNAME record (if it doesn't exist)`,
    `# CRITICAL: "proxied": false means DNS only (grey cloud) - this is REQUIRED for GHL`,
    `curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/dns_records" \\`,
    `  -H "Authorization: Bearer ${maskedToken}" \\`,
    `  -H "Content-Type: application/json" \\`,
    `  --data '{"type":"CNAME","name":"${FQDN}","content":"${TARGET}","proxied":false,"ttl":1}'`,
  ].join("\n");

  // Step 4: Update record
  const step4 = [
    ``,
    `# Step 4: If record exists but points to wrong target, update it`,
    `# Replace RECORD_ID with the ID from Step 2`,
    `curl -X PUT "https://api.cloudflare.com/client/v4/zones/ZONE_ID/dns_records/RECORD_ID" \\`,
    `  -H "Authorization: Bearer ${maskedToken}" \\`,
    `  -H "Content-Type: application/json" \\`,
    `  --data '{"type":"CNAME","name":"${FQDN}","content":"${TARGET}","proxied":false,"ttl":1}'`,
  ].join("\n");

  // One-liner (all-in-one)
  const oneliner = [
    ``,
    `# ══════════════════════════════════════════════════════════════`,
    `# ALL-IN-ONE: Copy and run this entire block in your terminal`,
    `# ══════════════════════════════════════════════════════════════`,
    ``,
    `CF_TOKEN="${maskedToken}"`,
    `DOMAIN="${DOMAIN}"`,
    `SUBDOMAIN="${SUBDOMAIN}"`,
    `TARGET="${TARGET}"`,
    `FQDN="\${SUBDOMAIN}.\${DOMAIN}"`,
    ``,
    `echo "Fetching zone ID..."`,
    `ZONE_ID=$(curl -s "https://api.cloudflare.com/client/v4/zones?name=\${DOMAIN}" \\`,
    `  -H "Authorization: Bearer \${CF_TOKEN}" \\`,
    `  -H "Content-Type: application/json" | python3 -c "import sys,json; print(json.load(sys.stdin)['result'][0]['id'])")`,
    ``,
    `echo "Zone ID: \${ZONE_ID}"`,
    `echo "Checking existing records..."`,
    ``,
    `EXISTING=$(curl -s "https://api.cloudflare.com/client/v4/zones/\${ZONE_ID}/dns_records?type=CNAME&name=\${FQDN}" \\`,
    `  -H "Authorization: Bearer \${CF_TOKEN}" \\`,
    `  -H "Content-Type: application/json")`,
    ``,
    `RECORD_ID=$(echo "\${EXISTING}" | python3 -c "import sys,json; d=json.load(sys.stdin)['result']; print(d[0]['id'] if d else '')")`,
    ``,
    `if [ -n "\${RECORD_ID}" ]; then`,
    `  echo "Updating existing record..."`,
    `  curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/\${ZONE_ID}/dns_records/\${RECORD_ID}" \\`,
    `    -H "Authorization: Bearer \${CF_TOKEN}" \\`,
    `    -H "Content-Type: application/json" \\`,
    `    --data "{\\"type\\":\\"CNAME\\",\\"name\\":\\"\${FQDN}\\",\\"content\\":\\"\${TARGET}\\",\\"proxied\\":false,\\"ttl\\":1}" | python3 -c "import sys,json; d=json.load(sys.stdin); print('✓ Updated!' if d.get('success') else '✗ Failed: '+str(d.get('errors',[])))"`,
    `else`,
    `  echo "Creating new CNAME record..."`,
    `  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/\${ZONE_ID}/dns_records" \\`,
    `    -H "Authorization: Bearer \${CF_TOKEN}" \\`,
    `    -H "Content-Type: application/json" \\`,
    `    --data "{\\"type\\":\\"CNAME\\",\\"name\\":\\"\${FQDN}\\",\\"content\\":\\"\${TARGET}\\",\\"proxied\\":false,\\"ttl\\":1}" | python3 -c "import sys,json; d=json.load(sys.stdin); print('✓ Created!' if d.get('success') else '✗ Failed: '+str(d.get('errors',[])))"`,
    `fi`,
    ``,
    `echo ""`,
    `echo "Verifying DNS propagation (may take a few minutes)..."`,
    `sleep 5`,
    `dig \${FQDN} CNAME +short 2>/dev/null || nslookup -type=CNAME \${FQDN} 2>/dev/null || echo "Use: https://dnschecker.org/#CNAME/${FQDN}"`,
    ``,
    `echo ""`,
    `echo "After DNS propagates, go to GHL → Settings → Custom Domains → Add: ${FQDN}"`,
  ].join("\n");

  return NextResponse.json({
    message: "Run these commands from your LOCAL terminal (Cloudflare API token is IP-restricted)",
    note: "The Cloudflare API token can only be used from specific IP addresses. Run these commands from your own machine.",
    steps: {
      step1_get_zone: step1,
      step2_check_existing: step2,
      step3_create_record: step3,
      step4_update_record: step4,
    },
    all_in_one_script: oneliner,
    cloudflare_dashboard_steps: [
      `1. Go to https://dash.cloudflare.com`,
      `2. Select domain: ${DOMAIN}`,
      `3. Go to DNS → Records`,
      `4. Click "Add Record"`,
      `5. Type: CNAME`,
      `6. Name: ${SUBDOMAIN}`,
      `7. Target: ${TARGET}`,
      `8. Proxy status: DNS only (grey cloud icon) ⚠️ CRITICAL - must NOT be proxied`,
      `9. TTL: Auto`,
      `10. Click Save`,
      `11. Wait 5-30 minutes for DNS propagation`,
      `12. Go to GHL → Settings → Custom Domains → Add: ${FQDN}`,
    ],
  });
}
