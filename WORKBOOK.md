# Workbook

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

   Compatibility testing:
   - ✅ Tested with Grafana 7.x, 8.x, 9.x, 10.x, 11.x - all versions passed → [See test results](#multi-version-testing-plan)

2. Create a GitHub repository
   - Host your plugin code in a public GitHub repository
   - Include clear README with installation and usage instructions
   - Add screenshots/demos of your plugin in action
   - Ensure the repository is clean and well-organized

   ✅ Step 2 Check Results:

   - ✅ Repository is public: <https://github.com/driprado/chatbot-panel-plugin>
   - ✅ README includes installation and usage instructions
   - ✅ Screenshots included in plugin.json (2 screenshots)
   - ✅ Repository structure is clean and well-organized

3. Sign up for Grafana Cloud (if you don't have an account)
   - Go to <https://grafana.com/>
   - Create a free Grafana Cloud account
   - This is needed to access the plugin publishing tools

   ✅ Step 3 Check Results:

   - ✅ Grafana Cloud account created

4. Submit plugin for review
   - Sign in to Grafana Cloud: <https://grafana.com/auth/sign-in>
   - Go to Org Settings > My Plugins
   - Click "Submit New Plugin"
   - Fill out the submission form:
     - Create a ZIP archive of your plugin (from dist folder)
     - Upload or provide URL to the ZIP archive
     - Source code URL: <https://github.com/driprado/chatbot-panel-plugin>
     - Calculate SHA1 hash of the ZIP file
     - Provide testing guidance (installation, configuration, usage)
     - Answer questions about plugin type and signature level

5. Wait for plugin review
   - Grafana team will review your plugin for:
     - Security vulnerabilities
     - Code quality and best practices
     - Compliance with plugin guidelines
     - Proper error handling
     - Performance considerations

6. Address review feedback (if any)
   - Grafana may request changes or improvements
   - Make the requested changes in your repository
   - Go to Org Settings > My Plugins in Grafana Cloud
   - Click "Submit Update" for your plugin
   - Resubmit with the updated ZIP and SHA1

7. Generate Access Policy token for signing
   - Once approved, Grafana assigns a signature level to your plugin
   - Create an Access Policy token:
     - Sign in to Grafana Cloud
     - Go to My Account > Security > Access Policies
     - Click "Create access policy"
     - Realm: Set to your org name (all-stacks)
     - Scope: Set to `plugins:write`
     - Click "Create token"
     - Save the token securely (e.g., GitHub Secrets)

8. Set up automated signing in CI/CD
   - Add signing step to your build pipeline
   - Use GitHub Actions or your preferred CI/CD tool
   - Set environment variable:
     - `GRAFANA_ACCESS_POLICY_TOKEN` (the token from step 7)
   - Sign command: `npx @grafana/sign-plugin@latest`

9. Build and sign your plugin

   ```bash
   npm run build
   export GRAFANA_ACCESS_POLICY_TOKEN=<your-token>
   npx @grafana/sign-plugin@latest
   ```

10. Verify the signature
    - Check that `MANIFEST.txt` is created in your dist folder
    - Verify signature files are present
    - Test the signed plugin in a Grafana instance

11. Distribute your plugin
    - Plugin is automatically published to Grafana plugin catalog after approval
    - Create GitHub releases with signed plugin builds
    - Users can install via grafana-cli or manual installation
    - Document the installation process in your README

### Resources

- [Grafana Plugin Tools](https://grafana.com/developers/plugin-tools/)
- [Sign a plugin](https://grafana.com/developers/plugin-tools/publish-a-plugin/sign-a-plugin)
- [Publish a plugin](https://grafana.com/developers/plugin-tools/publish-a-plugin/publish-a-plugin)
- [Plugin publishing guidelines](https://grafana.com/legal/plugins/#plugin-publishing-and-signing-criteria)
- [My Plugins page (submit here)](https://grafana.com/auth/sign-in) → Org Settings > My Plugins

----------

## Multi-Version Testing Plan

### Minimum versions to test

Test one version from each major release:

- **Grafana 7.x**: 7.5.17
- **Grafana 8.x**: 8.5.27
- **Grafana 9.x**: 9.5.19
- **Grafana 10.x**: 10.4.2
- **Grafana 11.x**: latest

### Test each version (3 steps)

1. **Start Grafana with plugin**

```bash
make build
docker run -d --name grafana-test-latest -p 3000:3000 \
  -v $(pwd)/chatbot-panel-plugin/dist:/var/lib/grafana/plugins/chatbot-panel \
  -e GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=driprado-chatbot-panel \
  grafana/grafana:latest
```

1. **Verify plugin works**

   - Open <http://localhost:3000> (admin/admin)
   - Create new dashboard → Add panel
   - Select "chatbot-panel" from visualization list
   - Confirm panel renders without console errors

1. **Clean up**

```bash
docker rm -f grafana-test-latest
```

### Version test results

| Version | Tested | Works |
|---------|--------|-------|
| 7.5.17  | [y]    | [y]   |
| 8.5.27  | [y]    | [y]   |
| 9.5.19  | [y]    | [y]   |
| 10.4.2  | [y]    | [y]   |
| latest  | [y]    | [y]   |

----------
