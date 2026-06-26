import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Brain } from 'lucide-react';
import axios from 'axios';
import {Link} from "react-router-dom";

export default function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>{
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{
      //Send login data to Spring boot
      const res = await axios.post('http://localhost:8080/api/auth/login', formData);
      alert(res.data);
    }
    catch(error){
      console.error("Login Error:", error);

      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("Login failed! Make sure your backend server is running.");
      }
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans'>
      <div className='w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-md space-y-6'>

        <div className='text-center space-y-2'>
          <div className='inline-flex bg-indigo-600 p-2.5 rounded-xl text-white mb-2'>
            <Brain className='w-6 h-6'></Brain>
          </div>
          <h2  className='text-2xl font-bold text-slate-900'>Welcome Back</h2>
          <p className='text-sm text-scate-500'>Sign in to continue analyzing your resume.</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Field: Email Address */}
          <div className='space-y-1'>
            <label className='text-xs font-semibold text-slate-600 uppercase'>Email</label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400'></Mail>
              <input
                type='email'
                name='email'
                required
                value={formData.email}
                onChange={handleChange}
                placeholder='you@example.com'
                className='w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transaction-all '
              >
              </input>
            </div>
          </div>
          {/* Field: Password */}
          <div className='space-y-1'>
            <label className='text-xs font-semibold text-slate-600 uppercase'>Password</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400'></Lock>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                required
                value={formData.password}
                onChange={handleChange}
                placeholder='............'
                className='w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transaction-all '
              ></input>
            </div>
          </div>
          {/* Submit Button */}
          <Link
            to={"/dashboard"}
            type='submit'
            disabled={loading}
            className='w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-2.5 rounded-xl text-sm shadow-sm transition-all mt-2 cursor-pointer flex items-center justify-center'
          >
            {loading ? "Signing In..." : "Sign In"}
          
          </Link>
        </form>

        <div className='text-center pt-2 border-t border-slate-100'>
          <p className='text-sm text-slate-500'>
            Don't have an account?{' '}
            <Link to="/register" className='text-indigo-600 font-bold hover:underline'>
            Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
