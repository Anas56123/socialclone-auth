
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { translations } from '../translations';

interface LoginFormProps {
  onOpenSignup: () => void;
  lang: string;
  isDarkMode: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onOpenSignup, lang, isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const t = translations[lang] || translations['English (UK)'];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase
        .from('facebook_users')
        .select('*')
        .eq('email_or_phone', email)
        .eq('password', password)
        .single();

      if (error || !data) {
        setMessage({ type: 'error', text: lang === 'English (UK)' ? 'The email address or mobile number you entered isn\'t connected to an account.' : 'Authentication Failed.' });
      } else {
        setMessage({ type: 'success', text: `Welcome, ${data.first_name}!` });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-4 pb-6 rounded-lg shadow-xl w-full border transition-colors ${
      isDarkMode 
        ? 'bg-[#242526] border-[#3e4042]' 
        : 'bg-white border-gray-100'
    }`}>
      <form onSubmit={handleLogin} className="space-y-4">
        {message && (
          <div className={`p-3 text-sm rounded ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
            {message.text}
          </div>
        )}
        <input
          type="text"
          placeholder={t.email_placeholder}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#1877f2] focus:border-[#1877f2] text-lg transition-colors ${
            isDarkMode 
              ? 'bg-[#3a3b3c] border-[#3e4042] text-[#e4e6eb] placeholder-[#b0b3b8]' 
              : 'bg-white border-gray-300 text-black'
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t.password_placeholder}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#1877f2] focus:border-[#1877f2] text-lg transition-colors ${
            isDarkMode 
              ? 'bg-[#3a3b3c] border-[#3e4042] text-[#e4e6eb] placeholder-[#b0b3b8]' 
              : 'bg-white border-gray-300 text-black'
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1877f2] text-white font-bold py-3 rounded-md text-xl hover:bg-[#166fe5] transition duration-200 disabled:opacity-50"
        >
          {loading ? '...' : t.login}
        </button>
        <div className="text-center">
          <a href="#" className="text-[#1877f2] text-sm hover:underline">{t.forgotten}</a>
        </div>
        <hr className={`my-4 border transition-colors ${isDarkMode ? 'border-[#3e4042]' : 'border-gray-200'}`} />
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={onOpenSignup}
            className="bg-[#42b72a] text-white font-bold py-3 px-4 rounded-md text-lg hover:bg-[#36a420] transition duration-200"
          >
            {t.create_account}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
