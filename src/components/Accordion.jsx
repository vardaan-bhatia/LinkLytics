import React from "react";
import {
  Accordion as UIAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Accordion = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <UIAccordion type="multiple">
        {" "}
        {/* Allow multiple items to be expanded */}
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-left">
            How does LinkLytics provide analytics? {/* Trigger for item 1 */}
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-900 text-gray-300 rounded-md mt-2">
            {/* Content for item 1 */}
            LinkLytics offers detailed analytics for each shortened URL,
            including click counts, geographic locations of visitors, and device
            types, helping you understand your audience and optimize your
            strategy.
          </AccordionContent>
        </AccordionItem>
        <div className="my-2" />
        <AccordionItem value="item-2">
          <AccordionTrigger className="p-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-left">
            Is LinkLytics secure? {/* Trigger for item 2 */}
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-900 text-gray-300 rounded-md mt-2">
            {/* Content for item 2 */}
            Yes, LinkLytics ensures all shortened URLs are secure with HTTPS
            encryption, offering you reliable and safe links. We prioritize your
            data privacy and protect against malicious activities.
          </AccordionContent>
        </AccordionItem>
        <div className="my-2" />
        <AccordionItem value="item-3">
          <AccordionTrigger className="p-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-left">
            Can I track global clicks with LinkLytics?{" "}
            {/* Trigger for item 3 */}
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-900 text-gray-300 rounded-md mt-2">
            {/* Content for item 3 */}
            Absolutely! LinkLytics provides insights on where your clicks are
            coming from, allowing you to track engagement across countries and
            regions in real time.
          </AccordionContent>
        </AccordionItem>
        <div className="my-2" />
        <AccordionItem value="item-4">
          <AccordionTrigger className="p-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-left">
            How fast can I create shortened URLs? {/* Trigger for item 4 */}
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-900 text-gray-300 rounded-md mt-2">
            {/* Content for item 4 */}
            With LinkLytics, you can create shortened URLs instantly. Just input
            your long link, click a button, and you'll have a shortened link
            ready to share in seconds.
          </AccordionContent>
        </AccordionItem>
      </UIAccordion>
    </div>
  );
};

export default Accordion;
