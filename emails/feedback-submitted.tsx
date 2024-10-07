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

interface FeedbackSubmittedProps {
  surveyCreatorName: string;
  respondentName: string;
  surveyName: string;
  surveyId: string;
}

export const FeedbackSubmitted = ({
  surveyCreatorName,
  respondentName,
  surveyName,
  surveyId,
}: FeedbackSubmittedProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        {respondentName} just submitted their responses to your "{surveyName}"
        survey! 📝
      </Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-5 pb-12">
            <Text className="font-urban text-4xl font-bold text-[#3d61ff]">
              Recognify
            </Text>
            <Text className="text-base">Hi {surveyCreatorName},</Text>
            <Text className="text-base">
              {respondentName} has completed the survey titled "{surveyName}".
              You can review their responses and gather insights by clicking the
              button below.
            </Text>
            <Section className="my-5 text-center">
              <Button
                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-base text-white no-underline"
                href={`https://recognify.io/dashboard/surveys/${surveyId}/statistics`}
              >
                View Survey Responses
              </Button>
            </Section>
            <Text className="text-base">
              Thanks for using Recognify to engage your team and drive
              meaningful feedback!
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
