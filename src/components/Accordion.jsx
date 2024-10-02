import React from "react";
import {
  Accordion as UIAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Accordion = () => {
  return (
    <div
      className="w-full mx-auto mt-8"
      data-aos="fade-left"
      data-aos-delay={100}
      data-aos-duration="800"
    >
      <UIAccordion type="multiple" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-left">
            How does LinkLytics provide analytics?
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-900 text-gray-300 rounded-md mt-2">
            LinkLytics offers detailed analytics for each shortened URL,
            including click counts, geographic locations of visitors, and device
            types, helping you understand your audience and optimize your
            strategy.
          </AccordionContent>
        </AccordionItem>
        <div className="my-2" />
        <AccordionItem value="item-2">
          <AccordionTrigger className="p-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-left">
            Is LinkLytics secure?
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-900 text-gray-300 rounded-md mt-2">
            Yes, LinkLytics ensures all shortened URLs are secure with HTTPS
            encryption, offering you reliable and safe links. We prioritize your
            data privacy and protect against malicious activities.
          </AccordionContent>
        </AccordionItem>
        <div className="my-2" />
        <AccordionItem value="item-3">
          <AccordionTrigger className="p-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-left">
            Can I track global clicks with LinkLytics?
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-900 text-gray-300 rounded-md mt-2">
            Absolutely! LinkLytics provides insights on where your clicks are
            coming from, allowing you to track engagement across countries and
            regions in real time.
          </AccordionContent>
        </AccordionItem>
        <div className="my-2" />
        <AccordionItem value="item-4">
          <AccordionTrigger className="p-4 bg-gray-800 text-white rounded-md hover:bg-gray text-left">
            How fast can I create shortened URLs?
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-900 text-gray-300 rounded-md mt-2">
            With LinkLytics, you can create shortened URLs instantly. Just input
            your long link, click a button, and you’ll have a shortened link
            ready to share in seconds.
          </AccordionContent>
        </AccordionItem>
      </UIAccordion>
    </div>
  );
};

export default Accordion;
