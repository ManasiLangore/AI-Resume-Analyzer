import React, { useState } from 'react';
import { 
  FileText, Cpu, Lightbulb, Target, CheckCircle, Shield, 
  ArrowRight, UploadCloud, Users, Sparkles, Brain, Star, 
  Mail, Menu, X 
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated] = useState(false);

  const handleCTAClick = () => {
    if (isAuthenticated) {
      alert("Redirecting to your Dashboard!");
    } else {
      alert("Redirecting to Login/Signup page!");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 scroll-smooth">
      
      {/* 🧭 NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2 rounded-xl text-white shadow-xs">
                <Brain className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">
                HireLens <span className="text-indigo-600">AI</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Home</a>
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
              <button onClick={handleCTAClick} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Login</button>
              <button onClick={handleCTAClick} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer">
                Sign Up
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 p-2">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-4 space-y-3 shadow-lg">
            <a href="#" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 rounded-lg hover:bg-slate-50">Home</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 rounded-lg hover:bg-slate-50">Features</a>
            <button onClick={() => { setIsMenuOpen(false); handleCTAClick(); }} className="w-full text-left block px-3 py-2 text-base font-medium text-slate-600 rounded-lg hover:bg-slate-50">Login</button>
            <button onClick={() => { setIsMenuOpen(false); handleCTAClick(); }} className="w-full text-center bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-base font-semibold shadow-xs">
              Sign Up
            </button>
          </div>
        )}
      </nav>

      {/* 🚀 HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-indigo-50/40 via-transparent to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-100/30 via-transparent to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Grid */}
          <div className="space-y-6 transition-all duration-500 transform translate-y-0 opacity-100">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5" /> AI-Powered Resume Analysis
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
              Analyze Your Resume Smarter with <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">HireLens AI</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Get ATS scores, identify missing skills, receive AI-driven recommendations, and improve your chances of landing interviews.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={handleCTAClick} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer">
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#upload" className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-6 py-3.5 rounded-xl font-bold transition-all shadow-xs flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-slate-500" /> Upload Resume
              </a>
            </div>
          </div>

          {/* Right Dashboard Mockup */}
          <div className="relative transition-all duration-700 ease-out">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl opacity-10 blur-xl -z-10" />
            <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-xl space-y-6 max-w-lg mx-auto">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-lg">Analysis Dashboard</h3>
                  <p className="text-xs text-slate-400">Sample_Resume_Senior_Dev.pdf</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">Strength: Excellent</span>
              </div>

              {/* Score Circular Metrics Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50/60 border border-slate-100 p-4 rounded-2xl text-center">
                  <div className="text-3xl font-black text-indigo-600">89%</div>
                  <div className="text-xs font-medium text-slate-500 mt-1">ATS Match Score</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '89%' }} />
                  </div>
                </div>
                <div className="bg-slate-50/60 border border-slate-100 p-4 rounded-2xl text-center">
                  <div className="text-3xl font-black text-violet-600">92%</div>
                  <div className="text-xs font-medium text-slate-500 mt-1">Skills Match</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-violet-600 h-1.5 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>

              {/* Alert Metrics Block */}
              <div className="bg-amber-50/60 border border-amber-100/80 p-4 rounded-2xl flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 text-amber-800 p-2 rounded-xl"><Target className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Missing Core Keywords</h4>
                    <p className="text-xs text-amber-800/80">Missing: Docker, Kubernetes, CI/CD</p>
                  </div>
                </div>
                <div className="text-xl font-black text-amber-700 px-3">3</div>
              </div>

              {/* Suggestions Mini Block */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">AI Tailoring Suggestions</h4>
                <div className="flex gap-2.5 items-start text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>Quantify achievements in your Experience section (e.g., "Increased performance by 25%").</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 WHY CHOOSE HIRE LENS */}
      <section className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Why Choose HireLens AI?</h2>
            <p className="text-slate-500">We leverage highly contextual, industry-grade AI modeling layers to evaluate profiles through actual recruiter mindsets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FileText className="w-6 h-6 text-indigo-600" />, title: "Resume Parsing", desc: "Ultra-fast contextual extraction pipelines reading deep semantic blocks seamlessly." },
              { icon: <Target className="w-6 h-6 text-emerald-600" />, title: "ATS Score Analysis", desc: "Instantly cross-match resumes against standard recruitment algorithms." },
              { icon: <Lightbulb className="w-6 h-6 text-amber-600" />, title: "AI Resume Suggestions", desc: "Get structural refinement tips to elevate the overall impact of your copy." },
              { icon: <Cpu className="w-6 h-6 text-violet-600" />, title: "Skill Gap Detection", desc: "Pinpoint core keywords and toolstacks missing from your application." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white border border-slate-200/70 p-6 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="bg-slate-50 w-12 h-12 flex items-center justify-center rounded-xl mb-4 border border-slate-100">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔮 CORE FEATURES GRID */}
      <section id="features" className="py-20 bg-slate-50/50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Powerful Features</h2>
            <p className="text-slate-500">Everything you need to successfully navigate and optimize your application flow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="w-5 h-5 text-indigo-600" />, title: "ATS Compatibility Check", desc: "Scans file parsing attributes to ensure compatibility with major HR systems." },
              { icon: <FileText className="w-5 h-5 text-sky-600" />, title: "Resume Parsing", desc: "Automatically groups formatting layers, projects, and roles logically." },
              { icon: <Cpu className="w-5 h-5 text-purple-600" />, title: "AI Recommendations", desc: "Generates custom action-verbs and industry phrasing fixes dynamically." },
              { icon: <Target className="w-5 h-5 text-rose-600" />, title: "Skill Matching", desc: "Compares your actual expertise with modern job description variables." },
              { icon: <UploadCloud className="w-5 h-5 text-amber-600" />, title: "PDF Resume Upload", desc: "Secure multi-format dropzone parsing text configurations directly." },
              { icon: <CheckCircle className="w-5 h-5 text-emerald-600" />, title: "Instant Analysis Report", desc: "Delivers comprehensive structural analysis parameters in seconds." }
            ].map((core, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs hover:shadow-sm hover:border-slate-300 transition-all group">
                <div className="bg-slate-50 w-10 h-10 flex items-center justify-center rounded-xl mb-4 group-hover:scale-105 transition-transform">{core.icon}</div>
                <h3 className="font-bold text-base text-slate-900 mb-1.5">{core.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{core.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🗺️ HOW IT WORKS SECTION */}
      <section  className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">How It Works</h2>
            <p className="text-slate-500">Transform your resume layout in four straightforward steps.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/4 left-32 right-32 h-0.5 bg-gradient-to-r from-indigo-100 via-purple-100 to-emerald-100 -z-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { step: "01", title: "Upload Resume", desc: "Drop your file format (PDF or Word DOCX) into our parser window." },
                { step: "02", title: "AI Processing", desc: "Our localized LLM evaluation layer audits context, structural layout, and impact text." },
                { step: "03", title: "Generate Insights", desc: "View missing technical modules, key parameters, and score breakdowns." },
                { step: "04", title: "Improve & Apply", desc: "Refine your resume using our templates and submit your optimized app." }
              ].map((item, idx) => (
                <div key={idx} className="text-center flex flex-col items-center group">
                  <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 flex items-center justify-center rounded-2xl font-black text-indigo-600 text-lg shadow-xs group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500 max-w-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 CALL TO ACTION (CTA) SECTION */}
      <section id="upload" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-20">
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-400/20 via-transparent to-transparent" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">Ready to Transform Your Resume?</h2>
            <p className="text-indigo-100/90 text-base sm:text-lg leading-relaxed">
              Join thousands of job seekers using AI to optimize their resumes and increase interview opportunities.
            </p>
            <div className="pt-4">
              <button onClick={handleCTAClick} className="bg-white hover:bg-slate-50 text-indigo-700 font-extrabold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 group text-base cursor-pointer">
                Get Started Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 👤 FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Brain className="w-6 h-6 text-indigo-400" />
              <span className="font-extrabold text-lg tracking-tight">HireLens AI</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400/80">
              Advanced, recruitment-optimized structural parsing architectures delivering enterprise analysis values.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
              <li><button onClick={handleCTAClick} className="hover:text-indigo-400 transition-colors cursor-pointer">Login</button></li>
              <li><button onClick={handleCTAClick} className="hover:text-indigo-400 transition-colors cursor-pointer">Sign Up</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Contact</h4>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>support@hirelens.ai</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-3 text-xs font-medium">
              <a href="#" className="bg-slate-800 px-3 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">Twitter</a>
              <a href="#" className="bg-slate-800 px-3 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">LinkedIn</a>
              <a href="#" className="bg-slate-800 px-3 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">GitHub</a>
            </div>
          </div>
        </div>

        {/* Legal Copyright banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} HireLens AI. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}