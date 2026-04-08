import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const questions = [
  {
    id: 'q1',
    question: 'Does your system meet the definition of an "AI system" under the EU AI Act?',
    hint: 'A machine-based system that operates with some level of autonomy and generates outputs such as predictions, recommendations, or decisions from its inputs (Art. 3, Regulation EU 2024/1689).',
    options: [
      { value: 'yes', label: 'Yes, it meets the definition' },
      { value: 'no', label: 'No, it does not' },
      { value: 'unsure', label: 'I am not sure' },
    ],
  },
  {
    id: 'q2',
    question: 'What is your organisation\'s role regarding this AI system?',
    hint: 'Your role determines which obligations apply. Multiple roles are possible and obligations may overlap.',
    options: [
      { value: 'provider', label: 'Provider (develops or commissions AI for market placement)' },
      { value: 'deployer', label: 'Deployer (uses the AI system under own authority)' },
      { value: 'importer', label: 'Importer (places a third-country system on the EU market)' },
      { value: 'distributor', label: 'Distributor (makes the system available without modification)' },
    ],
  },
  {
    id: 'q3',
    question: 'Is your AI system made available or put into service within the EU?',
    hint: 'The AI Act applies when the system is placed on the EU market or its output is used within the EU.',
    options: [
      { value: 'yes', label: 'Yes, it is available or in service in the EU' },
      { value: 'output_eu', label: 'No, but its output is used within the EU' },
      { value: 'no', label: 'No, and its output is not used in the EU' },
    ],
  },
  {
    id: 'q4',
    question: 'Could your AI system be used for any of the following prohibited practices?',
    hint: 'Certain AI practices are banned outright under Article 5 of the AI Act, regardless of risk level.',
    options: [
      { value: 'manipulation', label: 'Manipulation or deception of persons' },
      { value: 'scoring', label: 'Social scoring by public authorities' },
      { value: 'biometric', label: 'Real-time biometric identification in public spaces' },
      { value: 'none', label: 'None of the above' },
    ],
  },
  {
    id: 'q5',
    question: 'Is your AI system used in any of these high-risk areas?',
    hint: 'Systems in Annex III areas are generally classified as high-risk and subject to strict requirements.',
    options: [
      { value: 'biometrics', label: 'Biometric identification or categorisation' },
      { value: 'critical', label: 'Critical infrastructure (energy, transport, water, digital)' },
      { value: 'education', label: 'Education and vocational training' },
      { value: 'employment', label: 'Employment, worker management, or recruitment' },
      { value: 'services', label: 'Access to essential services (credit scoring, insurance, benefits)' },
      { value: 'law', label: 'Law enforcement, migration, or administration of justice' },
      { value: 'none', label: 'None of the above' },
    ],
  },
  {
    id: 'q6',
    question: 'Does your system interact directly with people or generate synthetic content?',
    hint: 'Transparency obligations (Article 50) apply to certain AI systems regardless of their risk level.',
    options: [
      { value: 'interacts', label: 'Yes, it interacts with people (e.g. chatbot, virtual assistant)' },
      { value: 'synthetic', label: 'Yes, it generates synthetic text, audio, image, or video content' },
      { value: 'emotion', label: 'Yes, it recognises emotions or categorises people biometrically' },
      { value: 'none', label: 'None of the above' },
    ],
  },
]

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
      navigate('/risk-result', { state: { ...passedState, answers } })
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
            EU AI Act Compliance Check
          </h1>
          <p className="text-slate-500">
            Based on the official EU Commission assessment framework.
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
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer ${
              hasAnswer
                ? 'bg-orange hover:bg-orange-dark text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLast ? 'See Risk Result' : 'Next Question'}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Source attribution */}
        <p className="text-xs text-slate-400 text-center mt-8">
          Questions based on the EU AI Act Compliance Checker by the European Commission
          (Regulation EU 2024/1689) and the ALTAI self-assessment framework.
        </p>
      </div>
    </div>
  )
}
