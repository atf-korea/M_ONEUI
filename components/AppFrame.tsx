
import React, { useState } from 'react';
import { X, Minimize2, Maximize2, RotateCcw, Search, Sparkles, Send } from 'lucide-react';
import { AppType } from '../types';
import { getSmartAssistantResponse } from '../services/geminiService';

interface AppFrameProps {
  type: AppType;
  onClose: () => void;
}

export const AppFrame: React.FC<AppFrameProps> = ({ type, onClose }) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  const handleAskAi = async () => {
    if (!aiPrompt.trim()) return;
    setIsAsking(true);
    const response = await getSmartAssistantResponse(aiPrompt);
    setAiResponse(response);
    setIsAsking(false);
  };

  const renderContent = () => {
    switch (type) {
      case AppType.NOTES:
        return (
          <div className="p-8 h-full flex flex-col gap-4">
            <input 
              className="text-3xl font-bold bg-transparent border-none focus:outline-none placeholder:text-gray-300" 
              placeholder="Title" 
              defaultValue="Project Meeting Notes"
            />
            <textarea 
              className="flex-1 bg-transparent border-none focus:outline-none resize-none text-lg leading-relaxed placeholder:text-gray-300"
              placeholder="Start writing..."
              defaultValue="1. Finalize multi-window design\n2. Integrate Samsung Flow mirroring\n3. Add Gemini AI capabilities for smarter multitasking..."
            />
          </div>
        );
      case AppType.CALCULATOR:
        return (
          <div className="flex flex-col h-full bg-black text-white p-6 justify-end font-light">
            <div className="text-right text-gray-400 text-2xl mb-2">1,240 + 450</div>
            <div className="text-right text-6xl mb-8">1,690</div>
            <div className="grid grid-cols-4 gap-4">
              {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((key) => (
                <button 
                  key={key} 
                  className={`h-16 rounded-full flex items-center justify-center text-xl font-medium transition-transform active:scale-95
                    ${['÷', '×', '-', '+', '='].includes(key) ? 'bg-orange-500' : 'bg-zinc-800'}
                    ${key === '0' ? 'col-span-2' : ''}
                  `}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        );
      case AppType.BROWSER:
        return (
          <div className="flex flex-col h-full bg-white">
            <div className="px-4 py-2 bg-gray-100 border-b flex items-center gap-4">
              <RotateCcw className="w-4 h-4 text-gray-500" />
              <div className="flex-1 bg-white px-4 py-1.5 rounded-full border flex items-center gap-2 text-sm text-gray-600">
                <Search className="w-3 h-3" />
                https://developer.samsung.com/galaxy-tab
              </div>
            </div>
            <iframe 
              src="https://www.wikipedia.org" 
              className="flex-1 w-full border-none" 
              title="Browser"
            />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-400">
            App placeholder for {type}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* App Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center">
             <div className="w-4 h-4 bg-blue-600 rounded-sm" />
          </div>
          <span className="text-sm font-bold text-gray-700 uppercase tracking-tight">{type}</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <button className="hover:text-blue-600"><Minimize2 className="w-4 h-4" /></button>
          <button className="hover:text-blue-600"><Maximize2 className="w-4 h-4" /></button>
          <button onClick={onClose} className="hover:text-red-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* AI Smart Sidebar (Pop-up) */}
      <div className="absolute bottom-4 right-4 z-20 group">
        <div className="flex flex-col items-end gap-3">
          {aiResponse && (
            <div className="max-w-[300px] bg-white rounded-2xl shadow-2xl p-4 border border-blue-100 text-sm animate-fade-in relative">
              <button onClick={() => setAiResponse(null)} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:text-red-500">
                <X className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
                <Sparkles className="w-3 h-3" /> Assistant
              </div>
              <p className="text-gray-700">{aiResponse}</p>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <input 
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
              placeholder="Ask Galaxy AI..."
              className="w-0 group-hover:w-48 focus:w-48 bg-white shadow-xl rounded-full px-4 py-2 border border-blue-200 transition-all duration-300 outline-none text-sm placeholder:text-gray-400"
            />
            <button 
              onClick={handleAskAi}
              disabled={isAsking}
              className={`p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center ${isAsking ? 'animate-pulse' : ''}`}
            >
              {isAsking ? <Sparkles className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
