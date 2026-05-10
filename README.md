# A Grafana Chatbot Panel Plugin

Purpose: Grafana panel plugin for a "chatbot" panel. The plugin follows Grafana best-practice layout for a React/TypeScript panel.

## Repository layout

```sh
.
├── .config/                 # Grafana build configuration
├── CHANGELOG.md             # Change log for the plugin
├── CONTRIBUTING.md          # Contribution guidelines
├── jest.config.js           # Jest configuration for tests
├── LICENSE                  # Apache 2.0 license
├── package.json             # NPM manifest and scripts
├── package-lock.json        # Exact dependency versions (lockfile)
├── provisioning/            # Grafana provisioning for local testing
│   └── dashboards/          # Demo dashboard configuration
├── src/
│   ├── ChatPanel.tsx        # React component implementing the panel UI
│   ├── img/                 # Static image assets
│   │   └── chatbot-grafana-plugin-icon.svg
│   ├── module.test.ts       # Unit tests for module-related logic
│   ├── module.ts            # Grafana plugin bootstrap/register
│   ├── plugin.json          # Grafana plugin descriptor
│   └── types.ts             # Shared TypeScript types/interfaces
└── tsconfig.json            # TypeScript compiler options
```

Key files explained:

- **ChatPanel.tsx**: The React component that renders the Grafana panel UI. It contains the runtime code for drawing the panel and handling interactions.

- **module.ts**: Registers the panel with Grafana and wires up plugin lifecycle behavior.

- **plugin.json**: Grafana descriptor that declares the plugin ID, panels, dependencies, and UI hooks Grafana uses to surface the plugin.

- **module.test.ts**: Unit tests for the module and registration logic; run with Jest.

- **types.ts**: Shared TypeScript definitions used across the plugin (props, options, and data shapes).

- **package.json**: Declares scripts for building, testing, and packaging the panel; lists dependencies used during build and runtime.

- **tsconfig.json**: Compiler options to build the project with TypeScript and generate output compatible with Grafana's build environment.

- **jest.config.js**: Test runner configuration used by Jest when running unit tests.

- **CHANGELOG.md**: Lists notable changes between releases of the plugin.

- **LICENSE**: The project's license and copyright terms.

## Build & test

This plugin uses npm scripts for building and testing.

### Development commands

```sh
# Install dependencies
npm ci

# Build the plugin
npm run build

# Run tests (watch mode)
npm test

# Run tests (CI mode)
npm run test:ci

# Type check
npm run typecheck
```

### Local testing with Grafana

```sh
# Start Grafana with the plugin loaded
npm run server

# Access Grafana at http://localhost:3000
# The demo dashboard is automatically provisioned
```

## Compatibility

This plugin has been tested with multiple Grafana versions:

| Grafana Version | Status |
|-----------------|--------|
| 7.5.17          | ✅     |
| 8.5.27          | ✅     |
| 9.5.19          | ✅     |
| 10.4.2          | ✅     |
| 11.x (latest)   | ✅     |

**Minimum supported version:** Grafana 7.0.0+
