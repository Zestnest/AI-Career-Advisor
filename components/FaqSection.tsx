import React from 'react';
import type { FaqItem } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface FaqSectionProps {
  faq: FaqItem[];
}

const FaqSection: React.FC<FaqSectionProps> = ({ faq }) => {
  if (!faq || faq.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-text-primary text-center">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faq.map((item, index) => (
          <details key={index} className="group bg-base-200 rounded-lg border border-base-300 p-1 cursor-pointer open:ring-1 open:ring-brand-primary open:shadow-lg">
            <summary className="flex items-center justify-between p-4 font-semibold text-text-primary list-none">
              <span className="text-left">{item.question}</span>
              <ChevronDownIcon className="w-5 h-5 text-text-secondary transition-transform duration-300 group-open:rotate-180 flex-shrink-0 ml-4" />
            </summary>
            <div className="p-4 pt-0 text-text-secondary">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;