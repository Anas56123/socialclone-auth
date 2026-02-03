
import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import SignupModal from './components/SignupModal';
import Footer from './components/Footer';
import DataDashboard from './components/DataDashboard';
import { translations } from './translations';

const App: React.FC = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [lang, setLang] = useState('English (UK)');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const t = translations[lang] || translations['English (UK)'];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle simple navigation
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (currentPath === '/anasbaraa') {
    return <DataDashboard isDarkMode={isDarkMode} />;
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-between transition-colors duration-300 ${isDarkMode ? 'bg-[#18191a]' : 'bg-[#f0f2f5]'}`}>
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`px-4 py-2 rounded-full font-medium shadow-md transition-all ${
            isDarkMode 
              ? 'bg-[#3a3b3c] text-[#e4e6eb] hover:bg-[#4e4f50]' 
              : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
        >
          {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <main className="flex-grow w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 px-4 py-12 lg:py-32 max-w-[1000px]">
        
        {/* Left Section: Branding */}
        <div className="text-center lg:text-left max-w-[500px]">
          <h1 className="text-[#1877f2] text-5xl lg:text-6xl font-bold mb-4">facebook</h1>
          <p className={`text-2xl lg:text-3xl font-normal leading-tight ${isDarkMode ? 'text-[#e4e6eb]' : 'text-[#1c1e21]'}`}>
            {t.brand}
          </p>
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full max-w-[400px]">
          <LoginForm 
            onOpenSignup={() => setIsSignupOpen(true)} 
            lang={lang} 
            isDarkMode={isDarkMode} 
          />
          <p className={`text-sm mt-6 text-center lg:text-left ${isDarkMode ? 'text-[#b0b3b8]' : 'text-[#1c1e21]'}`}>
            <a href="#" className="font-bold hover:underline">{t.create_page.split(' ')[0]} {t.create_page.split(' ')[1]}</a> {t.create_page.split(' ').slice(2).join(' ')}
          </p>
        </div>
      </main>

      {/* Signup Modal */}
      {isSignupOpen && (
        <SignupModal 
          onClose={() => setIsSignupOpen(false)} 
          lang={lang} 
          isDarkMode={isDarkMode} 
        />
      )}

      {/* Footer */}
      <Footer onLanguageChange={setLang} currentLang={lang} isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;
