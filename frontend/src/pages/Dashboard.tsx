import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CheckCircle2, XCircle, AlertCircle, FileText } from 'lucide-react'
import axios from 'axios'

const data = [
  { name: 'Tender 1', eligible: 4, rejected: 2, review: 1 },
  { name: 'Tender 2', eligible: 3, rejected: 1, review: 0 },
  { name: 'Tender 3', eligible: 2, rejected: 3, review: 2 },
];

export default function Dashboard() {
  // Hardcoded for demo if API fails
  const [stats, setStats] = useState({
    total_tenders: 3,
    total_bidders: 16,
    eligible: 9,
    not_eligible: 6,
    needs_review: 3
  });

  useEffect(() => {
    // In a real app, fetch from /api/report/dashboard
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
        <p className="text-slate-500 mt-2">Overview of procurement evaluation status.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Tenders" value={stats.total_tenders} icon={<FileText className="text-blue-500" />} />
        <StatCard title="Eligible Bidders" value={stats.eligible} icon={<CheckCircle2 className="text-emerald-500" />} />
        <StatCard title="Rejected Bidders" value={stats.not_eligible} icon={<XCircle className="text-rose-500" />} />
        <StatCard title="Manual Review" value={stats.needs_review} icon={<AlertCircle className="text-amber-500" />} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Evaluation Outcomes by Tender</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="eligible" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="review" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="rejected" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Tender 'Supply of Bulletproof Jackets' processed.", time: "2 mins ago", type: 'info' },
                { title: "Bidder 'SecureDef Pvt Ltd' marked for Manual Review.", time: "1 hour ago", type: 'warning' },
                { title: "Bidder 'Alpha Tactical' evaluated as Eligible.", time: "3 hours ago", type: 'success' },
                { title: "Tender 'Vehicle Procurement' criteria extracted.", time: "5 hours ago", type: 'info' },
              ].map((act, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className={`mt-0.5 rounded-full p-1 ${
                    act.type === 'info' ? 'bg-blue-100 text-blue-600' :
                    act.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {act.type === 'info' ? <FileText size={14} /> :
                     act.type === 'warning' ? <AlertCircle size={14} /> :
                     <CheckCircle2 size={14} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{act.title}</p>
                    <p className="text-xs text-slate-500">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) {
  return (
    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}
