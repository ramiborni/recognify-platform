import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "../shared/header-section";

const pricingFaqData = [
  {
    id: "item-2",
    question: "What is the Lifetime Deal (LTD) price?",
    answer:
      "Our LTD is a one-time payment of $127 for starter plan and $387 for growth plan, giving you access to all core features with no recurring fees. It's a great deal to unlock long-term value with no monthly or yearly payments.",
  },
  {
    id: "item-3",
    question: "What does the LTD include?",
    answer:
      "With the LTD, you'll get lifetime access to our Pro features, unlimited recognitions, team management tools, and future updates at no extra cost.",
  },
  {
    id: "item-4",
    question: "Are there any additional charges after purchasing the LTD?",
    answer:
      "Nope! Once you’ve paid for the LTD, you’ll have full access with no additional charges—ever.",
  },
  {
    id: "item-5",
    question: "Is there a refund policy for the LTD?",
    answer:
      "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, you can request a full refund within 30 days of purchase.",
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Explore our FAQ to find quick answers to common
          inquiries. If you need further assistance, don't hesitate to
          contact us for personalized help."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

