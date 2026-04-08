import { useNavigate, useLocation } from 'react-router-dom'
import { AlertTriangle, CheckCircle2, Info, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const riskMeta = {
  minimal: {
    label: 'Minimal Risk',
    index: 0,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    icon: CheckCircle2,
    description: 'Based on your answers, your AI usage falls under Minimal Risk. No specific compliance obligations are required, but following voluntary codes of conduct is encouraged.',
  },
  limited: {
    label: 'Limited Risk',
    index: 1,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    icon: ShieldCheck,
    description: 'Based on your answers, your AI usage falls under Limited Risk. Transparency obligations apply: the people who interact with your AI system must be informed.',
  },
  high: {
    label: 'High Risk',
    index: 2,
    color: 'text-orange',
    bg: 'bg-orange/10',
    icon: AlertTriangle,
    description: 'Based on your answers, your AI usage falls under High Risk. Your organisation must meet specific compliance obligations before August 2026.',
  },
}

/*
 * Maps questionnaire answer values to human-readable risk factors.
 * Only answers that actually raise risk are shown as reasons.
 */
const answerReasons = {
  impact: {
    customer_facing: 'Your AI system is used in customer-facing interactions, triggering transparency requirements.',
    consequential: 'The AI system influences decisions that directly affect people, a key high-risk indicator under Annex III.',
  },
  personal_data: {
    basic: 'The system processes personal data, which requires appropriate data governance measures.',
    sensitive: 'Sensitive personal data (health, financial, biometric) is processed, significantly raising the risk classification.',
  },
  domain: {
    regulated_light: 'Your sector (education, customer service, or content moderation) may trigger additional transparency obligations.',
    regulated_heavy: 'Your sector is listed in Annex III of the EU AI Act as a high-risk application area.',
  },
  autonomy: {
    assisted: 'Staff usually follow AI recommendations without independent verification, reducing human oversight.',
    automated: 'The AI operates with minimal human review, which requires robust oversight mechanisms under the AI Act.',
  },
  transparency: {
    partial: 'Affected individuals are not always informed about AI involvement, which may conflict with Article 50 requirements.',
    no: 'People affected by the AI system are not informed they are interacting with AI, a direct transparency violation.',
  },
}

/* Fallback reasons when the questionnaire was skipped (direct URL access). */
const fallbackReasons = {
  minimal: [
    'AI is used for internal operations with no direct impact on individuals.',
    'No sensitive personal data is processed by the system.',
    'A human always reviews and approves AI-generated outputs.',
    'The system does not fall under any Annex III high-risk category.',
  ],
  limited: [
    'The AI system interacts with customers or generates content they see.',
    'Transparency obligations apply under Article 50 of the AI Act.',
    'Basic personal data is processed by the system.',
    'Human oversight is present but could be strengthened.',
  ],
  high: [
    'The AI system influences consequential decisions affecting individuals.',
    'Sensitive personal data is processed by the system.',
    'Your sector falls under Annex III high-risk application areas.',
    'The system operates with limited human oversight.',
  ],
}

function buildReasons(answers, riskKey) {
  if (!answers || Object.keys(answers).length === 0) {
    return fallbackReasons[riskKey]
  }
  const reasons = []
  for (const [qId, value] of Object.entries(answers)) {
    const map = answerReasons[qId]
    if (map && map[value]) {
      reasons.push(map[value])
    }
  }
  if (reasons.length === 0) {
    return fallbackReasons[riskKey]
  }
  return reasons
}

const levels = ['Minimal', 'Limited', 'High', 'Unacceptable']
const levelColors = ['bg-green-300', 'bg-yellow-300', 'bg-orange', 'bg-red-400']

export default function RiskResult() {
  const navigate = useNavigate()
  const location = useLocation()
  const riskKey = location.state?.risk || 'high'
  const answers = location.state?.answers || {}
  const data = riskMeta[riskKey]
  const Icon = data.icon
  const reasons = buildReasons(answers, riskKey)

  return (
    <div className="py-12 px-4 sm:px-6">
      <ProgressBar current={4} />

      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-8">
          Risk Classification Result
        </h1>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 mb-8">
          {/* Risk gauge */}
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

          {/* Result badge */}
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

          {/* Reasons derived from answers */}
          <div className="bg-slate-50 rounded-xl p-6 text-left">
            <div className="flex items-center gap-2 text-navy font-semibold mb-4">
              <Info className="w-5 h-5" />
              Key factors from your assessment
            </div>
            <ul className="space-y-3">
              {reasons.map((r, i) => (
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
