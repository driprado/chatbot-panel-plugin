# Workbook

## Plugin Signing and Publishing

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

## Enhancements

- ✅ Create sponsorship link
  - finish process at <https://github.com/sponsors/driprado/signup>

- ✅ Add Sponsorship Link to plugin
  - Add sponsorship link to `plugin.json` (Info.Links section)
  - Use name: `"sponsor"` or `"sponsorship"`
  - Example: `{"name": "Sponsor", "url": "https://github.com/sponsors/driprado"}`
  - Will be shown on plugin details page to allow users to support your work
  - **Status**: Added to `plugin.json` pointing to `https://github.com/sponsors/driprado`

- ✅ Build Provenance Attestation
  - Set up GitHub Actions workflow with build attestation
  - Verifies plugin build provenance automatically
  - [Documentation](https://grafana.com/developers/plugin-tools/publish-a-plugin/build-automation#enable-provenance-attestation)
  - **Status**: Created `.github/workflows/release.yml` with:
    - Build and package steps
    - Provenance attestation generation using `actions/attest-build-provenance@v2`
    - Optional signing step (continues on error for unpublished plugins)
    - Automatic GitHub release creation on version tags
  - **Note**: Signing will fail with 409 error until plugin is approved by Grafana

## Backlog

### Create v1.0.0 Release Manually

⭕ Restore v1.0.0 release with original file for Grafana review

1. Go to: https://github.com/driprado/chatbot-panel-plugin/releases/new
2. Choose tag: `v1.0.0`
3. Release title: `v1.0.0`
4. Description:

```txt
## Release 1.0.0
   
**Installation:**
Download the plugin archive and install it in your Grafana instance.
   
**Checksum (SHA1):** c05bf7ffb09f142c61c344c46acb8ea5367ec333
```

1. Upload file: Drag and drop `driprado-chatbot-panel-1.0.0.zip` from workspace
1. Click "Publish release"

⭕ `Sign plugin` step in .github/workflows/release.yml: build-and-release: job
