
import React, { useState, useEffect } from 'react';
import { 
    Smartphone, Bell, Share2, Settings, Wifi, Battery, Maximize2, 
    X, MessageSquare, Phone, Calendar, FileText, Calculator, 
    Image, Globe, Search, MoreHorizontal, LayoutGrid, 
    GripVertical, Layers, Grid, Menu, Sparkles, Send, RotateCcw,
    SmartphoneNfc, AppWindow
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Constants ---
const AppType = {
    LAUNCHER: 'LAUNCHER',
    NOTES: 'NOTES',
    CALENDAR: 'CALENDAR',
    CALCULATOR: 'CALCULATOR',
    BROWSER: 'BROWSER'
};

const MOCK_NOTIFICATIONS = [
    { id: '1', app: 'Messages', title: '김철수', content: '오늘 회의 시간 확인 부탁드려요.', time: '2분 전' },
    { id: '2', app: 'Instagram', title: '새로운 좋아요', content: 'minji_park님이 회원님의 스토리를 좋아합니다.', time: '15분 전' },
    { id: '3', app: 'Slack', title: '프로젝트 알파', content: '새로운 디자인 피드백이 도착했습니다.', time: '1시간 전' },
];

// --- AI Service ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const getSmartAssistantResponse = async (prompt: string) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                systemInstruction: "당신은 갤럭시 탭의 스마트 어시스턴트입니다. 사용자의 워크플로우를 돕고, 알림을 요약하며, 생산성 팁을 제공합니다. 답변은 간결하고 친절하게 한국어로 작성하세요.",
            },
        });
        return response.text;
    } catch (error) {
        return "AI 연결에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.";
    }
};

// --- Sub-Components ---

