import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, XCircle, AlertCircle, Clock, FileText, Building2, Download, ChevronDown, ChevronUp } from 'lucide-react';

const COMPANY_HISTORY: Record<string, {
  tender: string;
  submitted: string;
  decided: string;
  amount: string;
  status: 'Eligible' | 'Under Review' | 'Not Eligible' | 'Submitted';
  score: number;
  criteria: { name: string; result: 'PASS' | 'FAIL' | 'REVIEW'; detail: string }[];
}[]> = {
  'techbridge.solutions@bid.com': [
    {
      tender: 'Installation of CCTV Grid – Border Posts', submitted: '20 Apr 2026', decided: '23 Apr 2026',
      amount: '₹1.35 Cr', status: 'Eligible', score: 94,
      criteria: [
        { name: 'Annual Turnover ≥ ₹1 Cr', result: 'PASS', detail: 'Declared turnover: ₹4.2 Cr (FY 2024–25)' },
        { name: 'ISO 9001 Certification', result: 'PASS', detail: 'Certificate valid until Dec 2026' },
        { name: 'Minimum 3 similar projects', result: 'PASS', detail: '7 projects found across 3 states' },
        { name: 'No blacklist record', result: 'PASS', detail: 'No adverse record found' },
      ],
    },
    {
      tender: 'IT Infrastructure Upgrade – HQ Block', submitted: '05 Apr 2026', decided: '10 Apr 2026',
      amount: '₹60 L', status: 'Eligible', score: 89,
      criteria: [
        { name: 'Annual Turnover ≥ ₹50 L', result: 'PASS', detail: 'Declared turnover: ₹4.2 Cr' },
        { name: 'GST Registration', result: 'PASS', detail: 'GST: 27AABCT3518Q1Z5 — Active' },
        { name: 'Minimum 2 similar projects', result: 'PASS', detail: '5 projects verified' },
        { name: 'PAN Verification', result: 'PASS', detail: 'PAN validated against MCA records' },
      ],
    },
  ],
  'infrazone.builders@bid.com': [
    {
      tender: 'Boundary Wall Construction – Eastern Zone', submitted: '18 Apr 2026', decided: '22 Apr 2026',
      amount: '₹2.4 Cr', status: 'Not Eligible', score: 42,
      criteria: [
        { name: 'Annual Turnover ≥ ₹2 Cr', result: 'FAIL', detail: 'Declared ₹1.6 Cr — below threshold' },
        { name: 'PWD Empanelment', result: 'FAIL', detail: 'No valid PWD certificate found in documents' },
        { name: 'Minimum 5 similar projects', result: 'PASS', detail: '6 projects completed' },
        { name: 'No blacklist record', result: 'PASS', detail: 'Clean record verified' },
      ],
    },
    {
      tender: 'Approach Road Construction – Camp North', submitted: '10 Apr 2026', decided: '14 Apr 2026',
      amount: '₹90 L', status: 'Eligible', score: 91,
      criteria: [
        { name: 'Annual Turnover ≥ ₹75 L', result: 'PASS', detail: 'Turnover ₹9.7 Cr — well above threshold' },
        { name: 'CPWD Registration', result: 'PASS', detail: 'Class I contractor registered' },
        { name: 'Minimum 3 road projects', result: 'PASS', detail: '8 road projects cited' },
        { name: 'ESI/PF Compliance', result: 'PASS', detail: 'Compliance certificates attached' },
      ],
    },
  ],
  'nexasoft.tech@bid.com': [
    {
      tender: 'Procurement Management Software Suite', submitted: '22 Apr 2026', decided: '26 Apr 2026',
      amount: '₹45 L', status: 'Eligible', score: 97,
      criteria: [
        { name: 'Annual Turnover ≥ ₹30 L', result: 'PASS', detail: 'Turnover ₹2.8 Cr confirmed' },
        { name: 'CMMI Level 3 or ISO 27001', result: 'PASS', detail: 'ISO 27001:2022 certificate attached' },
        { name: 'Minimum 2 government deployments', result: 'PASS', detail: '4 state govt. deployments verified' },
        { name: 'Data residency compliance', result: 'PASS', detail: 'Servers hosted in MeitY-empanelled DC' },
      ],
    },
    {
      tender: 'Mobile App for Field Reporting', submitted: '01 Apr 2026', decided: '05 Apr 2026',
      amount: '₹20 L', status: 'Eligible', score: 100,
      criteria: [
        { name: 'Annual Turnover ≥ ₹15 L', result: 'PASS', detail: 'Turnover ₹2.8 Cr — far exceeds minimum' },
        { name: 'Android/iOS experience', result: 'PASS', detail: '3 cross-platform apps on record' },
        { name: 'VAPT Certificate', result: 'PASS', detail: 'Latest VAPT report dated Feb 2026' },
        { name: 'No litigation pending', result: 'PASS', detail: 'Self-declaration + legal clearance attached' },
      ],
    },
  ],
  'safeguard.systems@bid.com': [
    {
      tender: 'Anti-Drone Detection System', submitted: '19 Apr 2026', decided: '24 Apr 2026',
      amount: '₹1.4 Cr', status: 'Not Eligible', score: 55,
      criteria: [
        { name: 'Defence DPIIT Registration', result: 'FAIL', detail: 'Registration expired Jan 2026 — not renewed' },
        { name: 'Annual Turnover ≥ ₹1.5 Cr', result: 'REVIEW', detail: 'Declared ₹1.4 Cr — slightly below; flagged for review' },
        { name: 'Minimum 2 similar deployments', result: 'PASS', detail: '3 CCTV + drone-detect projects cited' },
        { name: 'No blacklist record', result: 'PASS', detail: 'No adverse record found' },
      ],
    },
    {
      tender: 'Supply of Body Armour – 200 Units', submitted: '10 Mar 2026', decided: '15 Mar 2026',
      amount: '₹80 L', status: 'Eligible', score: 88,
      criteria: [
        { name: 'BIS Certification for Body Armour', result: 'PASS', detail: 'BIS IS 17051 certificate attached' },
        { name: 'Annual Turnover ≥ ₹50 L', result: 'PASS', detail: 'Turnover ₹6.1 Cr' },
        { name: 'ISO 9001 Manufacturing', result: 'PASS', detail: 'Certificate valid until Jun 2027' },
        { name: 'Delivery within 90 days', result: 'PASS', detail: 'Committed delivery: 60 days' },
      ],
    },
  ],
  'alpine.logistics@bid.com': [
    {
      tender: 'Cold-chain Medical Supply Logistics', submitted: '17 Apr 2026', decided: '21 Apr 2026',
      amount: '₹60 L', status: 'Eligible', score: 93,
      criteria: [
        { name: 'FSSAI / Cold-chain Cert.', result: 'PASS', detail: 'Valid FSSAI licence + ATP certificate' },
        { name: 'Annual Turnover ≥ ₹40 L', result: 'PASS', detail: 'Turnover ₹5.5 Cr' },
        { name: 'Minimum 3 govt. logistics contracts', result: 'PASS', detail: '5 central govt. contracts cited' },
        { name: 'Fleet size ≥ 10 vehicles', result: 'PASS', detail: '28 refrigerated vehicles registered' },
      ],
    },
    {
      tender: 'Office Supplies Annual Contract', submitted: '20 Mar 2026', decided: '25 Mar 2026',
      amount: '₹12 L', status: 'Eligible', score: 100,
      criteria: [
        { name: 'Annual Turnover ≥ ₹10 L', result: 'PASS', detail: 'Turnover ₹5.5 Cr' },
        { name: 'GST Registration', result: 'PASS', detail: 'GST: 33AABCA4321E1ZR — Active' },
        { name: 'Experience ≥ 2 years', result: 'PASS', detail: 'Incorporated 2016 — 10 years experience' },
        { name: 'No pending dues', result: 'PASS', detail: 'IT return & GST filing up to date' },
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

const CRITERIA_STYLE = {
  PASS:   'bg-emerald-50 text-emerald-700 border-emerald-200',
  FAIL:   'bg-rose-50 text-rose-700 border-rose-200',
  REVIEW: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function BidderHistory() {
  const { user } = useAuth();
  const history = (user?.email && COMPANY_HISTORY[user.email]) ? COMPANY_HISTORY[user.email] : [];
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Submission History</h2>
        <p className="text-slate-500 mt-1 flex items-center gap-2">
          <Building2 size={15} /> {user?.company_name} — past tender evaluation results
        </p>
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">
          No history found. Past submissions will appear here after evaluation.
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item, i) => {
            const style = STATUS_STYLE[item.status];
            const isOpen = expanded === i;
            return (
              <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100 shrink-0">
                      <FileText size={16} className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{item.tender}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Submitted: {item.submitted} &nbsp;&bull;&nbsp; Decision: {item.decided} &nbsp;&bull;&nbsp; {item.amount}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    {/* Score */}
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-slate-400">Score</p>
                      <p className={`text-lg font-bold ${item.score >= 80 ? 'text-emerald-600' : item.score >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                        {item.score}/100
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${style.color}`}>
                      {style.icon} {item.status}
                    </span>
                    {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                  </div>
                </button>

                {/* Expanded Criteria */}
                {isOpen && (
                  <div className="border-t border-slate-100 px-6 py-5 space-y-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-slate-700">Evaluation Criteria Breakdown</h4>
                      <button className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                        <Download size={12} /> Download Report
                      </button>
                    </div>
                    <div className="space-y-2">
                      {item.criteria.map((c, ci) => (
                        <div key={ci} className={`flex items-start justify-between p-3 rounded-lg border ${CRITERIA_STYLE[c.result]}`}>
                          <div>
                            <p className="text-sm font-medium">{c.name}</p>
                            <p className="text-xs mt-0.5 opacity-80">{c.detail}</p>
                          </div>
                          <span className="text-xs font-bold ml-4 shrink-0">{c.result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
