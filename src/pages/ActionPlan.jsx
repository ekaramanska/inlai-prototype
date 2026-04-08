import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Download, CheckCircle2, Circle, FileText, Settings, TestTube, Award } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const phases = [
  {
    icon: FileText,
    phase: 'Phase 1',
    title: 'Documentation',
    timeline: 'Weeks 1 to4',
    color: 'bg-blue-500',
    tasks: [
      'Prepare technical documentation for the AI system',
      'Draft data governance policy and data quality report',
      'Document intended purpose and known limitations',
    ],
  },
  {
    icon: Settings,
    phase: 'Phase 2',
    title: 'Implementation',
    timeline: 'Weeks 5 to8',
    color: 'bg-orange',
    tasks: [
      'Set up continuous risk management framework',
      'Implement automatic event logging system',
      'Design and integrate human oversight mechanisms',
    ],
  },
  {
    icon: TestTube,
    phase: 'Phase 3',
    title: 'Testing & Validation',
    timeline: 'Weeks 9 to12',
    color: 'bg-emerald-500',
    tasks: [
      'Conduct accuracy and robustness testing',
      'Perform bias and fairness assessment',
      'Validate cybersecurity resilience measures',
    ],
  },
  {
    icon: Award,
    phase: 'Phase 4',
    title: 'Certification',
    timeline: 'Weeks 13 to16',
    color: 'bg-purple-500',
    tasks: [
      'Complete conformity assessment procedure',
      'Register in the EU AI database',
      'Prepare CE marking documentation',
    ],
  },
]

export default function ActionPlan() {
  const navigate = useNavigate()
  const [showToast, setShowToast] = useState(false)

  const handleDownload = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="py-12 px-4 sm:px-6">
      <ProgressBar current={5} />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
            Your Compliance Action Plan
          </h1>
          <p className="text-slate-500">
            A step-by-step roadmap to achieve full EU AI Act compliance.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 hidden sm:block" />

          <div className="space-y-6">
            {phases.map((p, i) => (
              <div key={i} className="relative flex gap-6">
                {/* Timeline dot */}
                <div className={`w-12 h-12 rounded-full ${p.color} text-white flex items-center justify-center shrink-0 z-10 hidden sm:flex`}>
                  <p.icon className="w-6 h-6" />
                </div>

                {/* Card */}
                <div className="flex-1 bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className={`text-xs font-bold text-white px-2.5 py-1 rounded-full ${p.color}`}>
                      {p.phase}
                    </span>
                    <span className="text-xs text-slate-400">{p.timeline}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-3">{p.title}</h3>
                  <ul className="space-y-2">
                    {p.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                        <Circle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download */}
        <div className="mt-8 text-center">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 border-2 border-navy text-navy hover:bg-navy hover:text-white px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer"
          >
            <Download className="w-5 h-5" />
            Download Full Report
          </button>
        </div>

        {/* Toast */}
        {showToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-[fadeIn_0.3s]">
            <CheckCircle2 className="w-5 h-5 text-orange" />
            <span className="text-sm font-medium">Report download available in the full version</span>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate('/obligations')}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-navy px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
