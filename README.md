# HNG SDK

A comprehensive collection of packages and UI components for building modern web applications, powered by React, TypeScript, and Tailwind CSS.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)

## 📦 Packages

This monorepo contains the following packages:

### Core Packages

- **[hng-sdk](./src/packages/hng-sdk)** - Base package that re-exports all sub-packages
  ```bash
  npm install hng-sdk
  ```

### Component Packages

- **[@hng-sdk/ui](./src/packages/ui)** - React UI component library with Tailwind CSS and shadcn/ui
  ```bash
  npm install @hng-sdk/ui
  ```

- **[@hng-sdk/email](./src/packages/emails)** - React email templates built with @react-email and Tailwind CSS
  ```bash
  npm install @hng-sdk/email
  ```

## 🚀 Quick Start

### Installation

```bash
# Install all packages
npm install hng-sdk

# Or install individual packages
npm install @hng-sdk/ui @hng-sdk/email
```

### Usage

#### UI Components

```tsx
import { Button } from '@hng-sdk/ui';
import '@hng-sdk/ui/globals.css';

function App() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
}
```

#### Email Templates

```typescript
import { WelcomeEmail } from '@hng-sdk/email';
import { render } from '@react-email/render';

const emailHtml = render(WelcomeEmail({ username: 'John' }));
// Send email using your preferred service
```

## 🏗️ Development

This project uses pnpm workspaces for managing the monorepo.

### Prerequisites

- Node.js 18+
- pnpm 10+

### Setup

```bash
# Clone the repository
git clone https://github.com/hngprojects/hng-sdk.git
cd hng-sdk

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run development mode
pnpm dev
```

### Workspace Commands

```bash
# Build all packages
pnpm build

# Run tests (when available)
pnpm test

# Clean build artifacts
pnpm clean

# Run development server for docs
cd src/apps/docs
pnpm dev
```

## 📚 Documentation

- **[UI Components](./src/packages/ui/README.md)** - Component library documentation
- **[Email Templates](./src/packages/emails/readme.md)** - Email templates documentation
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute to this project
- **[Code of Conduct](./CODE_OF_CONDUCT.md)** - Community guidelines

## 🛠️ Tech Stack

- **Language:** TypeScript 5.7
- **Framework:** React 19
- **Styling:** Tailwind CSS v4
- **Build Tool:** TypeScript Compiler
- **Package Manager:** pnpm
- **Email:** React Email
- **UI Components:** Radix UI + shadcn/ui
- **Monorepo:** pnpm Workspaces

## 📁 Project Structure

```
hng-sdk/
├── src/
│   ├── apps/
│   │   └── docs/              # Documentation site (Next.js)
│   └── packages/
│       ├── hng-sdk/           # Base package
│       ├── ui/                # UI component library
│       └── emails/            # Email templates
├── package.json               # Root package.json
├── pnpm-workspace.yaml        # Workspace configuration
├── tsconfig.base.json         # Shared TypeScript config
└── README.md                  # This file
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [React Email](https://react.email) - For the amazing email framework
- [shadcn/ui](https://ui.shadcn.com) - For the beautiful UI components
- [Radix UI](https://www.radix-ui.com) - For the accessible component primitives
- [Tailwind CSS](https://tailwindcss.com) - For the utility-first CSS framework

## 📞 Support

- 📧 Email: support@example.com
- 💬 Discord: [Join our community](https://discord.gg/example)
- 🐛 Issues: [GitHub Issues](https://github.com/hngprojects/hng-sdk/issues)

## 🗺️ Roadmap

- [ ] Add more UI components
- [ ] Create more email templates
- [ ] Add comprehensive testing
- [ ] Improve documentation
- [ ] Add Storybook for component playground
- [ ] Create CLI tool for scaffolding

---

Made with ❤️ by the HNG Team
