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

interface InviteSurveyProps {
    receiverFullName: string;
    senderFullName: string;
    surveyId: string;
}

export const InviteSurvey = ({
    receiverFullName,
    senderFullName,
    surveyId,
}: InviteSurveyProps) => {
    return (
        <Html>
            <Head />
            <Preview>
                You have received a new survey from {senderFullName}! 📝
            </Preview>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container className="mx-auto py-5 pb-12">
                        <Text className="font-urban text-4xl font-bold text-[#3d61ff]">
                            Recognify
                        </Text>
                        <Text className="text-base">Hi {receiverFullName},</Text>
                        <Text className="text-base">
                            {senderFullName} has created a survey for you. Your feedback is valuable, and we encourage you to participate by clicking the button below.
                        </Text>
                        <Section className="my-5 text-center">
                            <Button
                                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-base text-white no-underline"
                                href={`https://recognify.io/dashboard/surveys/${surveyId}`}
                            >
                                Take the Survey
                            </Button>
                        </Section>
                        <Text className="text-base">
                            Thank you for contributing your thoughts and helping our team improve!
                        </Text>
                        <Hr className="my-4 border-t-2 border-gray-300" />
                        <Text className="text-sm text-gray-600">
                            71-75 Shelton Street, London, Greater London, United Kingdom, WC2H 9JQ
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};
