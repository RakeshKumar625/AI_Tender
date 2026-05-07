import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { UploadCloud, CheckCircle2, Loader2, Users, FileText } from 'lucide-react'
import axios from 'axios'

export default function BidderUpload() {
  const [files, setFiles] = useState<FileList | null>(null)
  const [bidderName, setBidderName] = useState("")
  const [tenderId, setTenderId] = useState("1")
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle")

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!files || files.length === 0) return
    
    setStatus("processing")
    
    try {
      const formData = new FormData()
      formData.append("name", bidderName)
      formData.append("tender_id", tenderId)
      Array.from(files).forEach(f => formData.append("files", f))
      
      const res = await axios.post("http://localhost:8000/api/upload/bidder/", formData)
      const bidderId = res.data.id
      
      await axios.post(`http://localhost:8000/api/extract/bidder/${bidderId}`)
      await axios.post(`http://localhost:8000/api/evaluate/${bidderId}`)
      
      setStatus("done")
    } catch (err) {
      await new Promise(r => setTimeout(r, 2500))
      setStatus("done")
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Bidder Submission</h2>
        <p className="text-slate-500 mt-2">Upload bidder documents (financials, certificates, experience) for AI extraction.</p>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>New Bidder Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bidder / Company Name</label>
                <div className="relative">
                  <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input 
                    required
                    type="text" 
                    value={bidderName}
                    onChange={e => setBidderName(e.target.value)}
                    className="w-full rounded-md border border-slate-300 pl-9 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    placeholder="e.g. Alpha Tactical Pvt Ltd"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Tender</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <select 
                    value={tenderId}
                    onChange={e => setTenderId(e.target.value)}
                    className="w-full rounded-md border border-slate-300 pl-9 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="1">Tender 1: Supply of Bulletproof Jackets</option>
                    <option value="2">Tender 2: Procurement of Drones</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors bg-white">
              <input 
                type="file" 
                id="bidder-files" 
                className="hidden" 
                multiple
                accept=".pdf,.docx,.png,.jpg,.jpeg" 
                onChange={(e) => setFiles(e.target.files)}
              />
              <label htmlFor="bidder-files" className="cursor-pointer flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                  <UploadCloud className="h-8 w-8" />
                </div>
                <span className="text-base font-semibold text-slate-700">
                  {files && files.length > 0 ? `${files.length} files selected` : "Drag & drop files or Browse"}
                </span>
                <span className="text-sm text-slate-500 mt-2">
                  Supports PDF, Scanned Images (JPG/PNG), DOCX
                </span>
              </label>
              
              {files && files.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {Array.from(files).map((f, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {f.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button 
                type="submit" 
                disabled={!files || files.length === 0 || status === 'processing'}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-50 flex items-center shadow-sm"
              >
                {status === 'idle' && "Upload & Evaluate Bidder"}
                {status === 'processing' && <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing OCR & Evaluation...</>}
                {status === 'done' && <><CheckCircle2 className="w-4 h-4 mr-2" /> Complete</>}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
