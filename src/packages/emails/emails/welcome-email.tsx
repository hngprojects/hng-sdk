import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface WelcomeEmailProps {
  username?: string;
}

export const WelcomeEmail = ({
  username = 'User',
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to HNG SDK</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto bg-white py-5 px-0 mb-16">
            <Section className="px-12">
              <Heading className="text-[32px] leading-tight font-bold text-gray-700 mb-6">
                Welcome to HNG SDK! 👋
              </Heading>
              <Text className="text-base leading-relaxed text-gray-700 mb-4">
                Hi {username},
              </Text>
              <Text className="text-base leading-relaxed text-gray-700 mb-4">
                Thank you for joining us! We're excited to have you on board.
              </Text>
              <Text className="text-base leading-relaxed text-gray-700 mb-4">
                Get started by exploring our documentation and building something amazing.
              </Text>
              <Button
                className="bg-blue-600 rounded text-white text-base font-bold text-center block w-full py-3 px-4 mt-4 mb-4 no-underline"
                href="https://docs.example.com"
              >
                Get Started
              </Button>
              <Text className="text-base leading-relaxed text-gray-700 mb-4">
                If you have any questions, feel free to reach out to our support team.
              </Text>
              <Text className="text-sm leading-relaxed text-gray-500 mt-8">
                Best regards,
                <br />
                The HNG SDK Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
