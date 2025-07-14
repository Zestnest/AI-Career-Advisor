import React, { useEffect, useState } from 'react';
import type { CareerAdviceResponse, RecommendedCourse, UserInput } from '../types';
import { getCurrencyForCountry } from '../data/currencies';
import PremiumUpsell from './PremiumUpsell';
import FaqSection from './FaqSection';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { ClipboardDocumentIcon } from './icons/ClipboardDocumentIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface CareerResultsProps {
  results: CareerAdviceResponse;
  userInput: UserInput;
  onUpgradeClick: () => void;
}

const CourseTable: React.FC<{ courses: RecommendedCourse[] }> = ({ courses }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
            <thead className="border-b-2 border-base-300">
                <tr>
                    <th className="p-4 text-sm font-semibold text-text-secondary uppercase tracking-wider">Course</th>
                    <th className="p-4 text-sm font-semibold text-text-secondary uppercase tracking-wider">Platform</th>
                    <th className="p-4 text-sm font-semibold text-text-secondary uppercase tracking-wider">Est. Cost</th>
                    <th className="p-4 text-sm font-semibold text-text-secondary uppercase tracking-wider">Duration</th>
                    <th className="p-4 text-sm font-semibold text-text-secondary uppercase tracking-wider">Why it fits you</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course, index) => (
                    <tr key={index} className="border-b border-base-300 last:border-b-0 hover:bg-base-300/20">
                        <td className="p-4 align-top font-medium text-text-primary">
                            {course.link ? (
                                <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline hover:text-brand-dark">
                                    {course.title}
                                </a>
                            ) : (
                                course.title
                            )}
                        </td>
                        <td className="p-4 align-top text-text-secondary">{course.platform}</td>
                        <td className="p-4 align-top text-text-secondary font-semibold">{course.estimated_cost}</td>
                        <td className="p-4 align-top text-text-secondary font-medium">{course.duration}</td>
                        <td className="p-4 align-top text-text-secondary">{course.rationale}</td>
                    </tr>
                ))}
            </tbody>
            <caption className="caption-bottom text-sm text-text-secondary/80 p-4 text-center">
                This comprehensive learning roadmap was generated based on your profile. Course links may be affiliates.
            </caption>
        </table>
    </div>
);


