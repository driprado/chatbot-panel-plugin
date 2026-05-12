#!/bin/bash

# Test signing script
echo "Testing Grafana plugin signing..."
echo ""
echo "Please paste your GRAFANA_ACCESS_POLICY_TOKEN and press Enter:"
read -s GRAFANA_ACCESS_POLICY_TOKEN

if [ -z "$GRAFANA_ACCESS_POLICY_TOKEN" ]; then
    echo "Error: No token provided"
    exit 1
fi

export GRAFANA_ACCESS_POLICY_TOKEN

echo ""
echo "Token received. Testing sign..."
echo ""

npm run sign

echo ""
echo "Sign test completed with exit code: $?"
