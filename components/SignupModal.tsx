
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { translations } from '../translations';

interface SignupModalProps {
  onClose: () => void;
  lang: string;
  isDarkMode: boolean;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose, lang, isDarkMode }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    password: '',
    day: '1',
    month: 'Jan',
    year: '2024',
    gender: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang] || translations['English (UK)'];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.gender) {
      setError('Please select a gender.');
      setLoading(false);
      return;
    }

    try {
      const birthday = `${formData.year}-${months.indexOf(formData.month) + 1}-${formData.day}`;
      const { error: insertError } = await supabase
        .from('facebook_users')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email_or_phone: formData.emailOrPhone,
          password: formData.password,
          birthday: birthday,
          gender: formData.gender
        }]);

      if (insertError) throw insertError;
      alert('Account created successfully!');
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-colors ${
      isDarkMode ? 'bg-[#1c1e21]/90' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className={`w-full max-w-[432px] rounded-lg shadow-2xl border transition-colors relative overflow-hidden ${
        isDarkMode ? 'bg-[#242526] border-[#3e4042]' : 'bg-white border-gray-200'
      }`}>
        <div className={`px-4 py-3 border-b flex justify-between items-start transition-colors ${
          isDarkMode ? 'border-[#3e4042]' : 'border-gray-200'
        }`}>
          <div>
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-[#e4e6eb]' : 'text-[#1c1e21]'}`}>{t.signup_title}</h2>
            <p className={`text-sm ${isDarkMode ? 'text-[#b0b3b8]' : 'text-[#606770]'}`}>{t.signup_subtitle}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSignup} className="p-4 space-y-3">
          {error && (
            <div className="p-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <input
              name="firstName"
              placeholder={t.first_name}
              className={`flex-1 px-3 py-2 border rounded-md focus:outline-none ${
                isDarkMode ? 'bg-[#3a3b3c] border-[#3e4042] text-white' : 'bg-[#f5f6f7] border-gray-300'
              }`}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder={t.last_name}
              className={`flex-1 px-3 py-2 border rounded-md focus:outline-none ${
                isDarkMode ? 'bg-[#3a3b3c] border-[#3e4042] text-white' : 'bg-[#f5f6f7] border-gray-300'
              }`}
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="emailOrPhone"
            placeholder={t.email_placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              isDarkMode ? 'bg-[#3a3b3c] border-[#3e4042] text-white' : 'bg-[#f5f6f7] border-gray-300'
            }`}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder={t.password_placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              isDarkMode ? 'bg-[#3a3b3c] border-[#3e4042] text-white' : 'bg-[#f5f6f7] border-gray-300'
            }`}
            onChange={handleChange}
            required
          />

          <div>
            <label className={`text-xs flex items-center gap-1 mb-1 ${isDarkMode ? 'text-[#b0b3b8]' : 'text-[#606770]'}`}>
              {t.birthday}
            </label>
            <div className="flex gap-3">
              {['day', 'month', 'year'].map((type) => (
                <select 
                  key={type}
                  name={type} 
                  className={`flex-1 border rounded-md px-2 py-1 text-sm ${
                    isDarkMode ? 'bg-[#3a3b3c] border-[#3e4042] text-[#e4e6eb]' : 'bg-white border-gray-300'
                  }`} 
                  onChange={handleChange}
                >
                  {type === 'day' && days.map(d => <option key={d} value={d}>{d}</option>)}
                  {type === 'month' && months.map(m => <option key={m} value={m}>{m}</option>)}
                  {type === 'year' && years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              ))}
            </div>
          </div>

          <div>
            <label className={`text-xs flex items-center gap-1 mb-1 ${isDarkMode ? 'text-[#b0b3b8]' : 'text-[#606770]'}`}>
              {t.gender}
            </label>
            <div className="flex gap-3">
              {[t.female, t.male, t.custom].map((g, idx) => (
                <div key={idx} className={`flex-1 border rounded-md px-2 py-1 flex justify-between items-center transition-colors ${
                  isDarkMode ? 'bg-[#3a3b3c] border-[#3e4042] text-[#e4e6eb]' : 'bg-white border-gray-300'
                }`}>
                  <span className="text-sm">{g}</span>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    className="cursor-pointer"
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#00a400] text-white font-bold py-1.5 px-16 rounded-md text-lg hover:bg-[#008a00] transition duration-200 shadow-md disabled:opacity-50"
            >
              {loading ? '...' : t.signup_btn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
