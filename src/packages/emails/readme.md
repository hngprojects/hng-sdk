# @hng-sdk/email

React email templates for the HNG SDK, built with [@react-email](https://react.email) and styled with Tailwind CSS.

## Installation

```bash
npm install @hng-sdk/email
# or
pnpm add @hng-sdk/email
# or
yarn add @hng-sdk/email
```

## Usage

```typescript
import { WelcomeEmail } from '@hng-sdk/email';
import { render } from '@react-email/render';

// Render email to HTML
const emailHtml = render(WelcomeEmail({ username: 'John' }));

// Send email using your preferred email service
// For example, with Resend, Nodemailer, SendGrid, etc.
```

## Features

- 📧 **React-based templates** - Write emails using React components
- 🎨 **Tailwind CSS styling** - Use familiar Tailwind classes via `@react-email/tailwind`
- 🔍 **Live preview** - Preview your emails in real-time during development
- 📱 **Responsive** - Email templates that work across all email clients
- 🚀 **TypeScript support** - Fully typed components

## Development

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server to preview emails:

```bash
pnpm dev
```

Open [localhost:3000](http://localhost:3000) with your browser to see the email preview.

## Building

To build the package for npm publishing:

```bash
pnpm build
```

To build the email preview server:

```bash
pnpm build:preview
```

## Available Templates

- **WelcomeEmail** - A simple welcome email template with Tailwind styling
  - Props: `username?: string`

## Creating New Templates

Create a new file in the `emails/` directory:

```tsx
import { Html, Head, Body, Container, Text } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface MyEmailProps {
  name: string;
}

export const MyEmail = ({ name }: MyEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100">
          <Container className="mx-auto bg-white p-8">
            <Text className="text-lg text-gray-800">
              Hello {name}!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
```

Then export it from `index.ts`:

```typescript
export { MyEmail } from './emails/my-email';
```

## License

ISC
