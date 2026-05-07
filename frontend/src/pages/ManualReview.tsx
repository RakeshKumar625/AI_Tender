import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Check, X, AlertTriangle, Search, Filter } from 'lucide-react'

// Dummy data for MVP
const reviewCases = [
  {
    id: 1,
    bidderName: "SecureDef Pvt Ltd",
    tenderName: "Supply of Bulletproof Jackets",
    reason: "Low confidence extraction (45.0%) for Past Projects.",
    criteria: "Past Projects >= 3",
    extractedValue: "2",
    evidenceDoc: "Experience_Scanned.jpg",
    page: 1,
    snippet: "...has successfully completed \n 2 (?) projects in the defense sector...",
    status: "Open"
  }
]

export default function ManualReview() {
  const [cases, setCases] = useState(reviewCases)
  
  const handleResolve = (id: number, action: 'approve' | 'reject', newValue?: string) => {
    setCases(cases.filter(c => c.id !== id))
    // Call backend resolve endpoint in real app
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Manual Review Queue</h2>
          <p className="text-slate-500 mt-2">Human-in-the-loop verification for low confidence AI extractions or anomalies.</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Search cases..." className="pl-9 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium hover:bg-slate-50 text-slate-700">
            <Filter className="w-4 h-4 mr-2 text-slate-500" />
            Filter
          </button>
        </div>
      </div>

      {cases.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-200 bg-transparent shadow-none">
          <CardContent className="flex flex-col items-center justify-center h-64 text-slate-500">
            <Check className="w-12 h-12 mb-4 text-emerald-400" />
            <p className="text-lg font-medium text-slate-700">All caught up!</p>
            <p className="text-sm mt-1">There are no pending cases requiring manual review.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {cases.map(c => (
            <Card key={c.id} className="border-amber-200 shadow-md overflow-hidden">
              <div className="bg-amber-50 px-6 py-3 border-b border-amber-100 flex items-center">
                <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                <h3 className="font-semibold text-amber-900">Review Required: {c.bidderName}</h3>
                <span className="ml-auto text-xs font-medium bg-amber-100 text-amber-700 px-2 py-1 rounded">Case #{c.id}</span>
              </div>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 divide-x divide-slate-100">
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Issue Description</p>
                      <p className="text-sm text-slate-800 mt-1">{c.reason}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Criteria & Extraction</p>
                      <div className="mt-2 bg-slate-50 rounded-md p-3 border border-slate-100 font-mono text-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-500">Logic:</span>
                          <span className="text-slate-900 font-medium">{c.criteria}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Extracted:</span>
                          <span className="text-rose-600 font-bold bg-rose-100 px-1 rounded">{c.extractedValue}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Correct Value Override</label>
                      <input 
                        type="text" 
                        defaultValue={c.extractedValue}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm font-medium focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Officer Notes</label>
                      <textarea 
                        placeholder="Add justification for approval or rejection..."
                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Evidence Document</p>
                      <a href="#" className="text-xs text-blue-600 font-medium hover:underline">{c.evidenceDoc} (Pg {c.page})</a>
                    </div>
                    
                    {/* Simulated Document Viewer */}
                    <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-inner p-4 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-full bg-slate-200 flex items-center justify-center">
                        <div className="text-center p-6 max-w-sm">
                          <p className="text-xs text-slate-500 mb-2 font-mono">--- OCR Snippet ---</p>
                          <div className="bg-yellow-100/50 p-4 border border-yellow-300 rounded text-slate-800 font-serif text-sm whitespace-pre-wrap shadow-sm">
                            {c.snippet.split('2').map((part, i, arr) => 
                              i === arr.length - 1 ? part : <React.Fragment key={i}>{part}<span className="bg-yellow-300 font-bold px-1 rounded">2</span></React.Fragment>
                            )}
                          </div>
                          <button className="mt-4 text-xs font-medium text-blue-600 hover:underline">View Full Document</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-6">
                      <button 
                        onClick={() => handleResolve(c.id, 'approve')}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md transition-colors flex items-center justify-center shadow-sm"
                      >
                        <Check className="w-4 h-4 mr-2" /> Accept & Pass
                      </button>
                      <button 
                        onClick={() => handleResolve(c.id, 'reject')}
                        className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 rounded-md transition-colors flex items-center justify-center shadow-sm"
                      >
                        <X className="w-4 h-4 mr-2" /> Reject Bidder
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
