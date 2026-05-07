import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { CheckCircle2, XCircle, AlertCircle, FileText, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'

// Dummy data for MVP
const bidders = [
  {
    id: 1,
    name: "Alpha Tactical Pvt Ltd",
    status: "Eligible",
    evaluations: [
      { criteria: "Minimum Turnover >= 50000000", extracted: "65000000", conf: 0.98, status: "PASS", doc: "Financials.pdf", page: 12, reason: "Extracted 65000000 meets requirement >= 50000000" },
      { criteria: "Past Projects >= 3", extracted: "5", conf: 0.92, status: "PASS", doc: "Experience.pdf", page: 4, reason: "Extracted 5 meets requirement >= 3" },
      { criteria: "GST Registration == True", extracted: "True", conf: 0.99, status: "PASS", doc: "GST.pdf", page: 1, reason: "Found required certification." }
    ]
  },
  {
    id: 2,
    name: "SecureDef Pvt Ltd (Review)",
    status: "Needs Manual Review",
    evaluations: [
      { criteria: "Minimum Turnover >= 50000000", extracted: "52000000", conf: 0.94, status: "PASS", doc: "Financials.pdf", page: 8, reason: "Extracted 52000000 meets requirement >= 50000000" },
      { criteria: "Past Projects >= 3", extracted: "2", conf: 0.45, status: "REVIEW", doc: "Experience_Scanned.jpg", page: 1, reason: "Low confidence extraction (45.0%). Needs manual check." },
      { criteria: "GST Registration == True", extracted: "True", conf: 0.98, status: "PASS", doc: "GST.pdf", page: 1, reason: "Found required certification." }
    ]
  },
  {
    id: 3,
    name: "Omega Supply (Fail)",
    status: "Not Eligible",
    evaluations: [
      { criteria: "Minimum Turnover >= 50000000", extracted: "40000000", conf: 0.97, status: "FAIL", doc: "Audit2022.pdf", page: 14, reason: "Extracted 40000000 does NOT meet requirement >= 50000000" },
      { criteria: "Past Projects >= 3", extracted: "4", conf: 0.96, status: "PASS", doc: "Projects.pdf", page: 2, reason: "Extracted 4 meets requirement >= 3" },
      { criteria: "GST Registration == True", extracted: "True", conf: 0.99, status: "PASS", doc: "GST.pdf", page: 1, reason: "Found required certification." }
    ]
  }
]

export default function EvaluationDashboard() {
  const [expanded, setExpanded] = useState<number | null>(1)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Explainable Evaluation Dashboard</h2>
        <p className="text-slate-500 mt-2">Detailed breakdown of AI evaluations, evidence mapping, and confidence scores.</p>
      </div>

      <div className="space-y-4">
        {bidders.map((b) => (
          <Card key={b.id} className={`border-l-4 transition-all ${
            b.status === 'Eligible' ? 'border-l-emerald-500' : 
            b.status === 'Not Eligible' ? 'border-l-rose-500' : 'border-l-amber-500'
          }`}>
            <div 
              className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50"
              onClick={() => setExpanded(expanded === b.id ? null : b.id)}
            >
              <div className="flex items-center space-x-4">
                {expanded === b.id ? <ChevronDown className="text-slate-400" /> : <ChevronRight className="text-slate-400" />}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{b.name}</h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <Badge status={b.status} />
                    <span className="text-xs text-slate-500">Tender: Supply of Bulletproof Jackets</span>
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-slate-600">
                {b.evaluations.filter(e => e.status === 'PASS').length} / {b.evaluations.length} Passed
              </div>
            </div>

            {expanded === b.id && (
              <div className="border-t border-slate-100 bg-slate-50/50 p-6">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-100/50 text-slate-600 font-medium">
                      <tr>
                        <th className="px-4 py-3">Criteria Checked</th>
                        <th className="px-4 py-3">Extracted Value</th>
                        <th className="px-4 py-3">Confidence</th>
                        <th className="px-4 py-3">Evidence Source</th>
                        <th className="px-4 py-3">Verdict</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {b.evaluations.map((ev, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-4 max-w-xs">
                            <p className="font-medium text-slate-800">{ev.criteria}</p>
                            <p className="text-xs text-slate-500 mt-1">{ev.reason}</p>
                          </td>
                          <td className="px-4 py-4 font-mono text-sm">{ev.extracted}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <div className="w-16 h-2 bg-slate-100 rounded-full mr-2 overflow-hidden">
                                <div 
                                  className={`h-full ${ev.conf > 0.8 ? 'bg-emerald-500' : ev.conf > 0.6 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                                  style={{width: `${ev.conf * 100}%`}}
                                ></div>
                              </div>
                              <span className="text-xs font-medium text-slate-600">{(ev.conf * 100).toFixed(0)}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <button className="flex items-center text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium group">
                              <FileText className="w-3.5 h-3.5 mr-1 group-hover:scale-110 transition-transform" />
                              {ev.doc} (Pg. {ev.page})
                              <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <StatusIcon status={ev.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

function Badge({ status }: { status: string }) {
  if (status === 'Eligible') return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">Eligible</span>
  if (status === 'Not Eligible') return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700 border border-rose-200">Not Eligible</span>
  return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">Needs Review</span>
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'PASS') return <div className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit"><CheckCircle2 className="w-4 h-4 mr-1" /><span className="text-xs font-bold tracking-wide">PASS</span></div>
  if (status === 'FAIL') return <div className="flex items-center text-rose-600 bg-rose-50 px-2 py-1 rounded-md w-fit"><XCircle className="w-4 h-4 mr-1" /><span className="text-xs font-bold tracking-wide">FAIL</span></div>
  return <div className="flex items-center text-amber-600 bg-amber-50 px-2 py-1 rounded-md w-fit"><AlertCircle className="w-4 h-4 mr-1" /><span className="text-xs font-bold tracking-wide">REVIEW</span></div>
}
