import React, { useState, useEffect } from 'react';
import { 
  Brain, LayoutDashboard, FileText, Settings, 
  LogOut, Menu, X, Bell, UploadCloud 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UploadResume from './UploadResume';
import AnalysisResult from './AnalysisResult';
import ResumeHistory from './ResumeHistory';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // 🚀 LIVE METRICS STATE CONTAINERS
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("Guest User");

  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Analyze Resume', icon: <UploadCloud className="w-5 h-5" /> },
    { name: 'My Resumes', icon: <FileText className="w-5 h-5" /> },
    { name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  // Fetch metrics data from database
  const fetchDashboardData = () => {
    axios.get("http://localhost:8080/api/resumes/history")
      .then(response => {
        setHistory(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching dashboard counters:", err);
        setLoading(false);
      });
  };

  // Run fetch whenever the active tab updates to keep counters crisp
  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAuthenticated");
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate('/login'); 
  };

  // 📊 CALCULATE LIVE AGGREGATED METRICS
  const totalAudits = history.length;

  const averageAtsScore = totalAudits > 0
    ? Math.round(history.reduce((sum, record) => sum + record.matchScore, 0) / totalAudits)
    : 0;

  const totalMissingKeywords = history.reduce((sum, record) => {
    if (!record.missingSkills) return sum;
    const skillsArray = record.missingSkills.split(', ').filter(Boolean);
    return sum + skillsArray.length;
  }, 0);

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
                onClick={() => { 
                  setActiveTab(item.name); 
                  setIsSidebarOpen(false); 
                  if (item.name === 'Analyze Resume') setAnalysisResult(null);
                }}
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
            <h1 className="text-lg font-bold text-slate-800 hidden sm:block">
              {activeTab === 'Analyze Resume' && analysisResult ? 'Analysis Report' : activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
            </button>
            
            <div className="h-8 w-px bg-slate-200" />

            <div className="flex items-center gap-2.5 pl-1">
              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-slate-800 leading-none">{username}</p>
              </div>
            </div>
          </div>
        </header>

        {/* 📊 MAIN CONTENT DISPLAY AREA */}
        <main className="p-6 lg:p-8 flex-1 w-full box-border space-y-6">
          {activeTab === 'Dashboard' && (
            <DashboardHome 
              viewSetter={setActiveTab} 
              audits={totalAudits}
              avgScore={averageAtsScore}
              missingCount={totalMissingKeywords}
            />
          )}
          
          {activeTab === 'Analyze Resume' && (
            !analysisResult ? (
              <UploadResume onAnalysisComplete={setAnalysisResult} />
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={() => setAnalysisResult(null)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                >
                  ← Upload Another Resume
                </button>
                <AnalysisResult result={analysisResult} />
              </div>
            )
          )}

          {activeTab === 'My Resumes' && (
            <ResumeHistory 
              initialHistory={history} 
              onRefresh={fetchDashboardData} 
            />
          )}

          {activeTab === 'Settings' && (
            <div className="w-full p-6 bg-white border border-slate-200 rounded-2xl text-slate-500 shadow-xs">
              Account settings config panel placeholder view.
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

//RECEIVES DYNAMIC VALUE PROPERTIES FROM THE PARENT CONTAINER AGGREGATORS
function DashboardHome({ viewSetter, audits, avgScore, missingCount }) {
  return (
    <div className="space-y-6 w-full">
      <div className="w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Welcome to HireLens AI Workspace!</h2>
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
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs w-full">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Audits</p>
          <p className="text-3xl font-black text-indigo-600 mt-2">{audits}</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs w-full">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average ATS Score</p>
          <p className="text-3xl font-black text-emerald-600 mt-2">{avgScore}%</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs w-full">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Missing Technical Keywords</p>
          <p className="text-3xl font-black text-amber-500 mt-2">{missingCount}</p>
        </div>
      </div>
    </div>
  );
}