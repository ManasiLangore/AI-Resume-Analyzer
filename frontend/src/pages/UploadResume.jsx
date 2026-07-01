import React, { useState } from 'react';

import axios from 'axios';
import { UploadCloud, CheckCircle, AlertTriangle, BarChart3 } from 'lucide-react';

export default function UploadResume() {

    const[file, setFile] = useState(null);
    const[uploading, setUploading] = useState(false);
    const [jobDescription, setJobDescription] = useState("");
    const [message, setMessage] = useState("");

    const [analysisResult, setAnalysisResult] = useState(null);

    const handleFileChange = (e) =>{
        const selectedFile = e.target.files[0];

        if(selectedFile){
            setFile(selectedFile);
            setMessage("");
        }
    }

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
        alert("Please choose a file first!");
        return;
        }

        setUploading(true);
        setMessage("");
        setAnalysisResult(null);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("jobDescription", jobDescription);

        try {
            const response = await axios.post("http://localhost:8080/api/resumes/upload", formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });

            setAnalysisResult(response.data);
            setFile(null); 
            setJobDescription("");
        } 
        catch (error) {
            console.error("Upload Failure details:", error);
            if (error.response && error.response.data) {
                setMessage(`❌ ${error.response.data}`);
            } 
            else {
            setMessage("❌ Network interface disconnect. Is your backend application live?");
            }
        } 
        finally {
            setUploading(false);
        }
    };
    return (
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 flex flex-col items-stretch">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Analyze Resume Match</h3>
        <p className="text-sm text-slate-500">Provide your resume and target job profile requirements below.</p>
      </div>

      <form onSubmit={handleUploadSubmit} className="space-y-5 w-full">
        
        {/* Dropzone field */}
        <label className="w-full border-2 border-dashed border-slate-200 hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/20 rounded-2xl p-12 flex flex-col items-center text-center gap-4 transition-colors cursor-pointer group block relative">
          <input 
            type="file" 
            accept=".pdf,.docx" 
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
          />
          <div className="bg-white p-3 rounded-xl border border-slate-100 text-slate-400 group-hover:text-indigo-600 group-hover:scale-105 transition-all shadow-xs">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-700">
              {file ? `Selected: ${file.name}` : "Click to select file or drag it here"}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "PDF, DOCX formats up to 5MB"}
            </p>
          </div>
        </label>

        {/* 3️⃣ New Field: Target Job Description Text Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Target Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description or core skills listed on the hiring page here (e.g., Requires Java, Spring Boot, React...)"
            rows={5}
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 rounded-xl p-4 text-sm outline-none transition-all resize-none font-sans leading-relaxed text-slate-700"
          />
        </div>

        {message && (
          <div className="p-4 rounded-xl text-sm font-semibold border bg-rose-50 border-rose-200 text-rose-800">
            ❌ {message}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || !file || !jobDescription.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          {uploading ? "Analyzing Profile Match..." : "Upload & Analyze Match"}
        </button>
      </form>

      {/* 📊 SECTION B: VISUAL RESULTS CARD DISPLAY PANEL */}
      {/* This section mounts dynamically only when an analysisResult is present */}
      {analysisResult && (
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h4 className="text-base font-bold text-slate-900">ATS Match Analysis Results</h4>
          </div>

          {/* Score Circle Panel Layout */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white border-4 border-indigo-600 shadow-xs shrink-0">
              <span className="text-2xl font-black text-slate-800">{analysisResult.matchPercentage}%</span>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <p className="text-base font-bold text-slate-800">Calculated Profile Score</p>
              <p className="text-xs font-medium text-slate-500 leading-relaxed">
                {analysisResult.matchPercentage >= 70 
                  ? "Excellent keyword alignment! Your profile matches standard automated screening criteria for this role."
                  : "Consider optimizing your baseline experience summaries to include more missing technical terms to pass automated filters."}
              </p>
            </div>
          </div>

          {/* Keywords Columns Breakout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Matched Skills Column */}
            <div className="border border-slate-200/80 rounded-2xl p-5 space-y-3 bg-white">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm uppercase tracking-wider">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Matched Technical Keywords ({analysisResult.matchedKeywords.length})
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {analysisResult.matchedKeywords.length > 0 ? (
                  analysisResult.matchedKeywords.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-lg uppercase">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No exact technical matches identified.</span>
                )}
              </div>
            </div>

            {/* Missing Skills Column */}
            <div className="border border-slate-200/80 rounded-2xl p-5 space-y-3 bg-white">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Missing Required Keywords ({analysisResult.missingKeywords.length})
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {analysisResult.missingKeywords.length > 0 ? (
                  analysisResult.missingKeywords.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded-lg uppercase">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-600 italic font-medium">Perfect skill matrix alignment! No key terms missing.</span>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
