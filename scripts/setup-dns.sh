#!/bin/bash
# ====================================================
# CA BYLDRS - Cloudflare DNS Setup Script
# ====================================================
# This script creates the required CNAME record for
# hello.nxlbyldr.com → brand.ludicrous.cloud
#
# USAGE: Run this script from your LOCAL machine
# (The Cloudflare API token is IP-restricted)
#
# REQUIREMENTS: curl installed (comes with most OS)
# ====================================================

set -e

# Configuration
CF_TOKEN="cfut_IuArYHfHJ8d1gcYg0s0kc6BrN8VW3O4pFOXpiLMO34c41dd5"
DOMAIN="nxlbyldr.com"
SUBDOMAIN="hello"
FQDN="${SUBDOMAIN}.${DOMAIN}"
TARGET="brand.ludicrous.cloud"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${BLUE}  CA BYLDRS - Cloudflare DNS Setup${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo ""

# Step 1: Get Zone ID
echo -e "${YELLOW}[1/4] Looking up Cloudflare zone for ${DOMAIN}...${NC}"
ZONE_RESPONSE=$(curl -s "https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}" \
  -H "Authorization: Bearer ${CF_TOKEN}" \
  -H "Content-Type: application/json")

ZONE_ERROR=$(echo "$ZONE_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('errors',[{}])[0].get('message',''))" 2>/dev/null || echo "")

if [ -n "$ZONE_ERROR" ]; then
  echo -e "${RED}✗ Error: ${ZONE_ERROR}${NC}"
  echo -e "${RED}  Your Cloudflare API token may be IP-restricted.${NC}"
  echo -e "${RED}  Please ensure this script runs from an allowed IP.${NC}"
  echo -e "${RED}  Current IP: $(curl -s ifconfig.me 2>/dev/null || echo 'unknown')${NC}"
  exit 1
fi

ZONE_ID=$(echo "$ZONE_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['result'][0]['id'])" 2>/dev/null)
ZONE_STATUS=$(echo "$ZONE_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['result'][0]['status'])" 2>/dev/null)

if [ -z "$ZONE_ID" ]; then
  echo -e "${RED}✗ Could not find zone for ${DOMAIN}${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Zone found: ${ZONE_ID} (${ZONE_STATUS})${NC}"

# Step 2: Check for existing CNAME record
echo -e "${YELLOW}[2/4] Checking for existing CNAME record for ${FQDN}...${NC}"
RECORDS_RESPONSE=$(curl -s "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?type=CNAME&name=${FQDN}" \
  -H "Authorization: Bearer ${CF_TOKEN}" \
  -H "Content-Type: application/json")

EXISTING_ID=$(echo "$RECORDS_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); r=d['result']; print(r[0]['id'] if r else '')" 2>/dev/null)
EXISTING_TARGET=$(echo "$RECORDS_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); r=d['result']; print(r[0]['content'] if r else '')" 2>/dev/null)

if [ -n "$EXISTING_ID" ]; then
  echo -e "${YELLOW}! Existing record found: ${FQDN} → ${EXISTING_TARGET}${NC}"

  if [ "$EXISTING_TARGET" = "$TARGET" ]; then
    echo -e "${GREEN}✓ Record already points to correct target! No changes needed.${NC}"
    echo ""
    echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  ✓ DNS setup is COMPLETE${NC}"
    echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
    echo ""
    echo -e "  ${FQDN} → ${TARGET}"
    echo ""
    echo -e "${YELLOW}Note: DNS propagation may take up to 48 hours.${NC}"
    exit 0
  fi

  echo -e "${YELLOW}[3/4] Updating existing CNAME record...${NC}"
  UPDATE_RESPONSE=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${EXISTING_ID}" \
    -H "Authorization: Bearer ${CF_TOKEN}" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"CNAME\",\"name\":\"${FQDN}\",\"content\":\"${TARGET}\",\"proxied\":false,\"ttl\":1}")

  UPDATE_SUCCESS=$(echo "$UPDATE_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success',''))" 2>/dev/null)

  if [ "$UPDATE_SUCCESS" = "True" ]; then
    echo -e "${GREEN}✓ CNAME record updated successfully!${NC}"
  else
    echo -e "${RED}✗ Failed to update record${NC}"
    echo "$UPDATE_RESPONSE" | python3 -m json.tool 2>/dev/null
    exit 1
  fi
else
  echo -e "${YELLOW}  No existing record found.${NC}"
  echo -e "${YELLOW}[3/4] Creating new CNAME record...${NC}"

  CREATE_RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
    -H "Authorization: Bearer ${CF_TOKEN}" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"CNAME\",\"name\":\"${FQDN}\",\"content\":\"${TARGET}\",\"proxied\":false,\"ttl\":1}")

  CREATE_SUCCESS=$(echo "$CREATE_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success',''))" 2>/dev/null)

  if [ "$CREATE_SUCCESS" = "True" ]; then
    NEW_ID=$(echo "$CREATE_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['id'])" 2>/dev/null)
    echo -e "${GREEN}✓ CNAME record created successfully! (ID: ${NEW_ID})${NC}"
  else
    echo -e "${RED}✗ Failed to create record${NC}"
    echo "$CREATE_RESPONSE" | python3 -m json.tool 2>/dev/null
    exit 1
  fi
fi

# Step 4: Verify the record
echo -e "${YELLOW}[4/4] Verifying DNS record...${NC}"
VERIFY_RESPONSE=$(curl -s "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?type=CNAME&name=${FQDN}" \
  -H "Authorization: Bearer ${CF_TOKEN}" \
  -H "Content-Type: application/json")

VERIFY_TARGET=$(echo "$VERIFY_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); r=d['result']; print(r[0]['content'] if r else '')" 2>/dev/null)

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
if [ "$VERIFY_TARGET" = "$TARGET" ]; then
  echo -e "${GREEN}  ✓ DNS SETUP COMPLETE!${NC}"
else
  echo -e "${YELLOW}  ⚠ DNS record created but verification failed${NC}"
fi
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo ""
echo -e "  Record: ${BLUE}${FQDN}${NC}"
echo -e "  Target: ${BLUE}${TARGET}${NC}"
echo -e "  Type:   CNAME"
echo -e "  Proxy:  DNS Only (not proxied through Cloudflare)"
echo -e "  TTL:    Auto"
echo ""
echo -e "${YELLOW}⚠ DNS propagation may take up to 48 hours (usually 5-30 minutes)${NC}"
echo -e "${YELLOW}⚠ After propagation, go to GHL Settings → Custom Domains and add:${NC}"
echo -e "     ${BLUE}hello.nxlbyldr.com${NC}"
echo ""
