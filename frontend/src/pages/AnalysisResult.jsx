import React from 'react';
import { BarChart3, HelpCircle, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';

export default function AnalysisResult({ result }) {
  if (!result) return null;

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      
      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
        <BarChart3 className="w-5 h-5 text-indigo-600" />
        <h4 className="text-base font-bold text-slate-900">Gemini AI Deep Analysis Report</h4>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white border-4 border-indigo-600 shadow-xs shrink-0">
          <span className="text-2xl font-black text-slate-800">{result.atsScore}%</span>
        </div>
        <div className="text-center sm:text-left space-y-1">
          <p className="text-base font-bold text-slate-800">AI Match Score</p>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {result.atsScore >= 75 ? "Strong match profile!" : "Target optimization recommended to pass screening rules."}
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-2xl p-5 space-y-2 bg-slate-50/40">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm tracking-wide">
          <HelpCircle className="w-4 h-4 text-slate-500" />
          STRUCTURAL CRITIQUE
        </div>
        <p className="text-sm text-slate-600 leading-relaxed font-normal">
          {result.structuralCritique || "No structural feedback returned."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-white">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm uppercase tracking-wider">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Matched Skills ({result.matchedSkills ? result.matchedSkills.length : 0})
          </div>
          <div className="flex flex-wrap gap-2">
            {result.matchedSkills && result.matchedSkills.length > 0 ? (
              result.matchedSkills.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-bold rounded-lg uppercase">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">No direct matches.</span>
            )}
          </div>
        </div>

        <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-white">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Missing Skills ({result.missingSkills ? result.missingSkills.length : 0})
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missingSkills && result.missingSkills.length > 0 ? (
              result.missingSkills.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-100 text-xs font-bold rounded-lg uppercase">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-emerald-600 italic font-medium">Perfect layout matrix!</span>
            )}
          </div>
        </div>
      </div>

      <div className="border border-indigo-100 rounded-2xl p-5 space-y-3 bg-indigo-50/20">
        <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm tracking-wide">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          AI OPTIMIZATION STRATEGIES
        </div>
        <ul className="space-y-2.5 pl-1">
          {result.optimizationSuggestions && result.optimizationSuggestions.length > 0 ? (
            result.optimizationSuggestions.map((tip, index) => (
              <li key={index} className="text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed">
                <span className="text-indigo-600 text-xs mt-1">✦</span>
                <span>{tip}</span>
              </li>
            ))
          ) : (
            <li className="text-xs text-slate-400 italic">No recommendations required.</li>
          )}
        </ul>
      </div>

    </div>
  );
}