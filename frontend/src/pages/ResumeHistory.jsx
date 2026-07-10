import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnalysisResult from './AnalysisResult';

export default function ResumeHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  const userId = localStorage.getItem("userId");

  const fetchHistory = () => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/resumes/history?userId=${userId}`)
      .then(response => {
        setHistory(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching rows:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // 🚀 DELETE SPECIFIC ITEM FUNCTION
  const handleDeleteRow = (id, fileName) => {
    // Show clean display name in the confirmation alert
    const displayName = fileName.substring(fileName.indexOf('_') + 1);
    const confirmDelete = window.confirm(`Are you sure you want to delete the analysis record for "${displayName}"?`);
    
    if (confirmDelete) {
      axios.delete(`http://localhost:8080/api/resumes/${id}`)
        .then(() => {
          // Instantly filter out the deleted item from the UI state list
          setHistory(prevHistory => prevHistory.filter(record => record.id !== id));
        })
        .catch(err => {
          console.error("Error deleting record:", err);
          alert("Failed to delete the record. Please try again.");
        });
    }
  };

  if (loading) {
    return <div className="text-sm font-semibold text-slate-500">Loading audit history logs...</div>;
  }

  if (selectedReport) {
    // Reconstruct the response object format expected by your AnalysisResult UI component
    const formattedResult = {
      atsScore: selectedReport.matchScore,
      structuralCritique: selectedReport.structuralCritique || "No structural feedback returned.",
      matchedSkills: selectedReport.matchedSkills ? selectedReport.matchedSkills.split(', ') : [],
      missingSkills: selectedReport.missingSkills ? selectedReport.missingSkills.split(', ') : [],
      optimizationSuggestions: selectedReport.optimizationSuggestions ? selectedReport.optimizationSuggestions.split(', ') : []
    };
    
    const originalFileName = selectedReport.fileName.substring(selectedReport.fileName.indexOf('_') + 1);

    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <button 
            onClick={() => setSelectedReport(null)}
            className="text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-xs self-start"
          >
            ← Back to History List
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium truncate max-w-xs">
              File: <strong className="text-slate-700">{originalFileName}</strong>
            </span>
            
            <a 
              href={`http://localhost:8080/api/resumes/${selectedReport.id}/file`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-lg transition-all shadow-xs inline-block text-center whitespace-nowrap"
            >
              View Original Document ↗
            </a>
          </div>
        </div>
        
        <AnalysisResult result={formattedResult} />
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden w-full">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">Your Saved Audit Records</h3>
        <p className="text-sm text-slate-500">Review historical match performance ratings extracted over time.</p>
      </div>

      {history.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-sm">
          No historical analyses found in database.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="p-4">File Name</th>
                <th className="p-4">Date Processed</th>
                <th className="p-4">Match Score</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {history.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-800 max-w-xs truncate">
                    {record.fileName.substring(record.fileName.indexOf('_') + 1)}
                  </td>
                  <td className="p-4 text-slate-400">
                    {new Date(record.uploadTime).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'
                    })}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                      record.matchScore >= 70 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {record.matchScore}%
                    </span>
                  </td>
                  {/* ACTIONS COLUMN WITH TWO DISTINCT OPTIONS */}
                  <td className="p-4 text-right space-x-4">
                    <button 
                      onClick={() => setSelectedReport(record)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                    >
                      View Report
                    </button>
                    <button 
                      onClick={() => handleDeleteRow(record.id, record.fileName)}
                      className="text-xs font-bold text-rose-500 hover:text-rose-700 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}