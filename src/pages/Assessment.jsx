import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, Users, CreditCard, Eye, Stethoscope, ArrowRight, ArrowLeft } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const systems = [
  { id: 'chatbot', icon: MessageSquare, name: 'Customer Service Chatbot', desc: 'Automated customer support using NLP', risk: 'limited' },
  { id: 'hr', icon: Users, name: 'HR Screening Tool', desc: 'AI-assisted candidate evaluation and filtering', risk: 'high' },
  { id: 'credit', icon: CreditCard, name: 'Credit Scoring System', desc: 'Automated creditworthiness assessment', risk: 'high' },
  { id: 'moderation', icon: Eye, name: 'Content Moderation', desc: 'Automated detection of harmful content', risk: 'minimal' },
  { id: 'medical', icon: Stethoscope, name: 'Medical Diagnosis Support', desc: 'AI-assisted clinical decision-making', risk: 'high' },
]

const riskOrder = ['minimal', 'limited', 'high']

export default function Assessment() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleNext = () => {
    const selectedSystems = systems.filter((s) => selected.includes(s.id))
    const highestRisk = selectedSystems.reduce((max, s) => {
      return riskOrder.indexOf(s.risk) > riskOrder.indexOf(max) ? s.risk : max
    }, 'minimal')
    navigate('/risk-result', { state: { risk: highestRisk, selected } })
  }

  return (
    <div className="py-12 px-4 sm:px-6">
      <ProgressBar current={2} />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
            Which AI systems do you use?
          </h1>
          <p className="text-slate-500">
            Select all AI systems you want to assess for EU AI Act compliance.
          </p>
        </div>

        <fieldset>
          <legend className="sr-only">AI systems used by your organisation</legend>
          <div className="space-y-3">
            {systems.map((sys) => {
              const checked = selected.includes(sys.id)
              return (
                <label
                  key={sys.id}
                  className={`w-full flex items-center gap-4 p-5 rounded-xl border text-left transition-all cursor-pointer ${
                    checked
                      ? 'border-orange bg-orange/5 shadow-md shadow-orange/10'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    name="ai-systems"
                    value={sys.id}
                    checked={checked}
                    onChange={() => toggle(sys.id)}
                    className="accent-orange w-5 h-5 shrink-0"
                  />
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      checked ? 'bg-orange text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                    aria-hidden="true"
                  >
                    <sys.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`font-semibold ${checked ? 'text-navy' : 'text-slate-700'}`}>
                      {sys.name}
                    </div>
                    <div className="text-sm text-slate-500">{sys.desc}</div>
                  </div>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate('/onboarding')}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-navy px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            Analyze Risk
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
