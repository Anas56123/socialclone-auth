
import React from 'react';

interface FooterProps {
  onLanguageChange: (lang: string) => void;
  currentLang: string;
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ onLanguageChange, currentLang, isDarkMode }) => {
  const languages = [
    'English (UK)', 'বাংলা', 'हिन्दी', 'اردو', 'नेपाली', 'ଓଡ଼ିଆ', 'ਪੰਜਾਬੀ', 'తెలుగు', 'தமிழ்', 'ಕನ್ನಡ', 'മലയാളം'
  ];

  return (
    <footer className={`w-full pt-8 pb-12 px-4 transition-colors ${isDarkMode ? 'bg-[#18191a]' : 'bg-white'}`}>
      <div className="max-w-[980px] mx-auto text-[#737373] text-xs">
        {/* Language Selection - Actually changes language now */}
        <div className={`flex flex-wrap gap-x-3 gap-y-2 border-b pb-4 mb-4 transition-colors ${isDarkMode ? 'border-[#3e4042]' : 'border-gray-200'}`}>
          {languages.map((lang) => (
            <button 
              key={lang} 
              onClick={() => onLanguageChange(lang)}
              className={`hover:underline transition-colors ${
                currentLang === lang 
                  ? 'text-gray-900 font-bold dark:text-white' 
                  : 'text-[#8a8d91]'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Copyright only - all links removed as requested */}
        <div className={`mt-4 ${isDarkMode ? 'text-[#b0b3b8]' : 'text-[#737373]'}`}>
          Meta © 2024
        </div>
      </div>
    </footer>
  );
};

export default Footer;
