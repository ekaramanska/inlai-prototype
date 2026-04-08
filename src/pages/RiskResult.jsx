import { useNavigate, useLocation } from 'react-router-dom'
import { AlertTriangle, CheckCircle2, Info, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const riskData = {
  minimal: {
    label: 'Minimal Risk',
    index: 0,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    icon: CheckCircle2,
    description: 'Your AI system has been classified as Minimal Risk under the EU AI Act. No specific compliance obligations are required, but voluntary codes of conduct are encouraged.',
    reasons: [
      'System does not interact directly with individuals in sensitive contexts',
      'No profiling or automated decision-making affecting rights',
      'Low potential for harm to health, safety, or fundamental rights',
      'Does not fall under any Annex III high-risk category',
    ],
  },
  limited: {
    label: 'Limited Risk',
    index: 1,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    icon: ShieldCheck,
    description: 'Your AI system has been classified as Limited Risk under the EU AI Act. Transparency obligations apply: users must be informed they are interacting with an AI system.',
    reasons: [
      'System interacts directly with individuals (e.g. chatbot or virtual assistant)',
      'Generates or manipulates content that users may perceive as human-made',
      'Transparency requirements apply under Article 52 of the AI Act',
      'No high-risk classification, but disclosure to users is mandatory',
    ],
  },
  high: {
    label: 'High Risk',
    index: 2,
    color: 'text-orange',
    bg: 'bg-orange/10',
    icon: AlertTriangle,
    description: 'Your AI system has been classified as High Risk under the EU AI Act. This means specific compliance obligations apply to your organization.',
    reasons: [
      'System makes decisions affecting natural persons\u2019 access to essential services',
      'Involves profiling of individuals based on personal data',
      'Outputs may have significant impact on rights and safety',
      'Falls under Annex III of the EU AI Act, classified as high-risk category',
    ],
  },
}

const levels = ['Minimal', 'Limited', 'High', 'Unacceptable']
const levelColors = ['bg-green-300', 'bg-yellow-300', 'bg-orange', 'bg-red-400']

export default function RiskResult() {
  const navigate = useNavigate()
  const location = useLocation()
  const riskKey = location.state?.risk || 'high'
  const data = riskData[riskKey]
  const Icon = data.icon

  return (
    <div className="py-12 px-4 sm:px-6">
      <ProgressBar current={4} />

      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-8">
          Risk Classification Result
        </h1>

        {/* Risk gauge */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 mb-8">
          <div className="mb-8">
            <div className="flex justify-center gap-1 mb-4">
              {levels.map((level, i) => (
                <div
                  key={level}
                  className={`h-3 flex-1 max-w-20 rounded-full ${levelColors[i]} ${
                    i === data.index ? 'ring-2 ring-offset-1 ring-current' : ''
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-center gap-1">
              {levels.map((level, i) => (
                <span
                  key={level}
                  className={`text-xs flex-1 max-w-20 ${
                    i === data.index ? `${data.color} font-bold` : 'text-slate-400'
                  }`}
                >
                  {level}
                </span>
              ))}
            </div>
          </div>

          <div className={`inline-flex items-center gap-3 ${data.bg} rounded-2xl px-8 py-5 mb-6`}>
            <Icon className={`w-10 h-10 ${data.color}`} />
            <div className="text-left">
              <div className={`text-2xl font-bold ${data.color}`}>{data.label}</div>
              <div className="text-sm text-slate-600">EU AI Act Classification</div>
            </div>
          </div>

          <p className="text-slate-600 max-w-lg mx-auto mb-8">
            {data.description}
          </p>

          <div className="bg-slate-50 rounded-xl p-6 text-left">
            <div className="flex items-center gap-2 text-navy font-semibold mb-4">
              <Info className="w-5 h-5" />
              Why this classification?
            </div>
            <ul className="space-y-3">
              {data.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className={`w-5 h-5 rounded-full ${data.bg} ${data.color} flex items-center justify-center shrink-0 text-xs font-bold mt-0.5`}>
                    {i + 1}
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate('/questionnaire')}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-navy px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={() => navigate('/obligations', { state: { risk: riskKey } })}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            View Your Obligations
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
