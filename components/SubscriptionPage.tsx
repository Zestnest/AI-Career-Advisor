import React from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface SubscriptionPageProps {
    onBack: () => void;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onBack }) => {
    return (
        <div className="animate-fade-in container mx-auto px-4 py-8 md:py-12 z-10 relative">
            <button onClick={onBack} className="mb-8 text-brand-secondary hover:text-brand-primary font-semibold flex items-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Back to Results
            </button>
            
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">Unlock Your Full Potential</h1>
                <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mt-4">
                    Upgrade to Premium to access detailed learning roadmaps for all career recommendations, plus advanced AI-powered tools to accelerate your journey.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
                <div className="bg-base-200 border-2 border-brand-primary p-8 rounded-xl shadow-lg flex flex-col transform transition-transform hover:scale-105">
                    <h2 className="text-2xl font-bold text-text-primary">Monthly</h2>
                    <p className="text-text-secondary mt-2 flex-grow">Perfect for getting started.</p>
                    <div className="my-6">
                        <span className="text-5xl font-bold text-text-primary">$19</span>
                        <span className="text-text-secondary">/month</span>
                    </div>
                    <button className="w-full bg-brand-primary hover:bg-brand-dark text-slate-900 font-bold py-3 px-4 rounded-lg transition duration-300">Choose Monthly</button>
                    <div className="mt-2 text-center">
                        <span className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">Coming Soon</span>
                    </div>
                </div>
                <div className="bg-base-200 border border-base-300 p-8 rounded-xl flex flex-col transform transition-transform hover:scale-105 hover:border-brand-secondary/50">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-text-primary">Annual</h2>
                        <span className="text-xs font-bold bg-brand-secondary/80 text-slate-900 px-3 py-1 rounded-full">Save 25%</span>
                    </div>
                    <p className="text-text-secondary mt-2 flex-grow">Commit to your career growth.</p>
                    <div className="my-6">
                        <span className="text-5xl font-bold text-text-primary">$170</span>
                        <span className="text-text-secondary">/year</span>
                    </div>
                    <button className="w-full bg-base-300 hover:bg-brand-secondary/40 text-text-primary font-bold py-3 px-4 rounded-lg transition duration-300">Choose Annual</button>
                    <div className="mt-2 text-center">
                        <span className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">Coming Soon</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-12 bg-base-200 p-8 rounded-xl border border-base-300">
                <h3 className="text-2xl font-bold text-center text-text-primary mb-6">All Premium Plans Include:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-text-primary">
                    {[
                        "Roadmaps for All Career Paths",
                        "Personalized Interview Prep Questions",
                        "AI-Powered Resume Review",
                        "Cover Letter Generation",
                        "Priority Support",
                        "Ad-Free Experience"
                    ].map(feature => (
                        <li key={feature} className="flex items-center">
                            <CheckCircleIcon className="w-5 h-5 mr-3 text-brand-primary flex-shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SubscriptionPage;