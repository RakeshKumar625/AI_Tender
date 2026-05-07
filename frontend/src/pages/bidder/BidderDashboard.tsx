import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  CheckCircle2, Clock, XCircle, UploadCloud, TrendingUp,
  FileText, AlertCircle, ArrowRight, Award, Building2
} from 'lucide-react';

// Per-company realistic dummy data keyed by email
const COMPANY_DATA: Record<string, {
  active: number;
  pending: number;
  approved: number;
  rejected: number;
  totalBid: string;
  successRate: string;
  sector: string;
  recentSubmissions: { tender: string; date: string; amount: string; status: 'Eligible' | 'Under Review' | 'Not Eligible' | 'Submitted' }[];
  upcomingTenders: { name: string; deadline: string; value: string }[];
}> = {
  'techbridge.solutions@bid.com': {
    active: 3, pending: 2, approved: 8, rejected: 1,
    totalBid: '₹4.2 Cr', successRate: '88%', sector: 'IT & Cybersecurity',
    recentSubmissions: [
      { tender: 'Supply of Network Surveillance Equipment', date: '02 May 2026', amount: '₹1.8 Cr', status: 'Eligible' },
      { tender: 'Procurement of Encrypted Comms System', date: '28 Apr 2026', amount: '₹95 L', status: 'Under Review' },
      { tender: 'Installation of CCTV Grid – Border Posts', date: '20 Apr 2026', amount: '₹1.35 Cr', status: 'Eligible' },
    ],
    upcomingTenders: [
      { name: 'Cyber Threat Detection Platform', deadline: '15 Jun 2026', value: '₹2.1 Cr' },
      { name: 'Secure Cloud Migration Services', deadline: '30 Jun 2026', value: '₹75 L' },
    ],
  },
  'infrazone.builders@bid.com': {
    active: 2, pending: 1, approved: 5, rejected: 2,
    totalBid: '₹9.7 Cr', successRate: '71%', sector: 'Civil Infrastructure',
    recentSubmissions: [
      { tender: 'Construction of Barracks – Sector 4', date: '01 May 2026', amount: '₹3.2 Cr', status: 'Under Review' },
      { tender: 'Road & Drainage Work – Camp Perimeter', date: '25 Apr 2026', amount: '₹1.6 Cr', status: 'Eligible' },
      { tender: 'Boundary Wall Construction – Eastern Zone', date: '18 Apr 2026', amount: '₹2.4 Cr', status: 'Not Eligible' },
    ],
    upcomingTenders: [
      { name: 'Administrative Block Renovation', deadline: '20 Jun 2026', value: '₹4.5 Cr' },
      { name: 'Helipad Construction – Forward Base', deadline: '10 Jul 2026', value: '₹1.2 Cr' },
    ],
  },
  'nexasoft.tech@bid.com': {
    active: 4, pending: 3, approved: 6, rejected: 0,
    totalBid: '₹2.8 Cr', successRate: '100%', sector: 'AI Software & Analytics',
    recentSubmissions: [
      { tender: 'AI-based Document Verification System', date: '03 May 2026', amount: '₹85 L', status: 'Eligible' },
      { tender: 'Facial Recognition Access Control', date: '29 Apr 2026', amount: '₹1.1 Cr', status: 'Submitted' },
      { tender: 'Procurement Management Software Suite', date: '22 Apr 2026', amount: '₹45 L', status: 'Eligible' },
    ],
    upcomingTenders: [
      { name: 'NLP-based Incident Report Analyser', deadline: '25 Jun 2026', value: '₹65 L' },
      { name: 'Predictive Maintenance Dashboard', deadline: '05 Jul 2026', value: '₹90 L' },
    ],
  },
  'safeguard.systems@bid.com': {
    active: 2, pending: 1, approved: 10, rejected: 3,
    totalBid: '₹6.1 Cr', successRate: '76%', sector: 'Physical Security & Surveillance',
    recentSubmissions: [
      { tender: 'Supply of Bulletproof Vests – 500 Units', date: '04 May 2026', amount: '₹2.25 Cr', status: 'Under Review' },
      { tender: 'CCTV & Thermal Imaging – Checkpost A12', date: '27 Apr 2026', amount: '₹78 L', status: 'Eligible' },
      { tender: 'Anti-Drone Detection System', date: '19 Apr 2026', amount: '₹1.4 Cr', status: 'Not Eligible' },
    ],
    upcomingTenders: [
      { name: 'Procurement of Body-worn Cameras', deadline: '18 Jun 2026', value: '₹1.8 Cr' },
      { name: 'Access Control Revamp – HQ Complex', deadline: '02 Jul 2026', value: '₹55 L' },
    ],
  },
  'alpine.logistics@bid.com': {
    active: 1, pending: 2, approved: 7, rejected: 1,
    totalBid: '₹5.5 Cr', successRate: '87%', sector: 'Logistics & Supply Chain',
    recentSubmissions: [
      { tender: 'Annual Ration Supply – Southern Command', date: '02 May 2026', amount: '₹1.7 Cr', status: 'Eligible' },
      { tender: 'Vehicle Fleet Maintenance Contract', date: '26 Apr 2026', amount: '₹95 L', status: 'Submitted' },
      { tender: 'Cold-chain Medical Supply Logistics', date: '17 Apr 2026', amount: '₹60 L', status: 'Eligible' },
    ],
    upcomingTenders: [
      { name: 'Bulk Fuel Procurement – 12-month Contract', deadline: '22 Jun 2026', value: '₹2.3 Cr' },
      { name: 'Spare Parts Warehousing – Eastern Region', deadline: '08 Jul 2026', value: '₹40 L' },
    ],
  },
};

