import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Building2, UserCircle2 } from 'lucide-react';

export default function LoginSelection() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-800/20 rounded-full blur-3xl"></div>

      <div className="z-10 text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center shadow-xl border border-slate-700">
            <ShieldCheck className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">CRPF Procurement</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          AI-Based Tender Evaluation & Eligibility Analysis Platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full z-10 px-4">
        {/* Admin Card */}
        <Link to="/auth/admin/login" className="group">
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-900/20 h-full flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <UserCircle2 className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">Admin Portal</h2>
            <p className="text-slate-400 mb-8 flex-1">
              For Procurement Officers and System Administrators to manage tenders, review evaluations, and monitor audits.
            </p>
            <div className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Login as Admin
            </div>
          </div>
        </Link>

        {/* Bidder Card */}
        <Link to="/auth/bidder/login" className="group">
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800 hover:border-indigo-500/50 transition-all duration-300 shadow-xl hover:shadow-indigo-900/20 h-full flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Building2 className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">Bidder Portal</h2>
            <p className="text-slate-400 mb-8 flex-1">
              For registered vendors and companies to submit tender documents, track eligibility, and manage profiles.
            </p>
            <div className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
              Login as Bidder
            </div>
          </div>
        </Link>
      </div>

      <div className="absolute bottom-8 text-slate-500 text-sm z-10">
        &copy; {new Date().getFullYear()} Central Reserve Police Force. Secure Gov-Tech Platform.
      </div>
    </div>
  );
}
