import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import axios from 'axios';

export default function UploadResume() {

    const[file, setFile] = useState(null);
    const[uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

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

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8080/api/resumes/upload", formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });

            setMessage(`✅ ${response.data}`);
            setFile(null); 
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
        <div className='w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 flex dlex-col items-stretch'>
            
            <div>
                <h3 className='text-lg font-bold text-slate-900'>Upload Your Resume</h3>
                <p className='text-sm text-slate-500'>Supproted Formats: PDF, DOCX (Max 5MB)</p>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 w-full">
                <label className='w-full border-2 border-dashed border-slate-200 hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/20 rounded-2xl p-16 flex flex-col items-center text-center gap-4 transition-colors cursor-pointer group block relative'>
                    <input
                        type='file'
                        accept='.pdf,.docx'
                        onChange={handleFileChange}
                        className='absolute inset-0 opacity-0 cursor-pointer w-full h-full'
                    >
                    </input>

                    <div className='bg-white p-4 rounded-xl border border-slate-100 text-slate-400 group-hover:text-indigo-600 group-hover:scale-105 transition-all shadow-xs'>
                        <UploadCloud className='w-10 h-10'></UploadCloud>
                    </div>

                    <div>
                        <p className='text-base font-bold text-slate-700'>
                            {file ? `Selected : ${file.name}`: "Click to select file or drop it here"}
                        </p>
                        <p className='text-sm text-slate-400 mt-1'>
                            {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "We will evaluate technical keywords and parsing configurations"}
                        </p>
                    </div>
                </label>

                {message && (
                    <div className={`p-4 rounded-xl text-sm font-semibold tracking-wide border ${
                        message.startsWith("✅") ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"
                    }`}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={uploading || !file}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center cursor-pointer"
                >
                    {uploading ? "Uploading Data Buffers...":"Upload & Run Audit Metrics"}
                </button>
            </form>
        </div>


    )
}
