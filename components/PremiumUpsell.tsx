import React from 'react';
import type { SubscriptionFeatures } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface PremiumUpsellProps {
    features: SubscriptionFeatures;
    topCareer: string;
    onUpgradeClick: () => void;
}

const PremiumUpsell: React.FC<PremiumUpsellProps> = ({ features, topCareer, onUpgradeClick }) => {
    // Re-construct title for consistency, but use AI-generated description and features.
    const title = `Unlock Your ${topCareer} Potential with Premium`;
    // The AI is prompted to personalize the description, but we can add a fallback replacement.
    const description = features.description.replace(/\[Career Role]|Data Scientist/gi, topCareer);

    return (
        <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-8 md:p-12 rounded-2xl text-white text-center shadow-2xl border border-base-300">
            <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto mb-4 text-text-primary">
                {title}
            </h2>
            <p className="max-w-xl mx-auto mb-10 text-lg text-text-secondary">{description}</p>
            <div className="max-w-md mx-auto">
                <ul className="text-left space-y-4 mb-10 text-lg">
                    {features.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                            <CheckCircleIcon className="w-6 h-6 mr-4 text-brand-primary flex-shrink-0 mt-1"/>
                            <span className="text-text-primary">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <button onClick={onUpgradeClick} className="bg-brand-primary text-slate-900 font-bold py-3 px-10 rounded-full transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-primary/50">
                    Upgrade Now
                </button>
            </div>
      </div>
    );
};

export default PremiumUpsell;