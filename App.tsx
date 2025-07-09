import React, { useState, useCallback, useEffect } from 'react';
import type { UserInput, CareerAdviceResponse } from './types';
import UserInputForm from './components/UserInputForm';
import CareerResults from './components/CareerResults';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import { generateCareerAdvice } from './services/geminiService';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { DynamicBanner } from './components/DynamicBanner';
import SubscriptionPage from './components/SubscriptionPage';

const defaultUserInput: UserInput = {
    education: 'B.Sc. Computer Science',
    skills: 'Python, Data Analysis, SQL',
    experience: '2 years in IT support',
    interests: 'Data Science, Machine Learning, Remote Work',
    location: 'Worldwide',
    otherFactors: 'Prefers working in the tech industry.'
};

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<UserInput>(defaultUserInput);
  const [results, setResults] = useState<CareerAdviceResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'form' | 'subscription'>('form');

  const handleSubmit = useCallback(async (data: UserInput) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    setUserInput(data);
    
    // Update URL to be shareable
    try {
        const encodedData = btoa(JSON.stringify(data));
        window.history.pushState(null, '', `?data=${encodedData}`);
    } catch (e) {
        console.error("Failed to encode or push state:", e);
    }
    
    try {
      const apiResponse = await generateCareerAdvice(data);
      if (apiResponse.career_recommendations?.[0] && !apiResponse.career_recommendations[0].learning_phases) {
          apiResponse.career_recommendations[0].learning_phases = [];
      }
      setResults(apiResponse);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to load data from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (data) {
        try {
            const decodedData = JSON.parse(atob(data));
            setUserInput(decodedData);
            handleSubmit(decodedData);
        } catch (e) {
            console.error("Failed to parse data from URL, using default.", e);
            setUserInput(defaultUserInput);
        }
    }
  }, [handleSubmit]);
  
  const handleUpgradeClick = () => setView('subscription');
  
  const handleBackToMain = () => {
    const defaultTitle = 'AI Career Advisor: Personalized Career & Learning Paths';
    const defaultDescription = 'Get personalized career recommendations and a detailed learning roadmap powered by AI. Discover your next career move, get a step-by-step plan with courses and timelines, and unlock your potential.';
    document.title = defaultTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', defaultDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', defaultTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', defaultDescription);
    document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', defaultTitle);
    document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', defaultDescription);

    const faqScript = document.getElementById('faq-schema');
    if (faqScript) faqScript.textContent = '';
    
    // Clear results and URL params
    setResults(null);
    setError(null);
    window.history.pushState(null, '', window.location.pathname);

    setView('form');
  };
  
  const handleRetry = () => {
      if (userInput) {
          handleSubmit(userInput);
      }
  };
  
  const handleClearForm = () => {
    setUserInput({ education: '', skills: '', experience: '', interests: '', location: 'Worldwide', otherFactors: '' });
  };


  return (
    <div className="min-h-screen bg-base-100 font-sans">
      <DynamicBanner>
        <header className="container mx-auto px-4 pt-6 z-10 relative">
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-text-primary">AI Career Advisor</div>
            </div>
        </header>
        {view !== 'subscription' && (
            <main className="container mx-auto px-4 py-8 md:py-12 z-10 relative">
              <section className="text-center mb-12">
                <div className="flex justify-center items-center gap-4 mb-4">
                   <SparklesIcon className="w-12 h-12 text-brand-primary" />
                   <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
                      Unlock Your Professional Future
                   </h1>
                </div>
                <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                  Get personalized career paths and a step-by-step learning roadmap powered by Gemini.
                </p>
              </section>
            </main>
        )}
      </DynamicBanner>
      
      {view === 'subscription' ? (
        <SubscriptionPage onBack={handleBackToMain} />
      ) : (
        <div className="container mx-auto px-4 -mt-16 relative z-20">
          <div className="max-w-4xl mx-auto">
            <UserInputForm
              initialData={userInput}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              onClear={handleClearForm}
            />

            {isLoading && <Loader />}
            {error && <ErrorDisplay message={error} onRetry={handleRetry} />}
            {results && (
              <div className="mt-12 animate-fade-in">
                <CareerResults results={results} userInput={userInput} onUpgradeClick={handleUpgradeClick}/>
              </div>
            )}
          </div>
        </div>
      )}
      
      <footer className="text-center p-4 mt-8 text-sm text-text-secondary/80">
        <p>Powered by Google Gemini. Deployed securely by a Development Architect.</p>
      </footer>
    </div>
  );
};

export default App;