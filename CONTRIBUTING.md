# Contributing to HNG SDK

First off, thank you for considering contributing to HNG SDK! It's people like you that make HNG SDK such a great tool. We welcome contributions from everyone, whether you're a seasoned developer or just getting started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior by opening an issue or contacting the maintainers.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v10 or higher) - Package manager
- **Git** - Version control

```bash
# Install pnpm globally if you haven't already
npm install -g pnpm

# Verify installations
node --version
pnpm --version
git --version
```

### Understanding the Project

HNG SDK is a monorepo containing multiple packages:

- **hng-sdk** - Base package that re-exports all sub-packages
- **@hng-sdk/ui** - React UI component library with Tailwind CSS and shadcn/ui
- **@hng-sdk/email** - React email templates built with @react-email

The project uses:
- **pnpm workspaces** for monorepo management
- **TypeScript** for type safety
- **React 19** for components
- **Tailwind CSS v4** for styling

## Development Setup

### 1. Fork the Repository

Go to [https://github.com/hngprojects/hng-sdk](https://github.com/hngprojects/hng-sdk) and click the "Fork" button in the top right corner.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/hng-sdk.git
cd hng-sdk
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/hngprojects/hng-sdk.git
git remote -v  # Verify remotes
```

### 4. Install Dependencies

```bash
pnpm install
```

This will install all dependencies for all packages in the monorepo.

### 5. Build All Packages

```bash
pnpm build
```

### 6. Start Development Server (Optional)

```bash
# Start the docs app to see components in action
cd src/apps/docs
pnpm dev
```

Visit `http://localhost:3000` to see the documentation site.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check [existing issues](https://github.com/hngprojects/hng-sdk/issues) to avoid duplicates.

When creating a bug report, include:

- **Clear, descriptive title**
- **Steps to reproduce** the behavior
- **Expected vs actual behavior**
- **Screenshots or GIFs** (if applicable)
- **Environment details**:
  - OS (e.g., macOS 14.0, Ubuntu 22.04, Windows 11)
  - Node version (`node --version`)
  - pnpm version (`pnpm --version`)
  - Browser (if UI-related)
- **Additional context** or error messages

**Example Bug Report:**

```markdown
## Bug: Button component crashes when variant prop is undefined

### Steps to Reproduce
1. Import Button component
2. Use without variant prop: `<Button>Click me</Button>`
3. Component throws TypeError

### Expected Behavior
Should default to 'default' variant

### Actual Behavior
Throws: "Cannot read property 'variant' of undefined"

### Environment
- OS: macOS 14.0
- Node: v20.10.0
- pnpm: 10.18.2
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear, descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain the use case** - why would this be useful?
- **Provide examples** - mockups, code snippets, or references to similar features
- **Consider implementation** - is this a breaking change?

### Your First Code Contribution

Unsure where to begin? Look for issues tagged with:

- `good first issue` - Good for newcomers (simpler fixes/features)
- `help wanted` - Extra attention needed from the community
- `documentation` - Improvements or additions to documentation
- `bug` - Something isn't working

Comment on the issue to let others know you're working on it!

## Development Workflow

### 1. Sync Your Fork

```bash
# Make sure you're on main
git checkout main

# Fetch upstream changes
git fetch upstream

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

### 2. Create a Branch

```bash
# Create and checkout a new branch
git checkout -b feature/your-feature-name
```

**Branch Naming Conventions:**

- `feature/` - New features (e.g., `feature/add-dropdown-menu`)
- `fix/` - Bug fixes (e.g., `fix/button-hover-state`)
- `docs/` - Documentation changes (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-button-logic`)
- `test/` - Adding tests (e.g., `test/add-button-tests`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### 3. Make Your Changes

#### Working with UI Components

```bash
# Navigate to UI package
cd src/packages/ui

# Start development mode (watches for changes)
pnpm dev

# Add a shadcn component
npx shadcn@latest add <component-name>

# Build the package
pnpm build
```

**When adding a new component:**

1. Create component file in `src/components/`
2. Use Tailwind CSS for styling
3. Export from `src/index.ts`
4. Add proper TypeScript types
5. Use `React.forwardRef` if the component accepts refs
6. Add `displayName` for better debugging

**Example Component:**

```typescript
// src/components/card.tsx
import * as React from 'react';
import { cn } from '../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg bg-card text-card-foreground',
          variant === 'outlined' && 'border border-border',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
```

#### Working with Email Templates

```bash
# Navigate to email package
cd src/packages/emails

# Start preview server
pnpm dev
```

Visit `http://localhost:3000` to preview emails in your browser.

**When creating a new email template:**

1. Create file in `emails/` directory
2. Use `@react-email/components` for structure
3. Wrap content with `<Tailwind>` component
4. Export the component
5. Add to `index.ts`

**Example Email Template:**

```typescript
// emails/new-template.tsx
import { Html, Head, Body, Container, Text } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface NewTemplateProps {
  name: string;
}

export const NewTemplate = ({ name }: NewTemplateProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100">
          <Container className="mx-auto bg-white p-8">
            <Text className="text-lg">Hello {name}!</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
```

Then export in `index.ts`:

```typescript
export { NewTemplate } from './emails/new-template';
```

### 4. Test Your Changes

```bash
# Build all packages to check for TypeScript errors
pnpm build

# Test in the docs app
cd src/apps/docs
pnpm dev
```

Import and test your component in the docs app to ensure it works correctly.

### 5. Commit Your Changes

Follow the [Conventional Commits](#commit-messages) specification.

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat(ui): add card component with outlined variant"
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Create a Pull Request

1. Go to [https://github.com/hngprojects/hng-sdk](https://github.com/hngprojects/hng-sdk)
2. Click "New Pull Request"
3. Click "compare across forks"
4. Select your fork and branch
5. Fill in the PR template (details below)
6. Submit the pull request

## Coding Guidelines

### TypeScript

✅ **Do:**
- Use TypeScript for all code
- Export types/interfaces that consumers need
- Use strict types
- Prefer `interface` over `type` for object shapes
- Use `unknown` instead of `any` when type is truly unknown

❌ **Don't:**
- Use `any` type
- Skip type definitions
- Ignore TypeScript errors

```typescript
// ✅ Good
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', ...props }) => {
  // implementation
};

// ❌ Bad
const Button = (props: any) => {
  // implementation
};
```

### React

✅ **Do:**
- Use functional components with hooks
- Use `React.forwardRef` for components that need refs
- Add `displayName` for better debugging
- Use proper event handler types

❌ **Don't:**
- Use class components
- Mutate props
- Use inline functions in JSX (when avoidable for performance)

```typescript
// ✅ Good
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, ...props }, ref) => {
    return (
      <button ref={ref} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Tailwind CSS

✅ **Do:**
- Use Tailwind utility classes
- Use `cn()` utility for conditional classes
- Follow consistent class ordering
- Use theme colors (e.g., `bg-primary`, `text-foreground`)

❌ **Don't:**
- Write custom CSS (unless absolutely necessary)
- Use arbitrary values excessively (e.g., `w-[127px]`)
- Mix inline styles with Tailwind classes

```typescript
// ✅ Good
import { cn } from '../lib/utils';

<button
  className={cn(
    'inline-flex items-center justify-center rounded-md px-4 py-2',
    'bg-primary text-primary-foreground',
    'hover:bg-primary/90',
    'disabled:opacity-50 disabled:pointer-events-none',
    variant === 'outline' && 'border border-input bg-transparent',
    className
  )}
/>

// ❌ Bad
<button style={{ backgroundColor: '#0070f3' }} className="px-4">
```

### File Naming

- **Components**: PascalCase (e.g., `Button.tsx`, `CardHeader.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`, `formatDate.ts`)
- **Types**: camelCase with `.types.ts` suffix (e.g., `button.types.ts`)
- **Tests**: Same as source with `.test.ts` or `.spec.ts` suffix

### Code Organization

```
src/packages/ui/
├── src/
│   ├── components/           # React components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── lib/                  # Utility functions
│   │   └── utils.ts
│   ├── hooks/                # Custom React hooks
│   │   └── use-toast.ts
│   ├── global.css            # Global styles
│   └── index.ts              # Package exports
├── package.json
├── tsconfig.json
├── components.json           # shadcn config
└── README.md
```

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation only changes
- `style` - Changes that don't affect code meaning (formatting, whitespace)
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks (deps, build config, etc.)

### Scopes

- `ui` - UI component library
- `email` - Email templates
- `docs` - Documentation site
- `core` - Base hng-sdk package
- `deps` - Dependencies
- `ci` - CI/CD changes

### Examples

```bash
# Adding a new feature
feat(ui): add dropdown menu component

Add a fully accessible dropdown menu component built with Radix UI.
Includes keyboard navigation and proper ARIA attributes.

Closes #45

# Fixing a bug
fix(email): correct spacing in welcome email template

The welcome email had incorrect padding on mobile devices.
This fixes the responsive layout issues.

Fixes #78

# Documentation update
docs: add contribution guidelines for email templates

# Dependency update
chore(deps): upgrade react to 19.1.0

# Performance improvement
perf(ui): optimize button render performance

Memoize button variants to reduce re-renders by 30%.
```

### Commit Message Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep subject line under 72 characters
- Reference issues and PRs in footer
- Explain *what* and *why*, not *how*

## Pull Request Process

### Before Submitting

- [ ] Code builds without errors (`pnpm build`)
- [ ] Changes tested locally
- [ ] Documentation updated (if needed)
- [ ] Commits follow conventional commits format
- [ ] Branch is up to date with upstream main

### PR Title Format

Use the same format as commit messages:

```
feat(ui): add dropdown menu component
fix(email): resolve spacing issues in mobile view
docs: improve installation instructions
```

### PR Description Template

```markdown
## Description

Brief description of what this PR does and why.

## Related Issue

Fixes #123
Closes #456

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Performance improvement

## Changes Made

- Added dropdown menu component
- Updated button styles
- Fixed mobile responsive issues

## Screenshots (if applicable)

[Add screenshots or GIFs showing the changes]

## Testing

How has this been tested?

- [ ] Tested locally in development
- [ ] Tested in docs app
- [ ] Tested in production build
- [ ] Tested on different browsers (Chrome, Firefox, Safari)
- [ ] Tested responsive behavior

## Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

### Review Process

1. **Automated Checks** - CI/CD will run TypeScript checks and builds
2. **Maintainer Review** - A maintainer will review your code
3. **Feedback** - Address any requested changes
4. **Approval** - Once approved, your PR will be merged
5. **Recognition** - You'll be credited in release notes!

### After Your PR is Merged

1. Delete your feature branch
2. Update your local main branch
3. Celebrate! 🎉

```bash
# Delete local branch
git branch -d feature/your-feature-name

# Delete remote branch
git push origin --delete feature/your-feature-name

# Update local main
git checkout main
git pull upstream main
```

## Community

### Getting Help

- **GitHub Discussions** - Ask questions, share ideas
- **GitHub Issues** - Report bugs, request features
- **Stack Overflow** - Tag with `hng-sdk`

### Code Review

All submissions require review. We use GitHub pull requests for this purpose.

**What Reviewers Look For:**

- Code quality and maintainability
- TypeScript type safety
- Proper error handling
- Performance considerations
- Accessibility (for UI components)
- Documentation completeness

### Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes
- Package documentation

## Style Guide Quick Reference

### TypeScript
```typescript
// Use interfaces for props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

// Export types
export type { ButtonProps };
```

### React
```typescript
// Use forwardRef
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <button ref={ref} {...props} />
);

Button.displayName = 'Button';
```

### Tailwind
```typescript
// Use cn utility for conditional classes
className={cn(
  'base classes',
  condition && 'conditional classes',
  className
)}
```

## Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Email Docs](https://react.email/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [pnpm Documentation](https://pnpm.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Questions?

Don't hesitate to ask! You can:

- Open a [GitHub Discussion](https://github.com/hngprojects/hng-sdk/discussions)
- Comment on an existing issue
- Tag maintainers in your PR

---

Thank you for contributing to HNG SDK! Your efforts help make this project better for everyone. 🙌

Happy coding! 🚀