const DEFAULT_DATA = {
  active: 1, pending: 0, approved: 2, rejected: 0,
  totalBid: '₹50 L', successRate: '100%', sector: 'General',
  recentSubmissions: [] as { tender: string; date: string; amount: string; status: 'Eligible' | 'Under Review' | 'Not Eligible' | 'Submitted' }[],
  upcomingTenders: [] as { name: string; deadline: string; value: string }[],
};

const STATUS_CONFIG = {
  'Eligible':      { color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 size={13} /> },
  'Under Review':  { color: 'bg-amber-100 text-amber-700',   icon: <AlertCircle size={13} /> },
  'Not Eligible':  { color: 'bg-rose-100 text-rose-700',     icon: <XCircle size={13} /> },
  'Submitted':     { color: 'bg-blue-100 text-blue-700',     icon: <Clock size={13} /> },
};

export default function BidderDashboard() {
  const { user } = useAuth();
  const data = (user?.email && COMPANY_DATA[user.email]) ? COMPANY_DATA[user.email] : DEFAULT_DATA;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, {user?.company_name?.split(' ').slice(0, 2).join(' ') ?? 'Bidder'}
          </h2>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <Building2 size={15} />
            {data.sector} &mdash; CRPF Tender Portal
          </p>
        </div>
        <Link
          to="/bidder/submit"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow transition-colors"
        >
          <UploadCloud size={16} /> Submit New Tender
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <StatCard label="Active Submissions" value={data.active} icon={<FileText size={20} className="text-indigo-500" />} bg="bg-indigo-50" border="border-indigo-100" />
        <StatCard label="Pending Reviews" value={data.pending} icon={<Clock size={20} className="text-amber-500" />} bg="bg-amber-50" border="border-amber-100" />
        <StatCard label="Approved Tenders" value={data.approved} icon={<CheckCircle2 size={20} className="text-emerald-500" />} bg="bg-emerald-50" border="border-emerald-100" />
        <StatCard label="Rejected" value={data.rejected} icon={<XCircle size={20} className="text-rose-500" />} bg="bg-rose-50" border="border-rose-100" />
      </div>

      {/* Performance & Upcoming row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Performance Summary */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-slate-800 text-base">Performance Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total Bid Value</p>
              <p className="text-2xl font-bold text-slate-900">{data.totalBid}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-indigo-600 flex items-center gap-1">
                <TrendingUp size={18} />{data.successRate}
              </p>
            </div>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-center gap-3">
            <Award size={20} className="text-indigo-500 shrink-0" />
            <p className="text-sm text-indigo-700 font-medium">
              Your company is a <span className="font-bold">top-rated bidder</span> in the {data.sector} category.
            </p>
          </div>
        </div>

        {/* Upcoming Tenders */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-800 text-base mb-4">Upcoming Tenders</h3>
          {data.upcomingTenders.length === 0 ? (
            <p className="text-slate-500 text-sm">No upcoming tenders found.</p>
          ) : (
            <div className="space-y-3">
              {data.upcomingTenders.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Deadline: {t.deadline}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-slate-700">{t.value}</p>
                    <Link to="/bidder/submit" className="text-xs text-indigo-600 hover:underline flex items-center justify-end gap-0.5 mt-0.5">
                      Apply <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">Recent Submissions</h3>
          <Link to="/bidder/history" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        {data.recentSubmissions.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No submissions yet. <Link to="/bidder/submit" className="text-indigo-600 hover:underline">Submit your first tender →</Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.recentSubmissions.map((s, i) => {
              const cfg = STATUS_CONFIG[s.status];
              return (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 bg-indigo-50 rounded-lg">
                      <FileText size={16} className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{s.tender}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Submitted: {s.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <p className="text-sm font-semibold text-slate-700">{s.amount}</p>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.color}`}>
                      {cfg.icon} {s.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, bg, border }: {
  label: string; value: number; icon: React.ReactNode; bg: string; border: string;
}) {
  return (
    <div className={`bg-white rounded-xl border ${border} shadow-sm p-5 flex items-center justify-between`}>
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">{label}</p>
        <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
      <div className={`${bg} p-3 rounded-xl border ${border}`}>{icon}</div>
    </div>
  );
}
