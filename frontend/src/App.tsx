import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminLayout, BidderLayout } from './components/Layouts'

// Auth Pages
import LoginSelection from './pages/auth/LoginSelection'
import AdminLogin from './pages/auth/AdminLogin'
import BidderLogin from './pages/auth/BidderLogin'
import BidderRegister from './pages/auth/BidderRegister'

// Admin Pages
import Dashboard from './pages/Dashboard'
import TenderUpload from './pages/TenderUpload'
import EvaluationDashboard from './pages/EvaluationDashboard'
import ManualReview from './pages/ManualReview'
import AuditTrail from './pages/AuditTrail'

// Bidder Pages
import BidderDashboard from './pages/bidder/BidderDashboard'
import BidderSubmit from './pages/bidder/BidderSubmit'
import BidderStatus from './pages/bidder/BidderStatus'
import BidderHistory from './pages/bidder/BidderHistory'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/auth/selection" replace />} />
          <Route path="/auth/selection" element={<LoginSelection />} />
          <Route path="/auth/admin/login" element={<AdminLogin />} />
          <Route path="/auth/bidder/login" element={<BidderLogin />} />
          <Route path="/auth/bidder/register" element={<BidderRegister />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tenders" element={<TenderUpload />} />
            <Route path="evaluation" element={<EvaluationDashboard />} />
            <Route path="review" element={<ManualReview />} />
            <Route path="audit" element={<AuditTrail />} />
          </Route>

          {/* Bidder Protected Routes */}
          <Route
            path="/bidder"
            element={
              <ProtectedRoute allowedRoles={['bidder']}>
                <BidderLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<BidderDashboard />} />
            <Route path="submit" element={<BidderSubmit />} />
            <Route path="status" element={<BidderStatus />} />
            <Route path="history" element={<BidderHistory />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/auth/selection" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
