
import React, { useState } from 'react';
import { Smartphone, Bell, Share2, Settings, Wifi, Battery, Maximize2, X, MessageSquare, Phone } from 'lucide-react';
import { Notification, PhoneStatus } from '../types';

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', app: 'Messages', title: 'John Doe', content: 'See you at the meeting?', time: '2m ago' },
  { id: '2', app: 'Instagram', title: 'Photo liked', content: 'sarah_k liked your story', time: '15m ago' },
  { id: '3', app: 'Slack', title: 'Project Alpha', content: 'New feedback on the design', time: '1h ago' },
];

export const SamsungFlow: React.FC = () => {
  const [status] = useState<PhoneStatus>({
    battery: 82,
    signal: 'strong',
    deviceName: 'Galaxy S24 Ultra',
    isConnected: true
  });

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-800">Samsung Flow</h2>
            <p className="text-xs text-blue-600 font-medium">{status.isConnected ? 'Connected' : 'Disconnected'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <Share2 className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
          <Settings className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
        </div>
      </div>

      {/* Main Content Area - Split into Phone Screen and Notifications */}
      <div className="flex-1 overflow-y-auto hide-scrollbar p-6 flex flex-col gap-6">
        
        {/* Mirroring Simulation */}
        <div className="relative aspect-[9/16] max-w-[280px] mx-auto bg-gray-900 rounded-[2.5rem] border-[6px] border-gray-800 shadow-2xl overflow-hidden group">
          {/* Top Notch/Speaker */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-b-xl z-10 flex items-center justify-center">
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          </div>
          
          {/* Screen Content Mock */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/seed/galaxy/600/1000)' }}>
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Mock Icons */}
            <div className="absolute top-12 left-4 right-4 grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-xl" />
                  <div className="w-8 h-2 bg-white/50 rounded-full" />
                </div>
              ))}
            </div>

            {/* Smart View Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                <Maximize2 className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-8 items-center">
              <div className="w-3 h-3 border-2 border-white rotate-45" />
              <div className="w-4 h-4 rounded-full border-2 border-white" />
              <div className="w-3 h-3 border-2 border-white rounded-sm" />
            </div>
          </div>
        </div>

        {/* Device Info Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">{status.deviceName}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                <Battery className={`w-4 h-4 ${status.battery < 20 ? 'text-red-500' : 'text-green-500'}`} />
                {status.battery}%
              </div>
              <Wifi className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><Phone className="w-4 h-4" /></div>
              <span className="text-[10px] font-medium text-gray-500">Call</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="p-2 bg-green-50 text-green-600 rounded-full"><MessageSquare className="w-4 h-4" /></div>
              <span className="text-[10px] font-medium text-gray-500">Chat</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-full"><Share2 className="w-4 h-4" /></div>
              <span className="text-[10px] font-medium text-gray-500">File</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-full"><Settings className="w-4 h-4" /></div>
              <span className="text-[10px] font-medium text-gray-500">More</span>
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-gray-600 flex items-center gap-2">
              <Bell className="w-4 h-4" /> Phone Notifications
            </h3>
            <span className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer">Clear all</span>
          </div>
          {MOCK_NOTIFICATIONS.map((notif) => (
            <div key={notif.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start justify-between group animate-fade-in">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xs font-bold text-blue-600">
                  {notif.app[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">{notif.title}</span>
                    <span className="text-[10px] text-gray-400 font-medium">• {notif.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{notif.content}</p>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-gray-500 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
