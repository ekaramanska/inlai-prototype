import { useNavigate } from 'react-router-dom'
import { ShieldCheck, FileText, Database, BookOpen, ClipboardList, Users, Target, Award, ArrowRight, ArrowLeft, Circle } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const obligations = [
  { icon: ShieldCheck, title: 'Risk Management System', desc: 'Establish and maintain a continuous risk management process throughout the AI system lifecycle.', priority: 'Critical' },
  { icon: Database, title: 'Data Governance', desc: 'Ensure training, validation, and testing datasets meet quality criteria and are representative.', priority: 'Critical' },
  { icon: FileText, title: 'Technical Documentation', desc: 'Prepare and maintain comprehensive technical documentation demonstrating compliance.', priority: 'High' },
  { icon: ClipboardList, title: 'Record Keeping', desc: 'Implement automatic logging of events throughout the AI system\u2019s operation period.', priority: 'High' },
  { icon: BookOpen, title: 'Transparency & User Info', desc: 'Provide clear information to deployers about the system\u2019s capabilities and limitations.', priority: 'High' },
  { icon: Users, title: 'Human Oversight', desc: 'Design the system to allow effective human oversight during its period of use.', priority: 'Medium' },
  { icon: Target, title: 'Accuracy & Robustness', desc: 'Ensure appropriate levels of accuracy, robustness, and cybersecurity throughout the lifecycle.', priority: 'Medium' },
  { icon: Award, title: 'Conformity Assessment', desc: 'Complete the required conformity assessment procedure before placing the system on the market.', priority: 'Medium' },
]

const priorityColors = {
  Critical: 'bg-red-100 text-red-700',
  High: 'bg-orange/10 text-orange',
  Medium: 'bg-blue-100 text-blue-700',
}

export default function Obligations() {
  const navigate = useNavigate()

  return (
    <div className="py-12 px-4 sm:px-6">
      <ProgressBar current={4} />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
            Your Compliance Obligations
          </h1>
          <p className="text-slate-500">
            Based on your <strong className="text-orange">High Risk</strong> classification, here are the obligations you must fulfill.
          </p>
        </div>

        <div className="space-y-3">
          {obligations.map((ob, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4 hover:border-slate-300 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center shrink-0">
                <ob.icon className="w-5 h-5 text-navy" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="font-semibold text-navy">{ob.title}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColors[ob.priority]}`}>
                    {ob.priority}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{ob.desc}</p>
              </div>
              <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-1" />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate('/risk-result')}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-navy px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={() => navigate('/action-plan')}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            Generate Action Plan
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
