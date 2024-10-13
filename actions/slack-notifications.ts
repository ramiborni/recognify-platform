export const sendSlackNotification = async ({
  type,
  receiverName,
  senderName,
  points,
  webhookUrl,
  recognitionUrl,
  surveyUrl,
}: {
  type: "survey" | "recognition";
  receiverName?: string;
  senderName?: string;
  points?: number | null;
  webhookUrl: string;
  recognitionUrl?: string;
  surveyUrl?: string;
}) => {
  let slackMessage;

  if (type === "recognition") {
    slackMessage = {
      text: `🎉 Woohoo! You've Been Recognized!`,
      attachments: [
        {
          color: "#36a64f",
          fields: [
            {
              title: "Recognized By",
              value: `${senderName}`,
              short: true,
            },
            {
              title: "Recognition For",
              value: `${receiverName}`,
              short: true,
            },
            {
              title: "Points Earned",
              value: `${points} points 🎯`,
              short: true,
            },
            {
              title: "Celebrate Together!",
              value: `<${recognitionUrl}|🎈 Click here to view your awesome recognition! 🎈>`,
              short: false,
            },
          ],
          footer: "Keep up the amazing work! 🌟",
        },
      ],
    };
  } else if (type === "survey") {
    slackMessage = {
      text: `📋 New Survey Request`,
      attachments: [
        {
          color: "#ffcc00",
          fields: [
            {
              title: "Your Input is Needed",
              value: `<${surveyUrl}|📝 Click here to complete the survey and share your insights>`,
              short: false,
            },
          ],
          footer:
            "Your feedback is crucial in driving team improvements and making informed decisions.",
        },
      ],
    };
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slackMessage),
    });
  } catch (error) {
    console.error("Error sending Slack notification", error);
  }
};
