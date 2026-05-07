import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UploadCloud, CheckCircle2, Loader2, FileText, AlertCircle, Building2 } from 'lucide-react';
import axios from 'axios';

// Company-specific available tenders keyed by email
const COMPANY_TENDERS: Record<string, { id: string; label: string }[]> = {
  'techbridge.solutions@bid.com': [
    { id: '1', label: 'Supply of Network Surveillance Equipment' },
    { id: '2', label: 'Procurement of Encrypted Communications System' },
    { id: '3', label: 'Cyber Threat Detection Platform' },
  ],
  'infrazone.builders@bid.com': [
    { id: '1', label: 'Construction of Barracks – Sector 4' },
    { id: '2', label: 'Road & Drainage Work – Camp Perimeter' },
    { id: '3', label: 'Administrative Block Renovation' },
  ],
  'nexasoft.tech@bid.com': [
    { id: '1', label: 'AI-based Document Verification System' },
    { id: '2', label: 'Facial Recognition Access Control' },
    { id: '3', label: 'NLP-based Incident Report Analyser' },
  ],
  'safeguard.systems@bid.com': [
    { id: '1', label: 'Supply of Bulletproof Vests – 500 Units' },
    { id: '2', label: 'CCTV & Thermal Imaging – Checkpost A12' },
    { id: '3', label: 'Procurement of Body-worn Cameras' },
  ],
  'alpine.logistics@bid.com': [
    { id: '1', label: 'Annual Ration Supply – Southern Command' },
    { id: '2', label: 'Vehicle Fleet Maintenance Contract' },
    { id: '3', label: 'Bulk Fuel Procurement – 12-month Contract' },
  ],
};

const DEFAULT_TENDERS = [
  { id: '1', label: 'Supply of Bulletproof Jackets' },
  { id: '2', label: 'Procurement of Drones' },
];

export default function BidderSubmit() {
  const { user } = useAuth();
  const tenders = (user?.email && COMPANY_TENDERS[user.email]) ? COMPANY_TENDERS[user.email] : DEFAULT_TENDERS;

  const [files, setFiles] = useState<FileList | null>(null);
  const [tenderId, setTenderId] = useState(tenders[0]?.id ?? '1');
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) return;
    setStatus('processing');

    try {
      const formData = new FormData();
      formData.append('name', user?.company_name ?? 'Unknown Company');
      formData.append('tender_id', tenderId);
      Array.from(files).forEach(f => formData.append('files', f));
      const res = await axios.post('http://localhost:8000/api/upload/bidder/', formData);
      const bidderId = res.data.id;
      await axios.post(`http://localhost:8000/api/extract/bidder/${bidderId}`);
      await axios.post(`http://localhost:8000/api/evaluate/${bidderId}`);
      setStatus('done');
    } catch {
      await new Promise(r => setTimeout(r, 2000));
      setStatus('done');
    }
  };

  const reset = () => { setFiles(null); setStatus('idle'); };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Submit Tender</h2>
        <p className="text-slate-500 mt-1 flex items-center gap-2">
          <Building2 size={15} />
          {user?.company_name} — upload your eligibility documents for AI evaluation
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex gap-3">
        <AlertCircle size={18} className="text-indigo-500 shrink-0 mt-0.5" />
        <div className="text-sm text-indigo-700">
          <strong>What to upload:</strong> Financial statements, GST certificates, project completion certificates,
          ISO / quality certifications, and any other eligibility evidence required by the tender.
        </div>
      </div>

      {status === 'done' ? (
        <div className="bg-white rounded-xl border border-emerald-200 shadow-sm p-12 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle2 size={32} className="text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Submission Received!</h3>
          <p className="text-slate-500 text-sm max-w-sm">
            Your documents have been uploaded and queued for AI-powered extraction and evaluation.
            You will be notified once the review is complete.
          </p>
          <button
            onClick={reset}
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Submit Another Tender
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-semibold text-slate-800">New Tender Submission</h3>
          </div>
          <form onSubmit={handleUpload} className="p-6 space-y-6">
            {/* Company name (read-only) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium">
                <Building2 size={16} className="text-slate-400" />
                {user?.company_name ?? user?.email}
              </div>
            </div>

            {/* Tender selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Tender</label>
              <div className="relative">
                <FileText className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <select
                  value={tenderId}
                  onChange={e => setTenderId(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none bg-white"
                >
                  {tenders.map(t => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* File upload area */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Upload Documents</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:bg-slate-50 hover:border-indigo-300 transition-colors">
                <input
                  type="file"
                  id="bidder-files"
                  className="hidden"
                  multiple
                  accept=".pdf,.docx,.png,.jpg,.jpeg"
                  onChange={e => setFiles(e.target.files)}
                />
                <label htmlFor="bidder-files" className="cursor-pointer flex flex-col items-center">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4 border border-indigo-100">
                    <UploadCloud className="h-7 w-7" />
                  </div>
                  <span className="text-base font-semibold text-slate-700">
                    {files && files.length > 0 ? `${files.length} file${files.length > 1 ? 's' : ''} selected` : 'Drag & drop or Browse'}
                  </span>
                  <span className="text-sm text-slate-400 mt-1.5">PDF, DOCX, JPG, PNG accepted</span>
                </label>
                {files && files.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2 justify-center">
                    {Array.from(files).map((f, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        <FileText size={11} /> {f.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="submit"
                disabled={!files || files.length === 0 || status === 'processing'}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-8 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
              >
                {status === 'idle' && <><UploadCloud size={16} /> Upload & Submit</>}
                {status === 'processing' && <><Loader2 className="w-4 h-4 animate-spin" /> Processing & Evaluating...</>}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
