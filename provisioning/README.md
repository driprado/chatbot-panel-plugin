# Provisioning for Chatbot Panel Plugin

This directory contains Grafana provisioning files for testing the chatbot panel plugin.

## Contents

- **dashboards/dashboards.yaml** - Dashboard provisioning configuration
- **dashboards/chatbot-demo.json** - Demo dashboard showcasing the chatbot panel

## Testing Locally

1. Build the plugin:

   ```bash
   npm run build
   ```

2. Start the Grafana test environment:

   ```bash
   docker compose up --build
   ```

3. Open browser to <http://localhost:3000>
   - Default credentials: admin/admin (if not using anonymous auth)
   - The demo dashboard will be automatically loaded

4. Navigate to "Chatbot Panel - Demo Dashboard" to see examples

## Dashboard Features

The demo dashboard includes:

- **Chatbot Assistant** - Full-size chatbot panel demonstrating main functionality
- **Chatbot Assistant (Secondary)** - Shows multiple panels can coexist
- **Compact Chatbot** - Demonstrates the panel works in smaller spaces

## Backend Configuration

**Note:** The chatbot panel expects a backend service at `http://localhost:8000/query` that accepts:

```json
POST /query
{
  "prompt": "user message here"
}
```

And returns:
```json
{
  "message": "bot response here"
}
```

If no backend is running, the panel will display error messages but remain functional for UI testing.

## For Plugin Reviewers

This provisioning setup allows you to:

1. Quickly spin up a Grafana instance with the plugin installed
2. See working examples of the chatbot panel in various configurations
3. Test the panel's responsiveness and UI across different sizes
4. Understand the plugin's capabilities without manual configuration
