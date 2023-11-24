import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { useTranslations } from "next-intl";
import { FAQProps } from "@/src/types/spaylater";

const generateFAQItems = (numFAQs: number, t: any) => {
  let faqItems = [];
  for (let i = 1; i <= numFAQs; i++) {
    faqItems.push({
      id: `${i}`,
      question: t(`FAQ.FAQCard.question${i}`),
      answer: t(`FAQ.FAQCard.answer${i}`)
    });
  }
  return faqItems;
};

const FAQ = () => {
  const t = useTranslations("Home");

  const FAQS = generateFAQItems(6, t); // Assuming you have 6 FAQ items


  return (
    <div className="w-full bg-white rounded-[12px] border border-gray-200 shadow-md">
      <Accordion type="single" collapsible>
        {FAQS.map((faq) => (
          <div key={faq.id}>
            <AccordionItem className="px-3 md:px-[60px]" value={faq.id}>
              <AccordionTrigger className="py-[25px] gap-10 text-start md:text-xl leading-[20px] font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-left font-light text-[rgba(0,0,0,.741)]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