const SamsungFlowView = () => (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-100">
                    <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-gray-800">Samsung Flow</h2>
                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Connected</p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
                <Share2 className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
                <Settings className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
            </div>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar p-6 flex flex-col gap-6">
            {/* Phone Screen Mockup */}
            <div className="relative aspect-[9/19] max-w-[240px] mx-auto bg-black rounded-[2.5rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-b-2xl z-20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-700 rounded-full" />
                </div>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600)' }}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute top-14 left-4 right-4 grid grid-cols-4 gap-3">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl border border-white/10" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Phone Notifications</h3>
                </div>
                {MOCK_NOTIFICATIONS.map((notif) => (
                    <div key={notif.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start justify-between group animate-slide-up">
                        <div className="flex gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xs font-bold text-blue-600">{notif.app[0]}</div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-800">{notif.title}</span>
                                    <span className="text-[10px] text-gray-400 font-medium">{notif.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{notif.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const AppFrame = ({ type, onClose }: { type: string, onClose: () => void }) => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        const res = await getSmartAssistantResponse(prompt);
        setResponse(res);
        setLoading(false);
        setPrompt('');
    };

    return (
        <div className="flex flex-col h-full bg-white relative animate-slide-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-white">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100">
                        <div className="w-3 h-3 bg-white/50 rounded-sm" />
                    </div>
                    <span className="text-sm font-bold text-gray-800">{type}</span>
                </div>
                <X className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" onClick={onClose} />
            </div>

            <div className="flex-1 overflow-auto p-6">
                {type === AppType.NOTES ? (
                    <div className="flex flex-col gap-4">
                        <input className="text-3xl font-black bg-transparent border-none outline-none text-gray-900" placeholder="제목 없음" defaultValue="아이디어 노트" />
                        <textarea className="w-full h-96 text-lg leading-relaxed bg-transparent border-none outline-none resize-none text-gray-600" defaultValue="오늘 할 일:\n- 갤럭시 탭 인터페이스 최적화\n- 분할 창 애니메이션 개선\n- Gemini AI 연동 테스트..." />
                    </div>
                ) : type === AppType.CALCULATOR ? (
                    <div className="max-w-md mx-auto h-full flex flex-col justify-end bg-black rounded-3xl p-6 text-white shadow-2xl">
                         <div className="text-right text-gray-500 text-2xl mb-2">2,500 * 12</div>
                         <div className="text-right text-6xl font-light mb-8">30,000</div>
                         <div className="grid grid-cols-4 gap-3">
                            {['C','÷','×','-','7','8','9','+','4','5','6','=','1','2','3','0'].map(k => (
                                <button key={k} className={`h-16 rounded-full text-xl font-medium ${k === '=' ? 'bg-orange-500' : 'bg-zinc-800'} active:scale-90 transition-transform`}>{k}</button>
                            ))}
                         </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                        <AppWindow className="w-16 h-16 opacity-20" />
                        <p className="font-medium">{type} 서비스 준비 중</p>
                    </div>
                )}
            </div>

            {/* AI Assistant Button */}
            <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3 z-30">
                {response && (
                    <div className="max-w-[280px] bg-white rounded-2xl shadow-2xl p-4 border border-blue-50 text-sm animate-slide-up">
                        <div className="flex items-center gap-2 text-blue-600 font-bold mb-1"><Sparkles className="w-4 h-4" /> Galaxy AI</div>
                        <p className="text-gray-700 leading-relaxed">{response}</p>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <input 
                        className="w-0 focus:w-48 bg-white shadow-xl rounded-full px-4 py-2 text-sm border-none transition-all outline-none" 
                        placeholder="AI에게 질문..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                    />
                    <button onClick={handleAsk} className={`p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all ${loading ? 'animate-pulse' : ''}`}>
                        <Sparkles className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main App ---

export default function App() {
    const [activeApp, setActiveApp] = useState(AppType.LAUNCHER);
    const [splitRatio, setSplitRatio] = useState(40);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileTab, setMobileTab] = useState('flow'); // 'flow' or 'app'

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="flex flex-col h-[100dvh] w-full bg-white overflow-hidden select-none">
            {/* Tablet Status Bar */}
            <div className="h-8 w-full flex items-center justify-between px-6 bg-white border-b border-gray-50 z-50">
                <div className="text-[11px] font-bold text-gray-500">12:45</div>
                <div className="flex items-center gap-3 text-gray-300">
                    <Wifi className="w-3.5 h-3.5" />
                    <Battery className="w-3.5 h-3.5" />
                    <div className="w-10 h-3.5 bg-gray-100 rounded-full border border-gray-200" />
                </div>
            </div>

            <main className="flex-1 flex relative overflow-hidden bg-gray-50">
                {isMobile ? (
                    // Mobile View: Single Panel with Tab Control
                    <div className="flex-1 h-full">
                        {mobileTab === 'flow' ? (
                            <SamsungFlowView />
                        ) : (
                            <div className="h-full bg-white">
                                {activeApp === AppType.LAUNCHER ? (
                                    <div className="p-8 grid grid-cols-2 gap-4">
                                        {[
                                            { id: AppType.NOTES, name: 'Notes', icon: FileText, color: 'bg-orange-500' },
                                            { id: AppType.CALCULATOR, name: 'Calculator', icon: Calculator, color: 'bg-blue-500' },
                                            { id: AppType.BROWSER, name: 'Internet', icon: Globe, color: 'bg-indigo-500' }
                                        ].map(app => (
                                            <button key={app.id} onClick={() => setActiveApp(app.id)} className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-3xl transition-all active:scale-95">
                                                <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                                    <app.icon className="w-7 h-7" />
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">{app.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <AppFrame type={activeApp} onClose={() => setActiveApp(AppType.LAUNCHER)} />
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    // Tablet View: Split Screen
                    <>
                        <div style={{ width: `${splitRatio}%` }} className="h-full border-r border-gray-200 transition-all duration-300">
                            <SamsungFlowView />
                        </div>
                        <div className="flex-1 h-full bg-white relative shadow-[-10px_0_30px_rgba(0,0,0,0.03)]">
                            {activeApp === AppType.LAUNCHER ? (
                                <div className="p-12 h-full flex flex-col gap-8 max-w-3xl mx-auto">
                                    <h2 className="text-2xl font-black text-gray-800">앱 선택</h2>
                                    <div className="grid grid-cols-3 gap-6">
                                        {[
                                            { id: AppType.NOTES, name: 'Samsung Notes', icon: FileText, color: 'bg-orange-500' },
                                            { id: AppType.CALCULATOR, name: 'Calculator', icon: Calculator, color: 'bg-blue-500' },
                                            { id: AppType.BROWSER, name: 'Internet', icon: Globe, color: 'bg-indigo-500' }
                                        ].map(app => (
                                            <button key={app.id} onClick={() => setActiveApp(app.id)} className="flex flex-col items-center gap-4 p-8 bg-gray-50 rounded-[2.5rem] hover:bg-white hover:shadow-xl hover:scale-105 transition-all group">
                                                <div className={`w-16 h-16 ${app.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform`}>
                                                    <app.icon className="w-8 h-8" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-600">{app.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <AppFrame type={activeApp} onClose={() => setActiveApp(AppType.LAUNCHER)} />
                            )}
                        </div>
                        {/* Drag Handle */}
                        <div 
                            className="absolute top-1/2 left-0 z-40 -translate-y-1/2 cursor-col-resize group"
                            style={{ left: `${splitRatio}%` }}
                            onClick={() => setSplitRatio(splitRatio === 40 ? 30 : 40)}
                        >
                            <div className="h-20 w-1.5 bg-gray-200 rounded-full group-hover:bg-blue-400 transition-colors flex items-center justify-center">
                                <GripVertical className="w-4 h-4 text-white opacity-0 group-hover:opacity-100" />
                            </div>
                        </div>
                    </>
                )}
            </main>

            {/* Bottom Taskbar */}
            <div className="h-16 w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 flex items-center justify-between px-8 z-50">
                <div className="flex items-center gap-6">
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <Menu className="w-6 h-6 text-gray-400" />
                    </button>
                    {isMobile && (
                        <div className="flex bg-gray-100 p-1 rounded-2xl gap-1">
                            <button 
                                onClick={() => setMobileTab('flow')}
                                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${mobileTab === 'flow' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
                            >
                                <SmartphoneNfc className="w-3.5 h-3.5" /> Phone
                            </button>
                            <button 
                                onClick={() => setMobileTab('app')}
                                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${mobileTab === 'app' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
                            >
                                <AppWindow className="w-3.5 h-3.5" /> App
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-12">
                    <div className="w-4 h-4 border-2 border-gray-200 rounded-sm hover:border-blue-500 cursor-pointer" />
                    <div className="w-5 h-5 border-2 border-gray-200 rounded-full hover:border-blue-500 cursor-pointer shadow-inner" />
                    <div className="w-4 h-4 border-2 border-gray-200 rotate-45 hover:border-blue-500 cursor-pointer" />
                </div>

                <div className="w-12 hidden md:block"></div>
            </div>
        </div>
    );
}
