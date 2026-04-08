import { useState } from 'react'
import { FileText, Search, Filter, Download, Eye, CheckCircle2, Clock, AlertTriangle, UserCheck, ShieldCheck, Database, BookOpen, ClipboardList, Users, Target, Award } from 'lucide-react'

const statuses = {
  completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  in_review: { label: 'Needs Review', color: 'bg-orange/10 text-orange', icon: AlertTriangle },
  approval: { label: 'Awaiting Approval', color: 'bg-purple-100 text-purple-700', icon: UserCheck },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700', icon: Clock },
  not_started: { label: 'Not Started', color: 'bg-slate-100 text-slate-500', icon: Clock },
}

const templates = [
  {
    id: 1,
    icon: ShieldCheck,
    name: 'Risk Management Policy',
    category: 'Policy',
    status: 'completed',
    lastModified: 'Apr 5, 2026',
    assignee: 'Maria K.',
    version: 'v2.1',
    pages: 18,
  },
  {
    id: 2,
    icon: Database,
    name: 'Data Governance Framework',
    category: 'Framework',
    status: 'approval',
    lastModified: 'Apr 7, 2026',
    assignee: 'Stefan P.',
    version: 'v1.3',
    pages: 24,
  },
  {
    id: 3,
    icon: FileText,
    name: 'Technical Documentation',
    category: 'Report',
    status: 'in_progress',
    lastModified: 'Apr 6, 2026',
    assignee: 'Elena D.',
    version: 'v0.8',
    pages: 32,
  },
  {
    id: 4,
    icon: ClipboardList,
    name: 'Event Logging Protocol',
    category: 'Protocol',
    status: 'in_review',
    lastModified: 'Apr 4, 2026',
    assignee: 'Nikolay V.',
    version: 'v1.0',
    pages: 12,
  },
  {
    id: 5,
    icon: BookOpen,
    name: 'Transparency Notice',
    category: 'Disclosure',
    status: 'completed',
    lastModified: 'Apr 7, 2026',
    assignee: 'Maria K.',
    version: 'v1.2',
    pages: 6,
  },
  {
    id: 6,
    icon: Users,
    name: 'Human Oversight Plan',
    category: 'Plan',
    status: 'approval',
    lastModified: 'Apr 3, 2026',
    assignee: 'Stefan P.',
    version: 'v1.0',
    pages: 14,
  },
  {
    id: 7,
    icon: Target,
    name: 'Accuracy and Robustness Report',
    category: 'Report',
    status: 'not_started',
    lastModified: null,
    assignee: 'Unassigned',
    version: null,
    pages: null,
  },
  {
    id: 8,
    icon: Award,
    name: 'Conformity Assessment Record',
    category: 'Record',
    status: 'not_started',
    lastModified: null,
    assignee: 'Unassigned',
    version: null,
    pages: null,
  },
]

const filterOptions = ['All', 'Completed', 'Needs Review', 'Awaiting Approval', 'In Progress', 'Not Started']
const filterMap = {
  'All': null,
  'Completed': 'completed',
  'Needs Review': 'in_review',
  'Awaiting Approval': 'approval',
  'In Progress': 'in_progress',
  'Not Started': 'not_started',
}

export default function Templates() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = templates.filter((t) => {
    const matchesFilter = filter === 'All' || t.status === filterMap[filter]
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const countByStatus = (status) => templates.filter((t) => t.status === status).length

  return (
    <div className="py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">Compliance Templates</h1>
            <p className="text-slate-500 text-sm mt-1">
              All required documents for your High Risk classification
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              {countByStatus('completed')} completed
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 text-orange font-medium">
              <Clock className="w-4 h-4" />
              {templates.length - countByStatus('completed')} remaining
            </span>
          </div>
        </div>

        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
            <label htmlFor="template-search" className="sr-only">Search templates</label>
            <input
              id="template-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
            <label htmlFor="status-filter" className="sr-only">Filter by status</label>
            <select
              id="status-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
            >
              {filterOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-5 font-semibold text-slate-500 text-xs uppercase tracking-wide">Document</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden sm:table-cell">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden md:table-cell">Assigned to</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden lg:table-cell">Version</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden lg:table-cell">Last Modified</th>
                  <th className="text-right py-3 px-5 font-semibold text-slate-500 text-xs uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
                  const s = statuses[t.status]
                  const StatusIcon = s.icon
                  return (
                    <tr key={t.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                      {/* Document */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-navy/5 flex items-center justify-center shrink-0">
                            <t.icon className="w-4.5 h-4.5 text-navy" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{t.name}</p>
                            <p className="text-xs text-slate-400">{t.category}{t.pages ? ` - ${t.pages} pages` : ''}</p>
                            {/* Mobile status */}
                            <span className={`sm:hidden inline-flex items-center gap-1 mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${s.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {s.label}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 hidden sm:table-cell">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${s.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {s.label}
                        </span>
                      </td>

                      {/* Assignee */}
                      <td className="py-4 px-4 hidden md:table-cell">
                        <span className={`text-sm ${t.assignee === 'Unassigned' ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                          {t.assignee}
                        </span>
                      </td>

                      {/* Version */}
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <span className="text-sm text-slate-500">{t.version || '-'}</span>
                      </td>

                      {/* Last Modified */}
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <span className="text-sm text-slate-500">{t.lastModified || '-'}</span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5">
                        <div className="flex items-center justify-end gap-2">
                          {t.status !== 'not_started' ? (
                            <>
                              <button
                                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy transition-colors cursor-pointer"
                                aria-label={`Preview ${t.name}`}
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy transition-colors cursor-pointer"
                                aria-label={`Download ${t.name}`}
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <button className="text-xs font-semibold text-orange hover:text-orange-dark transition-colors cursor-pointer">
                              Start
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400 text-sm">
                      No templates match your search or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-500">
          {Object.entries(statuses).map(([key, s]) => {
            const Icon = s.icon
            return (
              <span key={key} className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                {s.label} ({countByStatus(key)})
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
