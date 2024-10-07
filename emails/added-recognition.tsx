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
  
  interface AddedRecognitionProps {
    receiverFullName: string;
    senderFullName: string;
    points: number;
  }
  export const AddedRecognition = ({
    receiverFullName,
    senderFullName,
    points,
  }: AddedRecognitionProps) => {
    return (
      <Html>
        <Head />
        <Preview>
          {senderFullName} recognized you in a Recognition and awarded you {points.toString()} points! 🌟
        </Preview>
        <Tailwind>
          <Body className="bg-white font-sans">
            <Container className="mx-auto py-5 pb-12">
              <Text className="font-urban text-4xl font-bold text-[#3d61ff]">
                Recognify
              </Text>
              <Text className="text-base">Hi {receiverFullName},</Text>
              <Text className="text-base">
                You&apos;ve been recognized by {senderFullName} for your amazing work and
                awarded {points} points! Check out the details of your recognition by clicking
                the button below.
              </Text>
              <Section className="my-5 text-center">
                <Button
                  className="inline-block rounded-md bg-blue-600 px-4 py-2 text-base text-white no-underline"
                  href="https://recognify.io/dashboard/recognitions"
                >
                  View Your Recognition
                </Button>
              </Section>
              <Text className="text-base">
                Thanks for being an awesome part of the team and spreading positivity!
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
  