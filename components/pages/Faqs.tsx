import React from 'react'
import faq from "@/data/faqs.json";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const FaqsPage = () => {
  return (
    <div className="mt-16 sm:mt-20 lg:mt-24 relative">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800/20 dark:to-gray-900/20 rounded-3xl transform -skew-y-2"></div>
    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8 sm:mb-12 relative">
      <span className="inline-block transform hover:scale-105 transition-transform duration-300">
        Frequently Asked Questions
      </span>
    </h2>
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-3xl mx-auto relative"
    >
      {faq.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="group transition-all duration-300 hover:scale-[1.02] my-2"
        >
          <AccordionTrigger className="text-gray-800 dark:text-gray-100 text-base sm:text-lg group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
            <span className="flex items-center">
              <span className="mr-3 opacity-70">#{index + 1}</span>
              {faq.q}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 dark:text-gray-300 text-sm sm:text-base bg-gray-100/50 dark:bg-gray-800/20 rounded-lg p-4 mt-2 transform transition-all duration-300">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
  )
}

export default FaqsPage