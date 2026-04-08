import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Assessment from './pages/Assessment'
import Questionnaire from './pages/Questionnaire'
import RiskResult from './pages/RiskResult'
import Obligations from './pages/Obligations'
import ActionPlan from './pages/ActionPlan'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/risk-result" element={<RiskResult />} />
          <Route path="/obligations" element={<Obligations />} />
          <Route path="/action-plan" element={<ActionPlan />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
