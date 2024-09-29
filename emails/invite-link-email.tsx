import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { Icons } from "@/components/shared/icons";

interface InviteLinkEmailProps {
  invitationName: string;
  invitationEmail: string;
  senderName: string;
  invitationToken: string
}
export const InviteLinkEmail = ({
  invitationName,
  invitationEmail,
  senderName,
  invitationToken
}: InviteLinkEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        You have been invited by {senderName} to join a team in Recognify!
      </Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-5 pb-12">
            <Text className="font-urban text-4xl font-bold text-primary">
              Recognify
            </Text>
            <Text className="text-base">Hi {invitationName},</Text>
            <Text className="text-base">
              Welcome to Recognify! You have been invited by {senderName} to
              join a team, Click the link below to activate your account.
            </Text>
            <Section className="my-5 text-center">
              <Button
                className="inline-block rounded-md bg-zinc-900 px-4 py-2 text-base text-white no-underline"
                href={`https://recognify.com/invite/${invitationToken}`}
              >
                Activate Account
              </Button>
            </Section>
            <Text className="text-base">
              This link expires in 24 hours and can only be used once.
            </Text>
            <Text className="text-base">
              If you don&apos;t know {senderName}, you can safely ignore it.
            </Text>
            <Hr className="my-4 border-t-2 border-gray-300" />
            <Text className="text-sm text-gray-600">
              71-75 Shelton Street, London, Greater London, United Kingdom, WC2H
              9JQ
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
