import { Link } from 'react-router-dom'
import { CheckCircle2, Circle, Clock, AlertTriangle, ArrowRight, Bell, Calendar, TrendingUp, FileText, AlertCircle } from 'lucide-react'

const weeklyProgress = [
  { week: 'Week 1', percent: 12 },
  { week: 'Week 2', percent: 45 },
  { week: 'Week 3', percent: null },
  { week: 'Week 4', percent: null },
]

const completedTasks = [
  { title: 'Risk Management Policy', subtitle: 'Initial draft completed and reviewed', date: 'Apr 2' },
  { title: 'Data Governance Framework', subtitle: 'Data quality metrics defined', date: 'Apr 5' },
  { title: 'Transparency Notice', subtitle: 'User-facing disclosure drafted', date: 'Apr 7' },
]

const remainingTasks = [
  { title: 'Technical Documentation', subtitle: 'Architecture specs still needed', priority: 'High', due: 'Apr 15' },
  { title: 'Event Logging Protocol', subtitle: 'Waiting for IT team input', priority: 'High', due: 'Apr 20' },
  { title: 'Human Oversight Plan', subtitle: 'Roles and escalation criteria pending', priority: 'Medium', due: 'May 1' },
  { title: 'Accuracy and Robustness Report', subtitle: 'Testing not yet started', priority: 'Medium', due: 'May 15' },
  { title: 'Conformity Assessment Record', subtitle: 'Depends on all other documents', priority: 'Medium', due: 'Jun 1' },
]

const priorityColors = {
  High: 'bg-orange/10 text-orange',
  Medium: 'bg-blue-100 text-blue-700',
}

const recentActivity = [
  { icon: CheckCircle2, color: 'text-emerald-500', text: 'Transparency Notice draft completed', time: '2 hours ago' },
  { icon: AlertCircle, color: 'text-red-500', text: '2 policies need updating due to regulatory changes', time: '1 day ago' },
  { icon: CheckCircle2, color: 'text-emerald-500', text: 'Data governance framework approved', time: '3 days ago' },
  { icon: Bell, color: 'text-blue-500', text: 'Risk management policy review scheduled', time: '5 days ago' },
]

const deadlines = [
  { task: 'Technical Documentation', date: 'Apr 15, 2026', urgent: true },
  { task: 'Event Logging Protocol', date: 'Apr 20, 2026', urgent: true },
  { task: 'Human Oversight Plan', date: 'May 1, 2026', urgent: false },
  { task: 'Conformity Assessment', date: 'Jun 1, 2026', urgent: false },
]

export default function Dashboard() {
  const currentWeek = 1
  const currentPercent = weeklyProgress[currentWeek].percent

  return (
    <div className="py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">Compliance Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Week 2 of your compliance journey</p>
          </div>
          <Link
            to="/updates"
            className="inline-flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-red-100 transition-colors"
          >
            <AlertCircle className="w-4 h-4" />
            2 policies need updating
          </Link>
        </div>

        {/* Top stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {/* Overall progress */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm text-slate-500 mb-3 font-medium">Overall Compliance</div>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-bold text-navy">{currentPercent}%</span>
              <span className="flex items-center gap-1 text-sm text-emerald-500 font-medium pb-1">
                <TrendingUp className="w-4 h-4" />
                +33% this week
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange to-orange-light rounded-full transition-all"
                style={{ width: `${currentPercent}%` }}
              />
            </div>
          </div>

          {/* Tasks summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm text-slate-500 mb-3 font-medium">Tasks Overview</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Completed
                </span>
                <span className="text-lg font-bold text-navy">{completedTasks.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-orange" />
                  Remaining
                </span>
                <span className="text-lg font-bold text-navy">{remainingTasks.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-slate-600">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  Need updating
                </span>
                <span className="text-lg font-bold text-red-600">2</span>
              </div>
            </div>
          </div>

          {/* Risk level */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm text-slate-500 mb-3 font-medium">Risk Classification</div>
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-8 h-8 text-orange" />
              <div>
                <div className="text-xl font-bold text-orange">High Risk</div>
                <div className="text-sm text-slate-500">EU AI Act, Annex III</div>
              </div>
            </div>
            <div className="text-xs text-slate-400">8 total obligations apply</div>
          </div>
        </div>

        {/* Weekly progress chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="font-semibold text-navy mb-5">Weekly Progress</h2>
          <div className="flex items-end gap-3 h-40">
            {weeklyProgress.map((w, i) => {
              const isCurrent = i === currentWeek
              const isFuture = w.percent === null
              return (
                <div key={w.week} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center justify-end h-28">
                    {!isFuture && (
                      <span className={`text-xs font-bold mb-1 ${isCurrent ? 'text-orange' : 'text-slate-400'}`}>
                        {w.percent}%
                      </span>
                    )}
                    <div
                      className={`w-full max-w-16 rounded-t-lg transition-all ${
                        isFuture
                          ? 'bg-slate-100 h-4'
                          : isCurrent
                            ? 'bg-gradient-to-t from-orange to-orange-light'
                            : 'bg-navy/20'
                      }`}
                      style={!isFuture ? { height: `${Math.max(w.percent, 8)}%` } : undefined}
                    />
                  </div>
                  <span className={`text-xs font-medium ${isCurrent ? 'text-navy font-semibold' : 'text-slate-400'}`}>
                    {w.week}
                    {isCurrent && <span className="block text-orange text-[10px]">Current</span>}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tasks columns */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Completed */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-navy mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Completed Tasks
            </h2>
            <div className="space-y-3">
              {completedTasks.map((t, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-emerald-50/50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 line-through decoration-slate-300">{t.title}</p>
                    <p className="text-xs text-slate-400">{t.subtitle}</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{t.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Remaining */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-navy mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange" />
              Remaining Tasks
            </h2>
            <div className="space-y-3">
              {remainingTasks.map((t, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-slate-700">{t.title}</p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${priorityColors[t.priority]}`}>
                        {t.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{t.subtitle}</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">Due {t.due}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
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
            <div className="space-y-3">
              {deadlines.map((d, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${d.urgent ? 'bg-orange/5 border border-orange/20' : 'bg-slate-50'}`}>
                  <span className={`text-sm font-medium ${d.urgent ? 'text-orange' : 'text-slate-700'}`}>{d.task}</span>
                  <span className={`text-sm ${d.urgent ? 'text-orange font-semibold' : 'text-slate-500'}`}>{d.date}</span>
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
