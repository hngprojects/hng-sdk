# Security Policy

## Supported Versions

We take security seriously and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability within HNG SDK, please send an email to:

**security@hng.tech**

Please include the following information in your report:

### Required Information

- **Type of vulnerability** (e.g., XSS, SQL injection, authentication bypass)
- **Full paths of affected source files**
- **Location of the affected source code** (tag/branch/commit or direct URL)
- **Step-by-step instructions to reproduce the issue**
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the issue** - How an attacker might exploit this

### Optional Information

- **Any potential fixes or mitigations** you've identified
- **Tools or configurations needed** to reproduce
- **Affected versions**

## Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 7-30 days
  - Medium: 30-90 days
  - Low: Best effort

## Disclosure Policy

When we receive a security report, we will:

1. **Confirm receipt** of your vulnerability report
2. **Confirm the problem** and determine affected versions
3. **Audit code** to find any similar problems
4. **Prepare fixes** for all supported versions
5. **Release patches** and publish a security advisory

### Coordinated Disclosure

We practice coordinated disclosure:

- We request that you give us reasonable time to fix the issue before public disclosure
- We will credit you in the security advisory (unless you prefer to remain anonymous)
- Once the fix is released, we will publish a security advisory

## Security Best Practices

When using HNG SDK, we recommend:

### For UI Components

- Always sanitize user input before rendering
- Use Content Security Policy (CSP) headers
- Keep dependencies up to date
- Use HTTPS in production

### For Email Templates

- Validate all email addresses
- Sanitize user-provided content
- Use proper authentication for email sending services
- Implement rate limiting to prevent abuse

### General

- Keep all packages up to date
- Use lock files (`pnpm-lock.yaml`) for deterministic builds
- Run security audits regularly: `pnpm audit`
- Review and limit third-party dependencies

## Security Updates

Security updates will be released as:

- **Patch versions** for non-breaking fixes
- **Security advisories** on GitHub
- **Announcements** in release notes

Subscribe to repository releases to stay informed about security updates.

## Scope

### In Scope

- HNG SDK packages (@hng-sdk/ui, @hng-sdk/email, hng-sdk)
- Documentation site
- Build and deployment pipelines

### Out of Scope

- Third-party dependencies (report to their maintainers)
- Issues in outdated/unsupported versions
- Issues requiring physical access to systems
- Social engineering attacks

## Bug Bounty

We currently do not offer a bug bounty program. However, we greatly appreciate security researchers who responsibly disclose vulnerabilities and will publicly acknowledge their contributions (with permission).

## Contact

- **Security Issues**: security@hng.tech
- **General Questions**: Open a GitHub Discussion
- **Non-Security Bugs**: [Open an issue](https://github.com/hngprojects/hng-sdk/issues/new/choose)

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [npm Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)

---

Thank you for helping keep HNG SDK and our users safe! 🔒
