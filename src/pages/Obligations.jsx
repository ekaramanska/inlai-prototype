import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, FileText, Database, BookOpen, ClipboardList, Users, Target, Award, ArrowRight, ArrowLeft, FileDown, X, CheckCircle2 } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const obligations = [
  {
    icon: ShieldCheck,
    title: 'Risk Management Policy',
    desc: 'A continuous risk management process throughout the AI system lifecycle.',
    priority: 'Critical',
    docType: 'Policy Document',
    templateSections: [
      'Risk identification and analysis methodology',
      'Risk evaluation criteria and thresholds',
      'Risk mitigation measures and controls',
      'Monitoring and review schedule',
      'Roles and responsibilities',
    ],
  },
  {
    icon: Database,
    title: 'Data Governance Framework',
    desc: 'Ensure datasets meet quality criteria, are representative, and free from bias.',
    priority: 'Critical',
    docType: 'Framework Document',
    templateSections: [
      'Data collection and sourcing policies',
      'Data quality metrics and validation rules',
      'Bias detection and mitigation procedures',
      'Data retention and deletion schedule',
      'Data processing impact assessment',
    ],
  },
  {
    icon: FileText,
    title: 'Technical Documentation',
    desc: 'Comprehensive documentation demonstrating compliance with all requirements.',
    priority: 'High',
    docType: 'Technical Report',
    templateSections: [
      'System description and intended purpose',
      'Architecture and design specifications',
      'Training data and model information',
      'Performance metrics and benchmarks',
      'Known limitations and risks',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Event Logging Protocol',
    desc: 'Automatic logging of events throughout the AI system operation period.',
    priority: 'High',
    docType: 'Protocol Document',
    templateSections: [
      'Events to be logged (inputs, outputs, decisions)',
      'Log format and storage requirements',
      'Retention period and access controls',
      'Anomaly detection and alerting rules',
      'Audit trail and review procedures',
    ],
  },
  {
    icon: BookOpen,
    title: 'Transparency Notice',
    desc: 'Clear information about the AI system capabilities, limitations, and intended use.',
    priority: 'High',
    docType: 'Disclosure Document',
    templateSections: [
      'Plain-language system description',
      'How the AI system is used in decisions',
      'What data is collected and processed',
      'How to request human review of a decision',
      'Contact information for complaints',
    ],
  },
  {
    icon: Users,
    title: 'Human Oversight Plan',
    desc: 'Procedures for effective human oversight during the AI system period of use.',
    priority: 'Medium',
    docType: 'Operational Plan',
    templateSections: [
      'Oversight roles and required qualifications',
      'Decision escalation criteria',
      'Override and intervention procedures',
      'Training programme for oversight staff',
      'Performance review and feedback loops',
    ],
  },
  {
    icon: Target,
    title: 'Accuracy and Robustness Report',
    desc: 'Testing results for accuracy, robustness, and cybersecurity resilience.',
    priority: 'Medium',
    docType: 'Test Report',
    templateSections: [
      'Accuracy metrics and test methodology',
      'Robustness testing under edge cases',
      'Cybersecurity vulnerability assessment',
      'Bias and fairness evaluation results',
      'Remediation actions for identified issues',
    ],
  },
  {
    icon: Award,
    title: 'Conformity Assessment Record',
    desc: 'Evidence that all requirements are met before placing the system on the market.',
    priority: 'Medium',
    docType: 'Compliance Record',
    templateSections: [
      'Self-assessment checklist (all articles)',
      'Evidence of compliance per requirement',
      'Third-party audit findings (if applicable)',
      'EU database registration details',
      'CE marking declaration',
    ],
  },
]

const priorityColors = {
  Critical: 'bg-red-100 text-red-700',
  High: 'bg-orange/10 text-orange',
  Medium: 'bg-blue-100 text-blue-700',
}

function TemplatePreview({ obligation, onClose }) {
  const [showToast, setShowToast] = useState(false)

  const handleDownload = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-5 flex items-start justify-between rounded-t-2xl">
          <div>
            <span className="text-xs font-medium text-orange uppercase tracking-wide">
              {obligation.docType}
            </span>
            <h2 className="text-lg font-bold text-navy mt-1">{obligation.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close preview"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          <p className="text-sm text-slate-500">{obligation.desc}</p>

          {/* Mock document preview */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Template sections
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              This template is pre-filled based on your company profile and risk assessment answers.
            </p>
            <ol className="space-y-3">
              {obligation.templateSections.map((section, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-md bg-navy/10 text-navy flex items-center justify-center shrink-0 text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-sm font-medium text-slate-700">{section}</span>
                    <div className="mt-1 h-2 bg-slate-200 rounded-full w-3/4" aria-hidden="true" />
                    <div className="mt-1 h-2 bg-slate-200 rounded-full w-1/2" aria-hidden="true" />
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-navy/5 rounded-lg p-4">
            <p className="text-xs text-slate-500">
              <strong className="text-navy">INLAi full version:</strong> This template will be auto-populated with your company details, regulatory references, and guidance notes tailored to your specific AI system.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-5 flex gap-3 rounded-b-2xl">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white px-5 py-3 rounded-xl font-semibold transition-colors cursor-pointer text-sm"
          >
            <FileDown className="w-4 h-4" aria-hidden="true" />
            Download Template
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-colors cursor-pointer text-sm"
          >
            Close
          </button>
        </div>

        {showToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 z-[60]">
            <CheckCircle2 className="w-5 h-5 text-orange" />
            <span className="text-sm font-medium">Template downloads available in the full version</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Obligations() {
  const navigate = useNavigate()
  const [preview, setPreview] = useState(null)

  return (
    <div className="py-12 px-4 sm:px-6">
      <ProgressBar current={4} />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
            Your Compliance Documents
          </h1>
          <p className="text-slate-500">
            Each document template below is tailored to your risk profile. Click any item to preview the template.
          </p>
        </div>

        <div className="space-y-3">
          {obligations.map((ob, i) => (
            <button
              key={i}
              onClick={() => setPreview(ob)}
              className="w-full bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4 hover:border-orange/40 hover:shadow-md hover:shadow-orange/5 transition-all cursor-pointer text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-navy/5 group-hover:bg-orange/10 flex items-center justify-center shrink-0 transition-colors">
                <ob.icon className="w-5 h-5 text-navy group-hover:text-orange transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="font-semibold text-navy">{ob.title}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColors[ob.priority]}`}>
                    {ob.priority}
                  </span>
                  <span className="text-xs text-slate-400 font-medium ml-auto hidden sm:inline">
                    {ob.docType}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{ob.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-orange shrink-0 mt-1 transition-colors" />
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate('/risk-result')}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-navy px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            Back
          </button>
          <button
            onClick={() => navigate('/action-plan')}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            Generate Action Plan
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {preview && (
        <TemplatePreview obligation={preview} onClose={() => setPreview(null)} />
      )}
    </div>
  )
}
