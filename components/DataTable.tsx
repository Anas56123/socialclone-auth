import React, { useState } from 'react';

interface DataTableProps {
  isDarkMode: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ isDarkMode }) => {
  const [data] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', date: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', date: '2024-01-16' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'Inactive', date: '2024-01-17' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', date: '2024-01-18' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', status: 'Active', date: '2024-01-19' },
  ]);

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-[#18191a]' : 'bg-[#f0f2f5]'}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-[#e4e6eb]' : 'text-[#1c1e21]'}`}>
          Data Dashboard
        </h1>
        
        <div className={`rounded-lg shadow-lg overflow-hidden ${isDarkMode ? 'bg-[#242526]' : 'bg-white'}`}>
          <table className="w-full">
            <thead>
              <tr className={isDarkMode ? 'bg-[#3a3b3c]' : 'bg-[#f0f2f5]'}>
                <th className={`px-6 py-4 text-left font-semibold ${isDarkMode ? 'text-[#e4e6eb]' : 'text-[#1c1e21]'}`}>ID</th>
                <th className={`px-6 py-4 text-left font-semibold ${isDarkMode ? 'text-[#e4e6eb]' : 'text-[#1c1e21]'}`}>Name</th>
                <th className={`px-6 py-4 text-left font-semibold ${isDarkMode ? 'text-[#e4e6eb]' : 'text-[#1c1e21]'}`}>Email</th>
                <th className={`px-6 py-4 text-left font-semibold ${isDarkMode ? 'text-[#e4e6eb]' : 'text-[#1c1e21]'}`}>Status</th>
                <th className={`px-6 py-4 text-left font-semibold ${isDarkMode ? 'text-[#e4e6eb]' : 'text-[#1c1e21]'}`}>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className={`border-t ${isDarkMode ? 'border-[#3a3b3c] hover:bg-[#3a3b3c]' : 'border-[#ccc] hover:bg-[#f5f5f5]'}`}>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-[#b0b3b8]' : 'text-[#1c1e21]'}`}>{row.id}</td>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-[#b0b3b8]' : 'text-[#1c1e21]'}`}>{row.name}</td>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-[#b0b3b8]' : 'text-[#1c1e21]'}`}>{row.email}</td>
                  <td className={`px-6 py-4 ${row.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{row.status}</td>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-[#b0b3b8]' : 'text-[#1c1e21]'}`}>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button 
          onClick={() => window.history.back()}
          className={`mt-6 px-6 py-2 rounded-lg font-medium transition-all ${
            isDarkMode 
              ? 'bg-[#3a3b3c] text-[#e4e6eb] hover:bg-[#4e4f50]' 
              : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default DataTable;
