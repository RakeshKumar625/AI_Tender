import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, Clock, XCircle, AlertCircle, Building2, FileText } from 'lucide-react';

const COMPANY_STATUS: Record<string, {
  tender: string;
  submitted: string;
  amount: string;
  stage: string;
  progress: number;
  status: 'Eligible' | 'Under Review' | 'Not Eligible' | 'Submitted';
  steps: { label: string; done: boolean; active: boolean }[];
}[]> = {
  'techbridge.solutions@bid.com': [
    {
      tender: 'Supply of Network Surveillance Equipment',
      submitted: '02 May 2026', amount: '₹1.8 Cr', stage: 'Evaluation Complete', progress: 100, status: 'Eligible',
      steps: [
        { label: 'Documents Uploaded', done: true, active: false },
        { label: 'AI Extraction', done: true, active: false },
        { label: 'Criteria Evaluation', done: true, active: false },
        { label: 'Final Decision', done: true, active: false },
      ],
    },
    {
      tender: 'Procurement of Encrypted Communications System',
      submitted: '28 Apr 2026', amount: '₹95 L', stage: 'Manual Review', progress: 75, status: 'Under Review',
      steps: [
        { label: 'Documents Uploaded', done: true, active: false },
        { label: 'AI Extraction', done: true, active: false },
        { label: 'Criteria Evaluation', done: true, active: false },
        { label: 'Manual Review', done: false, active: true },
      ],
    },
  ],
  'infrazone.builders@bid.com': [
    {
      tender: 'Construction of Barracks – Sector 4',
      submitted: '01 May 2026', amount: '₹3.2 Cr', stage: 'Manual Review', progress: 75, status: 'Under Review',
      steps: [
        { label: 'Documents Uploaded', done: true, active: false },
        { label: 'AI Extraction', done: true, active: false },
        { label: 'Criteria Evaluation', done: true, active: false },
        { label: 'Manual Review', done: false, active: true },
      ],
    },
    {
      tender: 'Road & Drainage Work – Camp Perimeter',
      submitted: '25 Apr 2026', amount: '₹1.6 Cr', stage: 'Evaluation Complete', progress: 100, status: 'Eligible',
      steps: [
        { label: 'Documents Uploaded', done: true, active: false },
        { label: 'AI Extraction', done: true, active: false },
        { label: 'Criteria Evaluation', done: true, active: false },
        { label: 'Final Decision', done: true, active: false },
      ],
    },
  ],
  'nexasoft.tech@bid.com': [
    {
      tender: 'AI-based Document Verification System',
      submitted: '03 May 2026', amount: '₹85 L', stage: 'Evaluation Complete', progress: 100, status: 'Eligible',
      steps: [
        { label: 'Documents Uploaded', done: true, active: false },
        { label: 'AI Extraction', done: true, active: false },
        { label: 'Criteria Evaluation', done: true, active: false },
        { label: 'Final Decision', done: true, active: false },
      ],
    },
    {
      tender: 'Facial Recognition Access Control',
      submitted: '29 Apr 2026', amount: '₹1.1 Cr', stage: 'AI Extraction', progress: 50, status: 'Submitted',
      steps: [
        { label: 'Documents Uploaded', done: true, active: false },
        { label: 'AI Extraction', done: false, active: true },
        { label: 'Criteria Evaluation', done: false, active: false },
        { label: 'Final Decision', done: false, active: false },
      ],
    },
  ],
  'safeguard.systems@bid.com': [
    {
      tender: 'Supply of Bulletproof Vests – 500 Units',
      submitted: '04 May 2026', amount: '₹2.25 Cr', stage: 'Manual Review', progress: 75, status: 'Under Review',
      steps: [
        { label: 'Documents Uploaded', done: true, active: false },
        { label: 'AI Extraction', done: true, active: false },
        { label: 'Criteria Evaluation', done: true, active: false },
        { label: 'Manual Review', done: false, active: true },
      ],
    },
    {
      tender: 'CCTV & Thermal Imaging – Checkpost A12',
      submitted: '27 Apr 2026', amount: '₹78 L', stage: 'Evaluation Complete', progress: 100, status: 'Eligible',
      steps: [
        { label: 'Documents Uploaded', done: true, active: false },
        { label: 'AI Extraction', done: true, active: false },
        { label: 'Criteria Evaluation', done: true, active: false },
        { label: 'Final Decision', done: true, active: false },
      ],
    },
  ],
  'alpine.logistics@bid.com': [
    {
      tender: 'Annual Ration Supply – Southern Command',
      submitted: '02 May 2026', amount: '₹1.7 Cr', stage: 'Evaluation Complete', progress: 100, status: 'Eligible',
      steps: [
        { label: 'Documents Uploaded', done: true, active: false },
        { label: 'AI Extraction', done: true, active: false },
        { label: 'Criteria Evaluation', done: true, active: false },
        { label: 'Final Decision', done: true, active: false },
      ],
    },
    {
      tender: 'Vehicle Fleet Maintenance Contract',
      submitted: '26 Apr 2026', amount: '₹95 L', stage: 'AI Extraction', progress: 50, status: 'Submitted',
      steps: [
        { label: 'Documents Uploaded', done: true, active: false },
        { label: 'AI Extraction', done: false, active: true },
        { label: 'Criteria Evaluation', done: false, active: false },
        { label: 'Final Decision', done: false, active: false },
      ],
    },
  ],
};

const STATUS_STYLE = {
  'Eligible':     { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle2 size={14} /> },
  'Under Review': { color: 'bg-amber-100 text-amber-700 border-amber-200',     icon: <AlertCircle size={14} /> },
  'Not Eligible': { color: 'bg-rose-100 text-rose-700 border-rose-200',        icon: <XCircle size={14} /> },
  'Submitted':    { color: 'bg-blue-100 text-blue-700 border-blue-200',        icon: <Clock size={14} /> },
};

export default function BidderStatus() {
  const { user } = useAuth();
  const items = (user?.email && COMPANY_STATUS[user.email]) ? COMPANY_STATUS[user.email] : [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Track Status</h2>
        <p className="text-slate-500 mt-1 flex items-center gap-2">
          <Building2 size={15} /> {user?.company_name} — real-time evaluation progress
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">
          No active submissions to track.
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((item, i) => {
            const style = STATUS_STYLE[item.status];
            return (
              <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Card Header */}
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                      <FileText size={16} className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{item.tender}</p>
                      <p className="text-xs text-slate-500">Submitted: {item.submitted} &bull; {item.amount}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${style.color}`}>
                    {style.icon} {item.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="px-6 pt-5 pb-2">
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>Stage: <strong className="text-slate-700">{item.stage}</strong></span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-700 bg-indigo-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="px-6 py-5 grid grid-cols-4 gap-2">
                  {item.steps.map((step, si) => (
                    <div key={si} className="flex flex-col items-center text-center gap-1.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold
                        ${step.done ? 'bg-indigo-600 border-indigo-600 text-white' :
                          step.active ? 'border-amber-400 bg-amber-50 text-amber-600 animate-pulse' :
                          'border-slate-200 bg-white text-slate-400'}`}>
                        {step.done ? <CheckCircle2 size={14} /> : si + 1}
                      </div>
                      <p className={`text-xs leading-tight ${step.done ? 'text-indigo-700 font-medium' : step.active ? 'text-amber-600 font-medium' : 'text-slate-400'}`}>
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
