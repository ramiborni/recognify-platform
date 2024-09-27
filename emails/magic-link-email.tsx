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

import { Icons } from "../components/shared/icons";

type MagicLinkEmailProps = {
  actionUrl: string;
  firstName: string;
  invitedBy?: string;
  mailType: "login" | "register" | "join-team";
  siteName: string;
};

export const MagicLinkEmail = ({
  firstName = "",
  actionUrl,
  mailType,
  siteName,
}: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Welcome to Recognify! Click the link below to {mailType === "login" ? "sign in to" : "activate"} your account.
    </Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="mx-auto py-5 pb-12">
          <Icons.logo className="m-auto block size-10" />
          <Text className="text-base">Hi {firstName},</Text>
          <Text className="text-base">
            Welcome to {siteName} ! Click the link below to{" "}
            {mailType === "login" ? "sign in to" : "activate"} your account.
          </Text>
          <Section className="my-5 text-center">
            <Button
              className="inline-block rounded-md bg-zinc-900 px-4 py-2 text-base text-white no-underline"
              href={actionUrl}
            >
              {mailType === "login" ? "Sign in" : "Activate Account"}
            </Button>
          </Section>
          <Text className="text-base">
            This link expires in 24 hours and can only be used once.
          </Text>
          {mailType === "login" ? (
            <Text className="text-base">
              If you did not try to log into your account, you can safely ignore
              it.
            </Text>
          ) : null}
          <Hr className="my-4 border-t-2 border-gray-300" />
          <Text className="text-sm text-gray-600">
            71-75 Shelton Street, London, Greater London, United Kingdom, WC2H 9JQ
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);


export const InviteMagicLinkEmail = ({
  firstName = "",
  invitedBy = "",
  actionUrl,
  mailType,
  siteName,
}: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>
      You have been invited by {invitedBy} to join a team in Recognify!
    </Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="mx-auto py-5 pb-12">
          <Icons.logo className="m-auto block size-10" />
          <Text className="text-base">Hi {firstName},</Text>
          <Text className="text-base">
            Welcome to {siteName}! You have been invited by {invitedBy} to join a team, Click the link below to{" "}
            {mailType === "login" ? "sign in to" : "activate"} your account.
          </Text>
          <Section className="my-5 text-center">
            <Button
              className="inline-block rounded-md bg-zinc-900 px-4 py-2 text-base text-white no-underline"
              href={actionUrl}
            >
              {mailType === "login" ? "Sign in" : "Activate Account"}
            </Button>
          </Section>
          <Text className="text-base">
            This link expires in 24 hours and can only be used once.
          </Text>
          {mailType === "login" ? (
            <Text className="text-base">
              If you did not try to log into your account, you can safely ignore
              it.
            </Text>
          ) : null}
          <Hr className="my-4 border-t-2 border-gray-300" />
          <Text className="text-sm text-gray-600">
            71-75 Shelton Street, London, Greater London, United Kingdom, WC2H 9JQ
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
