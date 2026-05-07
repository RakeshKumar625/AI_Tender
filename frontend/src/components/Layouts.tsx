import React from 'react';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, CheckSquare, ShieldCheck, FileSpreadsheet, LogOut, UploadCloud, Clock, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DateTimeDisplay from './DateTimeDisplay';

export function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/selection');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-10">
        <div className="h-16 flex items-center px-6 bg-slate-950 text-white font-bold text-lg tracking-wide border-b border-slate-800">
          <ShieldCheck className="w-6 h-6 mr-3 text-blue-500" />
          CRPF Procurement
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavItem to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/admin/tenders" icon={<FileText size={20} />} label="Tender Upload" />
          <NavItem to="/admin/evaluation" icon={<CheckSquare size={20} />} label="Evaluation" />
          <NavItem to="/admin/review" icon={<FileSpreadsheet size={20} />} label="Manual Review" />
          <NavItem to="/admin/audit" icon={<ShieldCheck size={20} />} label="Audit Trail" />
        </nav>
        <div className="p-4 border-t border-slate-800 flex justify-between items-center">
          <div className="text-xs text-slate-500">Admin Portal v1.0.0</div>
          <button onClick={handleLogout} className="text-slate-400 hover:text-white transition-colors" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-800">Explainable AI Decision Support</h1>
          
          <div className="flex items-center space-x-6">
            <DateTimeDisplay />
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-6">
              <div className="text-sm font-medium text-slate-600">{user?.email}</div>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                A
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function BidderLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/selection');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-10">
        <div className="h-16 flex items-center px-6 bg-slate-950 text-white font-bold text-lg tracking-wide border-b border-slate-800">
          <ShieldCheck className="w-6 h-6 mr-3 text-indigo-500" />
          CRPF Bidder Portal
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavItem to="/bidder/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/bidder/submit" icon={<UploadCloud size={20} />} label="Submit Tender" />
          <NavItem to="/bidder/status" icon={<Clock size={20} />} label="Track Status" />
          <NavItem to="/bidder/history" icon={<History size={20} />} label="History" />
        </nav>
        <div className="p-4 border-t border-slate-800 flex justify-between items-center">
          <div className="text-xs text-slate-500">Bidder Portal v1.0.0</div>
          <button onClick={handleLogout} className="text-slate-400 hover:text-white transition-colors" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-800">Tender Submissions & Status</h1>
          
          <div className="flex items-center space-x-6">
            <DateTimeDisplay />
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-6">
              <div className="text-sm font-medium text-slate-600">{user?.company_name || user?.email}</div>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                B
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <Link to={to} className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all duration-200 group">
      <span className="text-slate-400 group-hover:text-blue-400 transition-colors">{icon}</span>
      <span className="ml-3 font-medium">{label}</span>
    </Link>
  );
}
