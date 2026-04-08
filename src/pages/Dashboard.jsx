import { Link } from 'react-router-dom'
import { CheckCircle2, Circle, Clock, AlertTriangle, ArrowRight, BarChart3, Bell, Calendar } from 'lucide-react'

const recentActivity = [
  { icon: CheckCircle2, color: 'text-emerald-500', text: 'Technical documentation template generated', time: '2 hours ago' },
  { icon: AlertTriangle, color: 'text-orange', text: 'New EU AI Act amendment detected, review needed', time: '1 day ago' },
  { icon: CheckCircle2, color: 'text-emerald-500', text: 'Data governance policy draft completed', time: '3 days ago' },
  { icon: Bell, color: 'text-blue-500', text: 'Risk management framework setup started', time: '1 week ago' },
]

const deadlines = [
  { task: 'Technical Documentation', date: 'Jun 15, 2026', urgent: false },
  { task: 'Conformity Assessment', date: 'Aug 1, 2026', urgent: false },
  { task: 'EU Database Registration', date: 'Sep 30, 2026', urgent: false },
]

export default function Dashboard() {
  const progress = 35

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Prototype banner */}
        <div className="bg-navy/5 border border-navy/10 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-orange" />
            </div>
            <p className="text-sm text-slate-600">
              <strong className="text-navy">This is a prototype.</strong> Full monitoring and real-time updates available in the production version.
            </p>
          </div>
          <a
            href="mailto:hello@inlai.eu"
            className="text-sm font-semibold text-orange hover:text-orange-dark no-underline whitespace-nowrap"
          >
            Join Waitlist &rarr;
          </a>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-8">Compliance Dashboard</h1>

        {/* Stats row */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {/* Progress */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm text-slate-500 mb-3 font-medium">Overall Progress</div>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-bold text-navy">{progress}%</span>
              <span className="text-sm text-emerald-500 font-medium pb-1">On track</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange to-orange-light rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Risk level */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm text-slate-500 mb-3 font-medium">Risk Classification</div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-orange" />
              <div>
                <div className="text-xl font-bold text-orange">High Risk</div>
                <div className="text-sm text-slate-500">EU AI Act, Annex III</div>
              </div>
            </div>
          </div>

          {/* Obligations */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm text-slate-500 mb-3 font-medium">Obligations Status</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-lg font-bold text-navy">2</span>
                <span className="text-sm text-slate-400">done</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-5 h-5 text-orange" />
                <span className="text-lg font-bold text-navy">3</span>
                <span className="text-sm text-slate-400">in progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Circle className="w-5 h-5 text-slate-300" />
                <span className="text-lg font-bold text-navy">3</span>
                <span className="text-sm text-slate-400">pending</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-navy mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-400" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <item.icon className={`w-5 h-5 shrink-0 mt-0.5 ${item.color}`} />
                  <div>
                    <p className="text-sm text-slate-700">{item.text}</p>
                    <p className="text-xs text-slate-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-navy mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" />
              Upcoming Deadlines
            </h2>
            <div className="space-y-4">
              {deadlines.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">{d.task}</span>
                  <span className="text-sm text-slate-500">{d.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-navy hover:text-orange font-medium no-underline transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Start a new assessment
          </Link>
        </div>
      </div>
    </div>
  )
}
