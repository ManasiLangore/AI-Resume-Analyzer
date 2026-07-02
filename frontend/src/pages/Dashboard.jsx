import React, { useState, useEffect } from 'react';
import { 
  Brain, LayoutDashboard, FileText, Settings, 
  LogOut, Menu, X, Bell, UploadCloud 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UploadResume from './UploadResume';
import AnalysisResult from './AnalysisResult';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [analysisResult, setAnalysisResult] = useState(null);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Analyze Resume', icon: <UploadCloud className="w-5 h-5" /> },
    { name: 'My Resumes', icon: <FileText className="w-5 h-5" /> },
    { name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAuthenticated");
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate('/login'); 
  };

  console.log("Current Parent Analysis Result State:", analysisResult);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex w-full">
      
      {/* 🧭 LEFT SIDEBAR NAVBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 p-5 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen shrink-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="bg-indigo-600 p-2 rounded-xl text-white">
                <Brain className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">HireLens AI</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => { setActiveTab(item.name); setIsSidebarOpen(false); }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer
                  ${activeTab === item.name 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                    : 'hover:bg-slate-800/60 hover:text-white'}
                `}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </aside>

      {/* 🖥_ RIGHT CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* 🔝 TOP NAVIGATION BAR */}
        <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between sticky top-0 z-40 shrink-0 w-full">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-slate-800 hidden sm:block">{activeTab}</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
            </button>
            
            <div className="h-8 w-px bg-slate-200" />

            <div className="flex items-center gap-2.5 pl-1">
              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
                M
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-slate-800 leading-none">Manasi</p>
                <p className="text-xs font-medium text-slate-400 mt-0.5">Premium Plan</p>
              </div>
            </div>
          </div>
        </header>

        {/* 📊 MAIN CONTENT DISPLAY AREA */}
        <main className="p-6 lg:p-8 flex-1 w-full box-border space-y-6">
          {activeTab === 'Dashboard' && <DashboardHome viewSetter={setActiveTab} />}
          
          {activeTab === 'Analyze Resume' && (
            <UploadResume onAnalysisComplete={setAnalysisResult} />
          )}

          {/* Fixed data state evaluation logic */}
          {activeTab === 'Analyze Resume' && analysisResult && (
            <AnalysisResult result={analysisResult} />
          )}

          {activeTab === 'My Resumes' && <div className="w-full p-6 bg-white border border-slate-200 rounded-2xl text-slate-500 shadow-xs">List of uploaded files placeholder view.</div>}
          {activeTab === 'Settings' && <div className="w-full p-6 bg-white border border-slate-200 rounded-2xl text-slate-500 shadow-xs">Account settings config panel placeholder view.</div>}
        </main>

      </div>
    </div>
  );
}

// Sub-Component embedded directly below dashboard main interface frame shell
function DashboardHome({ viewSetter }) {
  return (
    <div className="space-y-6 w-full">
      <div className="w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Welcome to HireLens AI Workspace!</h2>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            Upload your professional background profile copy, check layout optimization variables, and discover target tracking matching scores instantly.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => viewSetter('Analyze Resume')}
              className="bg-white text-indigo-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-md cursor-pointer"
            >
              Analyze New Resume
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        {[
          { title: "Total Audits", value: "0", color: "text-indigo-600" },
          { title: "Average ATS Score", value: "0%", color: "text-emerald-600" },
          { title: "Missing Technical Keywords", value: "0", color: "text-amber-500" }
        ].map((card, index) => (
          <div key={index} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs w-full">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.title}</p>
            <p className={`text-3xl font-black ${card.color} mt-2`}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}