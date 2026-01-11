
import React from 'react';
import { Calendar, FileText, Calculator, Image, Globe, Search, MoreHorizontal, LayoutGrid } from 'lucide-react';
import { AppType } from '../types';

interface AppLauncherProps {
  onSelectApp: (app: AppType) => void;
}

export const AppLauncher: React.FC<AppLauncherProps> = ({ onSelectApp }) => {
  const apps = [
    { id: AppType.NOTES, name: 'Notes', icon: FileText, color: 'bg-orange-500' },
    { id: AppType.CALENDAR, name: 'Calendar', icon: Calendar, color: 'bg-green-500' },
    { id: AppType.CALCULATOR, name: 'Calculator', icon: Calculator, color: 'bg-blue-500' },
    { id: AppType.BROWSER, name: 'Browser', icon: Globe, color: 'bg-indigo-500' },
    { id: AppType.GALLERY, name: 'Gallery', icon: Image, color: 'bg-pink-500' },
  ];

  return (
    <div className="flex flex-col h-full bg-white p-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Search Bar */}
        <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for apps..." 
            className="w-full h-16 pl-14 pr-6 bg-gray-100 rounded-[2rem] text-lg border-none focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>

        {/* Suggested Apps */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-blue-600" /> Suggested Apps
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => onSelectApp(app.id)}
                className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 ${app.color} rounded-[1.5rem] flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform`}>
                  <app.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{app.name}</span>
              </button>
            ))}
            
            {/* Mock Extra Button */}
            <button className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-gray-300 transition-all group">
              <div className="w-16 h-16 bg-gray-200 rounded-[1.5rem] flex items-center justify-center text-gray-400 shadow-sm">
                <MoreHorizontal className="w-8 h-8" />
              </div>
              <span className="text-sm font-semibold text-gray-500">More</span>
            </button>
          </div>
        </div>

        {/* Recent Activity Mock */}
        <div className="bg-blue-50 rounded-[2rem] p-8">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Continue where you left off</h3>
          <p className="text-blue-700 text-sm mb-6">Open Samsung Flow to sync with your phone's latest tasks.</p>
          <div className="flex gap-4">
            <div className="w-32 h-20 bg-white rounded-2xl shadow-sm"></div>
            <div className="w-32 h-20 bg-white rounded-2xl shadow-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
