# A Grafana Chatbot Panel Plugin

Purpose: Grafana panel plugin for a "chatbot" panel. The plugin follows Grafana best-practice layout for a React/TypeScript panel.

Repository layout:

```sh
.
├── chatbot-panel-plugin
│   ├── CHANGELOG.md         # Change log for the plugin
│   ├── jest.config.js       # Jest configuration for tests
│   ├── LICENSE              # License file
│   ├── package-lock.json    # Exact dependency versions (lockfile)
│   ├── package.json         # NPM manifest and scripts
│   ├── README.md            # Plugin-specific documentation
│   ├── src
│   │   ├── ChatPanel.tsx    # React component implementing the panel UI
│   │   ├── img
│   │   │   └── chatbot-grafana-plugin-icon.svg # Static image assets
│   │   ├── module.test.ts   # Unit tests for module-related logic
│   │   ├── module.ts        # Grafana plugin bootstrap/register
│   │   ├── plugin.json      # Grafana plugin descriptor
│   │   └── types.ts         # Shared TypeScript types/interfaces
│   └── tsconfig.json        # TypeScript compiler options
└── README.md                # This file (project overview)
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

This repository includes a top-level `Makefile`. Use these targets from the repository root.

Example commands:

```sh
make install # install exact dependencies

make build # build the plugin

make test # run unit tests

make clean # clean build artifacts and node_modules

make int-test # spin up local grafana with panel installed for testing

make int-test-stop # stops local grafana with panel installed for testing
```

----------

## Workbook

## TODO

- [] Get it signed by grafana

## Step-by-step process to get this plugin signed by Grafana

1. Prepare your plugin for submission
   - Ensure your plugin follows Grafana's plugin development guidelines
   - Verify plugin.json has all required fields (id, name, type, info, etc.)
   - Test the plugin thoroughly in different Grafana versions
   - Ensure all documentation is complete (README, CHANGELOG, LICENSE)

   ✅ Step 1 Check Results:

   plugin.json validation:
   - ✅ Required field `type`: "panel" ✓
   - ✅ Required field `name`: "chatbot-panel" ✓
   - ✅ Required field `id`: "driprado-chatbot-panel" ✓
   - ✅ `info` section complete with:
     - ✅ description: "Chatbot UI panel" ✓
     - ✅ author (name and url) ✓
     - ✅ keywords: ["chatbot", "panel", "ai", "conversation"] ✓
     - ✅ logos (small and large): "img/chatbot-grafana-plugin-icon.svg" ✓
     - ✅ links (Repository and License) ✓
     - ✅ version: "1.0.0" ✓
     - ✅ updated: "2026-02-09" ✓
   - ✅ `dependencies` section with grafanaDependency: ">=7.0.0" ✓
   - ✅ `screenshots` array: 2 screenshots added ✓

   Logo files:
   - ✅ Referenced logo exists: `chatbot-grafana-plugin-icon.svg` ✓

   Documentation check:
   - ✅ README.md exists and includes:
     - Development instructions ✓
     - Build commands ✓
     - Testing information ✓
     - Resource links ✓
   - ✅ CHANGELOG.md exists with version history ✓
   - ✅ LICENSE file exists (Apache License 2.0) ✓

   Build configuration:
   - ✅ package.json includes build script ✓
   - ✅ Sign script configured: `npm run sign` ✓
   - ✅ Test suite configured (Jest + Playwright) ✓
   - ✅ Grafana dependencies: @grafana/data, @grafana/ui, @grafana/runtime ✓

   Recommendations:
   - ⚠️  Test with multiple Grafana versions (7.0.0+ as per dependencies)
   - ℹ️  Package name in package.json is "custom-chatbot-panel" but plugin ID is "driprado-chatbot-panel" (verify this is intentional)

2. Create a GitHub repository
   - Host your plugin code in a public GitHub repository
   - Include clear README with installation and usage instructions
   - Add screenshots/demos of your plugin in action
   - Ensure the repository is clean and well-organized

3. Sign up for Grafana Cloud (if you don't have an account)
   - Go to https://grafana.com/
   - Create a free Grafana Cloud account
   - This is needed to access the plugin publishing tools

4. Create a plugin signature request
   - Go to https://grafana.com/developers/plugin-signature-request
   - Sign in with your Grafana Cloud account
   - Fill out the plugin signature request form with:
     - Plugin ID (must match your plugin.json)
     - Plugin name
     - Plugin type (panel, datasource, app)
     - GitHub repository URL
     - Your contact information

5. Submit your plugin for review
   - Grafana team will review your plugin for:
     - Security vulnerabilities
     - Code quality and best practices
     - Compliance with plugin guidelines
     - Proper error handling
     - Performance considerations

6. Address review feedback (if any)
   - Grafana may request changes or improvements
   - Make the requested changes in your repository
   - Respond to review comments
   - Resubmit if necessary

7. Receive signing credentials
   - Once approved, you'll receive:
     - A plugin signing key/token
     - Access to sign your plugin builds
   - Store these credentials securely (e.g., GitHub Secrets)

8. Set up automated signing in CI/CD
   - Add signing step to your build pipeline
   - Use GitHub Actions or your preferred CI/CD tool
   - Example: `npx @grafana/sign-plugin@latest`
   - Set environment variables:
     - `GRAFANA_API_KEY` (your signing token)
     - `GRAFANA_ACCESS_POLICY_TOKEN` (if using access policies)

9. Build and sign your plugin

   ```bash
   npm run build
   npx @grafana/sign-plugin@latest
   ```

10. Verify the signature
    - Check that `MANIFEST.txt` is created in your dist folder
    - Verify signature files are present
    - Test the signed plugin in a Grafana instance

11. Publish to Grafana plugin catalog (optional)
    - If you want your plugin listed publicly
    - Submit to https://grafana.com/grafana/plugins/
    - Provide additional metadata and marketing materials

12. Distribute your plugin
    - Create GitHub releases with signed plugin builds
    - Users can install via grafana-cli or manual installation
    - Document the installation process in your README

### Resources

- [Grafana Plugin Tools](https://grafana.com/developers/plugin-tools/)
- [Sign a plugin](https://grafana.com/docs/grafana/latest/developers/plugins/sign-a-plugin/)
- [Publish a plugin](https://grafana.com/docs/grafana/latest/developers/plugins/publish-a-plugin/)
- [Plugin signature levels](https://grafana.com/docs/grafana/latest/developers/plugins/sign-a-plugin/#plugin-signature-levels)

