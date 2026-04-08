import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, ArrowRight } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const industries = [
  'Technology & Software',
  'Financial Services',
  'Healthcare & Pharma',
  'Manufacturing',
  'Retail & E-commerce',
  'Education',
  'Public Sector',
  'Other',
]

const sizes = [
  { value: 'micro', label: 'Micro (fewer than 10 employees)' },
  { value: 'small', label: 'Small (10 to 49 employees)' },
  { value: 'medium', label: 'Medium (50 to 249 employees)' },
  { value: 'large', label: 'Large (250+ employees)' },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [company, setCompany] = useState('')
  const [industry, setIndustry] = useState('')
  const [size, setSize] = useState('')

  return (
    <div className="py-12 px-4 sm:px-6">
      <ProgressBar current={1} />

      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-navy/10 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7 text-navy" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Tell us about your company</h1>
          <p className="text-slate-500">This helps us tailor the compliance assessment to your situation.</p>
        </div>

        <form
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6"
          onSubmit={(e) => { e.preventDefault(); navigate('/assessment') }}
        >
          {/* Company Name */}
          <div>
            <label htmlFor="company-name" className="block text-sm font-semibold text-slate-700 mb-2">
              Company Name
            </label>
            <input
              id="company-name"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. NovaTech Solutions"
              autoComplete="organization"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-sm"
            />
          </div>

          {/* Industry */}
          <div>
            <label htmlFor="industry" className="block text-sm font-semibold text-slate-700 mb-2">
              Industry
            </label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-sm bg-white"
            >
              <option value="">Select your industry</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Company Size */}
          <fieldset>
            <legend className="block text-sm font-semibold text-slate-700 mb-3">
              Number of Employees
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sizes.map((s) => (
                <label
                  key={s.value}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                    size === s.value
                      ? 'border-orange bg-orange/5 text-orange'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="company-size"
                    value={s.value}
                    checked={size === s.value}
                    onChange={(e) => setSize(e.target.value)}
                    className="accent-orange w-4 h-4"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate('/assessment')}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            Next Step
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
