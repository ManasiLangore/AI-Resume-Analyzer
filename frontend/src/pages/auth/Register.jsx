import React, { useState } from 'react';
import { 
  User, Mail, Lock, Eye, EyeOff, CheckCircle2, 
  ArrowRight, Brain, Sparkles, ChevronRight, Briefcase 
} from 'lucide-react';
import axios from 'axios';


export default function Register() {
    // 1. Single State to track all form data
    const [formData, setformData] = useState({
        fullName: '',
        email: '',
        password:'',
        confirmPassword:''
    });

    const [showPassword, setshowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // 2. Simple handler updates state when you type
    const handleChange = (e) => {
        setformData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword){
            alert("Passward do not match!");
            return;
        }
        alert(`Account created for ${formData.fullName}!`);
        console.log("Form Submitted:", formData)

        setLoading(true);
        try{
            // Data format your Spring Boot backend expects (User entity)
            const userData = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            };
            const res = await axios.post('http://localhost:8080/api/auth/register', userData);
            alert(res.data);
            setformData({
                fullName: '', email: '', password: '', confirmPassword: ''
            });
        }
        catch(error){
            console.error("Registration error: ",error);
            alert("Registration failed! Check if your backend server is running.");
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans'>
        {/* Centered Main Form Card */}
        <div className='w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-md space-y-6'>

            {/* Logo and Header */}
            <div className='text-center space-y-2'>
                <div className='inline-flex bg-indigo-600 p-2.5 rounded-2xl text-white mb-2'>
                    <Brain className="w-6 h-6"></Brain>
                </div>
                <h2 className='text-2xl font-bold text-slate-900'>Create Your Account</h2>
                <p className='text-sm text-slate-500'>Start analyzing your resume with AI.</p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>

                {/* Field: Full Name */}
                <div className="space-y-1">
                    <label className='text-xs font-semibold text-slate-600 uppercase'>Full Name</label>
                    <div className='relative'>
                        <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400'></User>
                        <input 
                            type="text" 
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe" 
                            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all"
                        />
                    </div>
                </div>
                {/* Field: Email Address */}
                <div className="space-y-1">
                    <label className='text-xs font-semibold text-slate-600 uppercase'>Email</label>
                    <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400'></Mail>
                        <input
                            type="email"
                            name='email'
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all"
                        />
                    </div>
                </div>
                {/* Field: Password */}
                <div>
                    <label className='text-xs font-semibold text-slate-600 uppercase'>Password</label>
                    <div className='relative'>
                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400'></Lock>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••" 
                            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none transition-all"
                        />
                        <button
                            type='button'
                            onClick={()=> setshowPassword(!showPassword)}
                            className='absolute rigth-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 '
                        >
                            {showPassword ? <EyeOff className='w-4 h-4'/> : <Eye className='w-4 h-4'/>}
                        </button>
                    </div>
                </div>
                {/* Field: Confirm Password */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase">Confirm Password</label>
                    <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••" 
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all"
                    />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-sm shadow-sm transition-all mt-2 cursor-pointer'
                >
                    Create Account
                </button>
            </form>

            {/* Bottom Link */}
            <div className='text-center pt-2 border-t border-slate-100'>
                <p className='text-sm text-slate-500'>
                    Already have an account?{' '}
                    <a href='#' className='text-indigo-600 font-bold hover:underline'>Sign In</a>
                </p>
            </div>

        </div>
    </div>
  )
}
