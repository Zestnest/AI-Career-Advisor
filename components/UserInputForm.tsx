import React, { useState } from 'react';
import type { UserInput } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { RocketLaunchIcon } from './icons/RocketLaunchIcon';
import { GlobeAmericasIcon } from './icons/GlobeAmericasIcon';
import { countries } from '../data/countries';


interface UserInputFormProps {
  initialData: UserInput;
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
  onClear: () => void;
}

const FormTextArea: React.FC<{
  id: keyof UserInput;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
}> = ({ id, label, value, onChange, placeholder, icon }) => (
  <div>
    <label htmlFor={id} className="flex items-center text-lg font-semibold text-text-primary mb-2">
      {icon}
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-24 p-3 bg-base-200 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 text-text-secondary placeholder-gray-500"
      rows={3}
    />
  </div>
);

const UserInputForm: React.FC<UserInputFormProps> = ({ initialData, onSubmit, isLoading, onClear }) => {
  const [formData, setFormData] = useState<UserInput>(initialData);

  // Effect to sync form data when initialData (from URL) changes
  React.useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const handleClear = () => {
    setFormData({ education: '', skills: '', experience: '', interests: '', location: 'Worldwide', otherFactors: '' });
    onClear();
  };

  return (
    <div className="p-6 md:p-8 bg-base-200 rounded-xl shadow-lg border border-base-300">
        <form onSubmit={handleSubmit} className="space-y-6">
        <FormTextArea
            id="education"
            label="Education Background"
            value={formData.education}
            onChange={handleChange}
            placeholder="e.g., B.Sc. Computer Science, M.A. in Marketing"
            icon={<BookOpenIcon className="w-6 h-6 mr-2 text-brand-secondary" />}
        />

        <FormTextArea
            id="skills"
            label="Skill Set"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., Python, Data Analysis, Project Management, Public Speaking"
            icon={<SparklesIcon className="w-6 h-6 mr-2 text-brand-secondary" />}
        />

        <FormTextArea
            id="experience"
            label="Work Experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g., 2 years in IT support, 5 years as a Marketing Manager"
            icon={<BriefcaseIcon className="w-6 h-6 mr-2 text-brand-secondary" />}
        />

        <FormTextArea
            id="interests"
            label="Interests & Career Goals"
            value={formData.interests}
            onChange={handleChange}
            placeholder="e.g., Interested in Data Science, AI, and remote work. Goal is to become a Product Manager."
            icon={<LightBulbIcon className="w-6 h-6 mr-2 text-brand-secondary" />}
        />

        <div>
            <label htmlFor="location" className="flex items-center text-lg font-semibold text-text-primary mb-2">
                <GlobeAmericasIcon className="w-6 h-6 mr-2 text-brand-secondary" />
                Preferred Location
            </label>
            <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 bg-base-200 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 text-text-secondary"
            >
                {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
        </div>


        <FormTextArea
            id="otherFactors"
            label="Other Relevant Factors"
            value={formData.otherFactors}
            onChange={handleChange}
            placeholder="e.g., Work-life balance needs, specific industries"
            icon={<RocketLaunchIcon className="w-6 h-6 mr-2 text-brand-secondary" />}
        />

        <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
                type="button"
                onClick={handleClear}
                disabled={isLoading}
                className="w-full sm:w-auto bg-base-300 hover:bg-base-100 text-text-primary font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50"
            >
                Clear Form
            </button>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-3 bg-brand-primary hover:bg-brand-dark text-slate-900 font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none"
            >
            {isLoading ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Your Profile...
                </>
            ) : (
                'Generate Career Path'
            )}
            </button>
        </div>
        </form>
    </div>
  );
};

export default UserInputForm;