# Workbook

## [] Plugin Signing and Publishing

### Pre-submission Checklist

- ✅ Review Guidelines

  - Review [Grafana's plugin publishing criteria](https://grafana.com/legal/plugins/#plugin-publishing-and-signing-criteria)
  - Check [publishing best practices](https://grafana.com/developers/plugin-tools/publish-a-plugin/publishing-best-practices)

- ✅ Validate Plugin

  - Run the [plugin validator](https://github.com/grafana/plugin-validator) to check readiness
  - Ensure all automated checks pass

- ✅ Package Plugin

  - Run `make package` to build and create distribution ZIP with SHA1
  - Verify the ZIP contains all necessary files
  - **Status**: ✅ Package created: `hypatiastack-chatbot-panel-1.0.0.zip` (SHA1: `36c45d1e3865e9cee5cdd619ee642751cdf4dfd4`)
  - **Fixed**: Updated Makefile to create proper plugin directory structure
  - **Updated**: Changed plugin ID to `hypatiastack-chatbot-panel` to match org slug

- ✅ Prepare Test Environment

  - Create sample dashboards demonstrating plugin functionality
  - Provide test data and configuration examples
  - Set up provisioning for easy testing (see `provisioning/` directory)

---

### Submission Process

- ✅ Submit for Review

  - Sign in to [Grafana Cloud](https://grafana.com/auth/sign-in) (requires admin access)
  - Navigate to Org Settings → My Plugins → Submit New Plugin
  - Provide required information:
    - Plugin ZIP URL (GitHub release or public URL)
    - Source code URL (GitHub repository)
    - SHA1 hash of the ZIP
    - Testing guidance for reviewers
    - Confirm provisioning is provided

- ⭕ Review Process

  - Automated validation runs
  - Manual code review and security check by Grafana team
  - Plugin is tested on Grafana instances
  - Wait for approval notification

### Post-Approval Signing

- [] Create Access Policy Token

  - Log in to Grafana Cloud account
  - Go to My Account → Security → Access Policies
  - Create access policy:
    - Realm: `<YOUR_ORG_NAME>` (all-stacks)
    - Scope: `plugins:write`
  - Create token and save securely

- [] Sign the Plugin

  - Export token: `export GRAFANA_ACCESS_POLICY_TOKEN=<YOUR_TOKEN>`
  - Run signing: `npm run sign` (or `npx @grafana/sign-plugin@latest`)
  - Verify `MANIFEST.txt` is created in the `dist` directory

- [] Distribute

  - Plugin will be available in the Grafana plugin catalog
  - Users can install via Grafana UI or CLI

**Note**: Signature level (Community/Commercial) is assigned by Grafana team after review.