const CareerResults: React.FC<CareerResultsProps> = ({ results, onUpgradeClick }) => {
  const { career_recommendations, ads_and_affiliates, subscription_features, faq } = results;
  const topRecommendation = career_recommendations[0];
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    if (topRecommendation?.career) {
      const newTitle = `Roadmap for ${topRecommendation.career} | AI Career Advisor`;
      const newDescription = `Your personalized AI-powered roadmap to becoming a ${topRecommendation.career}. Discover a step-by-step learning plan, course recommendations, and key insights.`;

      document.title = newTitle;
      document.querySelector('meta[name="description"]')?.setAttribute('content', newDescription);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', newTitle);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', newDescription);
      document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', newTitle);
      document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', newDescription);
      
      if (faq && faq.length > 0) {
        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
          }))
        };
        const faqScript = document.getElementById('faq-schema');
        if (faqScript) faqScript.textContent = JSON.stringify(faqSchema);
      }
    }
    
    return () => {
        const defaultTitle = 'AI Career Advisor: Personalized Career & Learning Paths';
        const defaultDescription = 'Get personalized career recommendations and a detailed learning roadmap powered by AI.';
        document.title = defaultTitle;
        document.querySelector('meta[name="description"]')?.setAttribute('content', defaultDescription);
        // Reset other tags as well...
        const faqScript = document.getElementById('faq-schema');
        if (faqScript) faqScript.textContent = '';
    };
  }, [results, topRecommendation, faq]);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="space-y-16">
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-3xl font-bold text-center text-text-primary">Top Career Recommendations</h2>
            <button 
                onClick={handleCopyLink}
                className="flex items-center gap-2 bg-base-300 hover:bg-brand-primary/20 text-text-primary font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out text-sm"
            >
                {isLinkCopied ? (
                    <>
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                        Link Copied!
                    </>
                ) : (
                    <>
                        <ClipboardDocumentIcon className="w-5 h-5" />
                        Copy Shareable Link
                    </>
                )}
            </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {career_recommendations.map((rec, index) => {
            const isTopMatch = index === 0;
            return (
              <article 
                key={index} 
                className={`p-8 rounded-2xl shadow-lg transition-all duration-300 border-2 bg-base-200 min-h-[320px] flex flex-col
                  ${isTopMatch 
                    ? 'border-brand-primary ring-2 ring-brand-primary/50' 
                    : 'border-base-300'
                  }`
                }>
                <div className="mb-4">
                   <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${isTopMatch ? 'bg-brand-primary/80 text-slate-900' : 'bg-base-300 text-brand-secondary font-semibold'}`}>
                     {isTopMatch ? 'Your Top Match' : 'Premium'}
                   </span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3 mt-1 flex items-center">
                  {rec.career}
                  {!isTopMatch && <LockClosedIcon className="w-5 h-5 ml-2 text-text-secondary" />}
                </h3>
                <p className="text-text-secondary text-base flex-grow">{rec.rationale}</p>
                
                {!isTopMatch && (
                  <div className="mt-6">
                    <button 
                      onClick={onUpgradeClick}
                      className="w-full bg-gray-600/50 text-gray-400 font-bold py-2 px-4 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
                      disabled
                    >
                      <LockClosedIcon className="w-4 h-4" />
                      Coming Soon
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-text-primary flex items-center"><span className="w-1.5 h-8 bg-brand-primary rounded-full mr-4"></span>Your Learning Roadmap for {topRecommendation.career}</h2>
        <div className="mb-6 p-4 bg-brand-primary/10 border border-brand-primary/30 rounded-lg">
          <p className="text-text-primary font-medium">
            📚 <strong>Complete 24-Month Learning Path:</strong> This comprehensive roadmap takes you from beginner to expert level with 4 progressive phases, detailed courses, realistic costs, and specific timeframes.
          </p>
        </div>
        {topRecommendation.learning_phases && topRecommendation.learning_phases.length > 0 ? (
            <div className="space-y-10">
            {topRecommendation.learning_phases.map((phase, index) => (
                <div key={index} className="bg-base-200 p-6 rounded-xl border border-base-300 shadow-md relative">
                    <div className="absolute -top-3 left-6 bg-brand-primary text-slate-900 px-3 py-1 rounded-full text-sm font-bold">
                        Phase {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-4">{phase.phase_title}</h3>
                    <div className="mb-4 flex flex-wrap gap-4 text-sm text-text-secondary">
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {phase.courses.length} courses
                        </span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {phase.phase_title.includes('1-6') ? '6 months' : 
                             phase.phase_title.includes('7-12') ? '6 months' :
                             phase.phase_title.includes('13-18') ? '6 months' :
                             phase.phase_title.includes('19-24') ? '6 months' : '6 months'}
                        </span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-8a7 7 0 1114 0 7 7 0 01-14 0z" clipRule="evenodd" />
                            </svg>
                            Phase cost: {phase.courses.reduce((total, course) => {
                                const cost = course.estimated_cost.match(/\d+/);
                                return total + (cost ? parseInt(cost[0]) : 0);
                            }, 0)} {getCurrencyForCountry(userInput.location)}
                        </span>
                    </div>
                    <CourseTable courses={phase.courses} />
                </div>
            ))}
            </div>
        ) : (
            <div className="bg-base-200 p-8 rounded-xl border border-base-300 text-center text-text-secondary">
                <div className="space-y-4">
                    <p className="text-lg font-semibold text-text-primary">⚠️ Learning Path Generation Issue</p>
                    <p>A comprehensive learning path could not be generated for this career recommendation.</p>
                    <div className="bg-yellow-900/20 border border-yellow-500/50 p-4 rounded-lg text-left">
                        <p className="font-semibold text-yellow-300 mb-2">Troubleshooting Steps:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Try providing more specific skills and experience details</li>
                            <li>• Ensure your interests and goals are clearly stated</li>
                            <li>• Check that all form fields are properly filled</li>
                            <li>• Try generating again - AI responses can vary</li>
                        </ul>
                    </div>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-brand-primary hover:bg-brand-dark text-slate-900 font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )}
      </section>
      
      <FaqSection faq={faq} />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-base-200 p-6 rounded-lg border border-base-300">
            <h3 className="text-2xl font-bold text-text-primary mb-3">Sponsored Tools & Resources</h3>
            <p className="text-text-secondary mb-4">{ads_and_affiliates.ad_sense_content}</p>
            <div className="space-y-3">
                {ads_and_affiliates.affiliate_resources.map((res, i) => (
                    <a key={i} href={res.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-brand-primary hover:text-brand-dark p-2 -ml-2 rounded-md transition-colors duration-200 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 flex-shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-4.5 0V6.75A2.25 2.25 0 0 1 15.75 4.5h1.5m-1.5 0L21 9m-6-4.5h6v6" />
                        </svg>
                        <span>{res.name}</span>
                    </a>
                ))}
            </div>
          </div>
          <div className="bg-base-200/50 p-6 rounded-lg border border-dashed border-base-300 h-full">
             <h4 className="text-sm font-semibold text-text-secondary tracking-widest uppercase text-center">Advertisement</h4>
             <div className="h-full min-h-[160px] flex items-center justify-center rounded-md mt-2">
                <p className="text-gray-500 text-center">Your Ad Here <br/> (AdSense Placement)</p>
             </div>
          </div>
      </section>

       <section>
          <PremiumUpsell
            features={subscription_features}
            topCareer={topRecommendation.career || 'Your'}
            onUpgradeClick={onUpgradeClick}
          />
       </section>
    </div>
  );
};

export default CareerResults;