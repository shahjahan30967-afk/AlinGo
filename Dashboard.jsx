import React from 'react';

const Dashboard = () => {
  const stats = [
    { title: 'آج کے آرڈرز', value: '124', color: 'bg-blue-500' },
    { title: 'کل آمدنی', value: 'Rs. 45,200', color: 'bg-green-500' },
    { title: 'فعال رائیڈرز', value: '18', color: 'bg-yellow-500' },
    { title: 'نئے ریسٹورنٹس', value: '5', color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Alingo Food ایڈمن ڈیش بورڈ</h1>
      
      {/* شماریاتی کارڈز (Stats Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} p-6 rounded-xl shadow-lg text-white`}>
            <p className="text-lg opacity-80">{stat.title}</p>
            <h2 className="text-3xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* حالیہ آرڈرز کی ٹیبل */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-xl font-bold">حالیہ آرڈرز</h3>
        </div>
        <table className="w-full text-right">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">آرڈر ID</th>
              <th className="p-4">کسٹمر</th>
              <th className="p-4">ریسٹورنٹ</th>
              <th className="p-4">رقم</th>
              <th className="p-4">اسٹیٹس</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">#AL-102</td>
              <td className="p-4">علی خان</td>
              <td className="p-4">Alingo Burger</td>
              <td className="p-4">Rs. 850</td>
              <td className="p-4 text-green-600 font-bold">پہنچ گیا</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">#AL-103</td>
              <td className="p-4">سارہ احمد</td>
              <td className="p-4">Pizza Palace</td>
              <td className="p-4">Rs. 1200</td>
              <td className="p-4 text-orange-500 font-bold">راستے میں ہے</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
