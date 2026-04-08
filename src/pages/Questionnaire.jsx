import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

/*
 * Questions written from the perspective of a BUSINESS that USES AI tools,
 * not a company that builds them. Each answer carries a risk weight that
 * feeds into the final risk classification.
 *
 * weight: 0 = lowers risk, 1 = neutral/limited, 2 = raises risk significantly
 */
const questions = [
  {
    id: 'impact',
    question: 'What kind of decisions does the AI system help your company make?',
    hint: 'The EU AI Act classifies systems based on how their outputs affect people. The more consequential the decisions, the higher the risk level.',
    options: [
      { value: 'internal', label: 'Internal operations only (e.g. summarising documents, generating reports)', weight: 0 },
      { value: 'customer_facing', label: 'Customer-facing interactions (e.g. chatbot, product recommendations)', weight: 1 },
      { value: 'consequential', label: 'Decisions that directly affect people (e.g. hiring, loan approvals, medical advice)', weight: 2 },
    ],
  },
  {
    id: 'personal_data',
    question: 'Does the AI system process personal data about individuals?',
    hint: 'Systems that profile people or process sensitive personal data (health, finances, biometrics) face stricter requirements under the AI Act.',
    options: [
      { value: 'no', label: 'No, it only works with non-personal business data', weight: 0 },
      { value: 'basic', label: 'Yes, basic personal data (names, emails, purchase history)', weight: 1 },
      { value: 'sensitive', label: 'Yes, sensitive data (health records, financial profiles, biometrics)', weight: 2 },
    ],
  },
  {
    id: 'domain',
    question: 'In which area does your company use the AI system?',
    hint: 'The EU AI Act lists specific sectors in Annex III where AI use is considered high-risk regardless of other factors.',
    options: [
      { value: 'general', label: 'General business (marketing, analytics, content creation)', weight: 0 },
      { value: 'regulated_light', label: 'Education, customer service, or content moderation', weight: 1 },
      { value: 'regulated_heavy', label: 'Healthcare, finance, HR/recruitment, legal, or critical infrastructure', weight: 2 },
    ],
  },
  {
    id: 'autonomy',
    question: 'How much do your employees rely on the AI system\'s output?',
    hint: 'Systems where a human always reviews and approves the output carry lower risk than those that act autonomously.',
    options: [
      { value: 'advisory', label: 'As a suggestion only; a person always makes the final decision', weight: 0 },
      { value: 'assisted', label: 'The AI recommends actions that staff usually follow', weight: 1 },
      { value: 'automated', label: 'The AI makes or executes decisions with little or no human review', weight: 2 },
    ],
  },
  {
    id: 'transparency',
    question: 'Are the people affected by the AI system aware they are interacting with AI?',
    hint: 'Article 50 of the AI Act requires that people are informed when they interact with an AI system or consume AI-generated content.',
    options: [
      { value: 'yes', label: 'Yes, we clearly disclose AI use to all affected people', weight: 0 },
      { value: 'partial', label: 'Sometimes, but not in every case', weight: 1 },
      { value: 'no', label: 'No, people are generally not informed', weight: 2 },
    ],
  },
]

function computeRisk(answers) {
  let score = 0
  for (const q of questions) {
    const ans = answers[q.id]
    if (ans) {
      const opt = q.options.find((o) => o.value === ans)
      if (opt) score += opt.weight
    }
  }
  // 0-2 minimal, 3-5 limited, 6+ high
  if (score <= 2) return 'minimal'
  if (score <= 5) return 'limited'
  return 'high'
}

export default function Questionnaire() {
  const navigate = useNavigate()
  const location = useLocation()
  const passedState = location.state || {}
  const [answers, setAnswers] = useState({})
  const [currentQ, setCurrentQ] = useState(0)

  const q = questions[currentQ]
  const isLast = currentQ === questions.length - 1
  const isFirst = currentQ === 0
  const hasAnswer = !!answers[q.id]

  const handleSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [q.id]: value }))
  }

  const handleNext = () => {
    if (isLast) {
      const risk = computeRisk(answers)
      navigate('/risk-result', { state: { risk, answers } })
    } else {
      setCurrentQ((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (isFirst) {
      navigate('/assessment')
    } else {
      setCurrentQ((prev) => prev - 1)
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6">
      <ProgressBar current={3} />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
            Risk Assessment
          </h1>
          <p className="text-slate-500">
            Help us understand how your company uses AI so we can determine the right compliance level.
            Question {currentQ + 1} of {questions.length}.
          </p>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-semibold text-navy mb-3">
            {q.question}
          </h2>

          {q.hint && (
            <div className="flex items-start gap-2 bg-slate-50 rounded-lg p-4 mb-6">
              <HelpCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-slate-500">{q.hint}</p>
            </div>
          )}

          <fieldset>
            <legend className="sr-only">{q.question}</legend>
            <div className="space-y-3">
              {q.options.map((opt) => {
                const selected = answers[q.id] === opt.value
                return (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      selected
                        ? 'border-orange bg-orange/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt.value}
                      checked={selected}
                      onChange={() => handleSelect(opt.value)}
                      className="accent-orange w-4 h-4 shrink-0"
                    />
                    <span className={`text-sm font-medium ${selected ? 'text-navy' : 'text-slate-600'}`}>
                      {opt.label}
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        </div>

        {/* Question dots */}
        <div className="flex justify-center gap-2 mb-6" aria-hidden="true">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === currentQ
                  ? 'bg-orange'
                  : answers[questions[i].id]
                    ? 'bg-orange/30'
                    : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-navy px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-colors ${
              hasAnswer
                ? 'bg-orange hover:bg-orange-dark text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLast ? 'See Risk Result' : 'Next Question'}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <p className="text-xs text-slate-400 text-center mt-8">
          Assessment criteria based on the EU AI Act (Regulation EU 2024/1689),
          Annex III high-risk categories, and Article 50 transparency requirements.
        </p>
      </div>
    </div>
  )
}
