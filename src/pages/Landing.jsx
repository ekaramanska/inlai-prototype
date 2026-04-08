import { Link } from 'react-router-dom'
import { Shield, Search, BarChart3, ArrowRight, Bot, FileCheck, Clock } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Risk Assessment',
    desc: 'Automatically classify your AI systems under the EU AI Act and identify your risk category.',
  },
  {
    icon: FileCheck,
    title: 'Compliance Guidance',
    desc: 'Get concrete obligations, ready-made templates, and step-by-step action plans tailored to your situation.',
  },
  {
    icon: Clock,
    title: 'Ongoing Monitoring',
    desc: 'Track compliance over time. When regulations change, INLAi updates your obligations automatically.',
  },
]

const steps = [
  { num: '1', text: 'Tell us about your company and AI system' },
  { num: '2', text: 'Get your risk classification instantly' },
  { num: '3', text: 'Receive a tailored compliance action plan' },
]

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
            <Shield className="w-4 h-4 text-orange" />
            EU AI Act Compliance Made Simple
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Your AI Compliance<br />
            <span className="text-orange">Assistant</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10">
            INLAi translates complex AI regulations into clear, actionable steps.
            Assess risk, understand obligations, and stay compliant, all in one place.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-xl text-lg font-semibold no-underline transition-colors shadow-lg shadow-orange/25"
          >
            Start Free Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-navy text-center mb-4">
            Everything you need for AI compliance
          </h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-14">
            From risk assessment to ongoing monitoring, INLAi covers the full compliance lifecycle.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-orange/30 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-orange" />
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-navy mb-14">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center text-xl font-bold mb-4">
                  {s.num}
                </div>
                <p className="text-slate-600 font-medium">{s.text}</p>
              </div>
            ))}
          </div>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 mt-12 bg-navy hover:bg-navy-dark text-white px-8 py-4 rounded-xl text-lg font-semibold no-underline transition-colors"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              <span><strong className="text-navy">500+</strong> AI systems assessed</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span><strong className="text-navy">EU AI Act</strong> compliant framework</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span><strong className="text-navy">Automated</strong> obligation tracking</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
