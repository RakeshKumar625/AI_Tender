import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Download, Search, History } from 'lucide-react'

// Dummy data for MVP
const logs = [
  { id: 101, action: "Manual Review: APPROVE", user: "Officer JD", timestamp: "2026-05-04 10:15:22", details: "Case 1 resolved for Bidder 2. Notes: Verified physically." },
  { id: 100, action: "Evaluation", user: "System", timestamp: "2026-05-04 09:30:10", details: "Evaluated bidder 3, result: Not Eligible" },
  { id: 99, action: "Bidder Extraction", user: "System", timestamp: "2026-05-04 09:29:45", details: "Extracted evidence for bidder 3" },
  { id: 98, action: "Tender Extraction", user: "System", timestamp: "2026-05-04 08:00:00", details: "Extracted 4 criteria for tender 1" },
]

export default function AuditTrail() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">System Audit Trail</h2>
          <p className="text-slate-500 mt-2">Immutable log of all automated decisions and human interventions.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-sm font-medium transition-colors shadow-sm">
          <Download className="w-4 h-4 mr-2" />
          Export Report (.csv)
        </button>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center text-sm font-medium text-slate-700">
            <History className="w-5 h-5 mr-2 text-slate-500" />
            Action History
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Search logs..." className="pl-9 pr-4 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Timestamp</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                  <th className="px-6 py-4 font-semibold">User/System</th>
                  <th className="px-6 py-4 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-mono text-xs">{log.timestamp}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        log.user === 'System' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{log.user}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-md truncate" title={log.details}>
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
