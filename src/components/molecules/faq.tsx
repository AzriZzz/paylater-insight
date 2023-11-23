import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { FAQS } from "@/src/constants/spaylater/faq";

const FAQ = () => {
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
