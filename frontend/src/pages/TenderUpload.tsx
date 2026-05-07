import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { UploadCloud, File, CheckCircle2, Loader2 } from 'lucide-react'
import axios from 'axios'

export default function TenderUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [status, setStatus] = useState<"idle" | "uploading" | "extracting" | "done">("idle")
  const [criteria, setCriteria] = useState<any[]>([])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    
    setStatus("uploading")
    // Simulate upload delay
    await new Promise(r => setTimeout(r, 1000))
    
    setStatus("extracting")
    // Simulate extraction API call
    try {
      // For MVP demo, directly hit the local backend if running, otherwise use dummy
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", desc)
      formData.append("file", file)
      
      const res = await axios.post("http://localhost:8000/api/upload/tender/", formData)
      const tenderId = res.data.id
      
      const extRes = await axios.post(`http://localhost:8000/api/extract/tender/${tenderId}`)
      setCriteria(extRes.data)
      setStatus("done")
    } catch (err) {
      // Fallback dummy data if backend is not up
      await new Promise(r => setTimeout(r, 2000))
      setCriteria([
        { name: "Minimum Turnover", type: "financial", condition: ">=", value: "50000000", is_mandatory: true },
        { name: "Past Projects", type: "experience", condition: ">=", value: "3", is_mandatory: true },
        { name: "ISO Certification", type: "certification", condition: "==", value: "True", is_mandatory: false },
        { name: "GST Registration", type: "compliance", condition: "==", value: "True", is_mandatory: true },
      ])
      setStatus("done")
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Tender Upload & Extraction</h2>
        <p className="text-slate-500 mt-2">Upload procurement document to extract structured eligibility criteria.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-slate-200">
          <CardHeader>
            <CardTitle>Upload Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tender Title</label>
                <input 
                  required
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                  placeholder="e.g. Procurement of Vehicles"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[80px]" 
                  placeholder="Optional details..."
                />
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors">
                <input 
                  type="file" 
                  id="file-upload" 
                  className="hidden" 
                  accept=".pdf,.docx" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <UploadCloud className="h-10 w-10 text-slate-400 mb-2" />
                  <span className="text-sm font-medium text-slate-600">
                    {file ? file.name : "Click to select tender document (PDF/DOCX)"}
                  </span>
                  <span className="text-xs text-slate-500 mt-1">Max size 50MB</span>
                </label>
              </div>
              <button 
                type="submit" 
                disabled={!file || status === 'uploading' || status === 'extracting'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {status === 'idle' && "Extract Criteria"}
                {status === 'uploading' && <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</>}
                {status === 'extracting' && <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> AI Extracting...</>}
                {status === 'done' && <><CheckCircle2 className="w-4 h-4 mr-2" /> Extracted</>}
              </button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-slate-200">
          <CardHeader>
            <CardTitle>Extracted Procurement Logic</CardTitle>
          </CardHeader>
          <CardContent>
            {status === 'idle' || status === 'uploading' ? (
              <div className="h-[300px] flex flex-col items-center justify-center text-slate-400">
                <File className="w-12 h-12 mb-3 opacity-20" />
                <p>Upload a document to see extracted criteria</p>
              </div>
            ) : status === 'extracting' ? (
              <div className="h-[300px] flex flex-col items-center justify-center text-blue-500 space-y-4">
                <Loader2 className="w-10 h-10 animate-spin" />
                <div className="text-center">
                  <p className="font-medium text-slate-700">Running NLP Pipeline...</p>
                  <p className="text-sm text-slate-500 mt-1">Extracting financial and technical conditions</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Criteria Name</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Logic</th>
                      <th className="px-4 py-3">Mandatory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criteria.map((c, idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-medium text-slate-800">{c.name}</td>
                        <td className="px-4 py-3">
                          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium uppercase tracking-wider">
                            {c.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs bg-slate-50 rounded">
                          {c.type} {c.condition} {c.value}
                        </td>
                        <td className="px-4 py-3">
                          {c.is_mandatory ? (
                            <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-medium">Yes</span>
                          ) : (
                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium">Optional</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
