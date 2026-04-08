import { Link } from 'react-router-dom'
import { AlertCircle, FileText, Calendar, ArrowRight, ExternalLink, Clock, CheckCircle2, ShieldCheck } from 'lucide-react'

const updates = [
  {
    id: 1,
    status: 'action_required',
    document: 'Risk Management Policy',
    regulation: 'Commission Delegated Regulation (EU) 2026/412',
    publishedDate: 'Mar 28, 2026',
    deadline: 'May 15, 2026',
    summary: 'New guidelines on continuous post-market monitoring require that your risk management policy includes a dedicated section on real-time incident reporting and escalation timelines. Your current policy does not cover post-deployment monitoring frequency.',
    changes: [
      'Add a section on post-market monitoring obligations (Article 72)',
      'Define incident reporting timelines (serious incidents within 72 hours)',
      'Include escalation procedures for newly discovered risks',
      'Update risk assessment to include post-deployment data sources',
    ],
    impact: 'High',
  },
  {
    id: 2,
    status: 'action_required',
    document: 'Transparency Notice',
    regulation: 'AI Office Guidance Note 2026/03 on Article 50 Implementation',
    publishedDate: 'Apr 1, 2026',
    deadline: 'Jun 1, 2026',
    summary: 'Updated guidance clarifies that AI-generated content must be labelled with machine-readable markers in addition to user-facing disclosures. Your current transparency notice only covers verbal/written disclosure to users.',
    changes: [
      'Add machine-readable AI content markers (C2PA or equivalent)',
      'Update user disclosure to include the specific AI model used',
      'Include information on how to opt out of AI-assisted processing',
      'Add multilingual disclosure requirements for cross-border services',
    ],
    impact: 'High',
  },
  {
    id: 3,
    status: 'resolved',
    document: 'Data Governance Framework',
    regulation: 'EDPB Guidelines 01/2026 on AI and GDPR interplay',
    publishedDate: 'Feb 15, 2026',
    resolvedDate: 'Mar 10, 2026',
    summary: 'Clarification on how GDPR data minimisation principles apply to AI training data. Your framework was updated to align with the new guidance.',
    changes: [
      'Added data minimisation impact assessment for AI training sets',
      'Updated retention schedules for model training data',
    ],
    impact: 'Medium',
  },
]

const impactColors = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
}

const actionRequired = updates.filter((u) => u.status === 'action_required')
const resolved = updates.filter((u) => u.status === 'resolved')

export default function Updates() {
  return (
    <div className="py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">Policy Updates</h1>
            <p className="text-slate-500 text-sm mt-1">
              Regulatory changes that affect your compliance documents
            </p>
          </div>
          <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-lg text-sm font-semibold">
            <AlertCircle className="w-4 h-4" />
            {actionRequired.length} {actionRequired.length === 1 ? 'update' : 'updates'} require your attention
          </div>
        </div>

        {/* Action required */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Action Required
          </h2>
          <div className="space-y-4">
            {actionRequired.map((update) => (
              <div key={update.id} className="bg-white rounded-xl border-l-4 border-l-red-400 border border-slate-200 p-6">
                {/* Top row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 bg-navy/5 text-navy px-3 py-1 rounded-lg text-sm font-semibold">
                      <FileText className="w-4 h-4" />
                      {update.document}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${impactColors[update.impact]}`}>
                      {update.impact} impact
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-red-600 font-medium">
                    <Clock className="w-4 h-4" />
                    Due by {update.deadline}
                  </div>
                </div>

                {/* Source regulation */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <ExternalLink className="w-3 h-3" />
                  {update.regulation}
                  <span className="mx-1">&middot;</span>
                  Published {update.publishedDate}
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-600 mb-4">{update.summary}</p>

                {/* Changes needed */}
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Required changes to your document
                  </h3>
                  <ul className="space-y-2">
                    {update.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <ArrowRight className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                <button className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer">
                  <FileText className="w-4 h-4" />
                  Open Document Template
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resolved */}
        <div>
          <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Resolved
          </h2>
          <div className="space-y-4">
            {resolved.map((update) => (
              <div key={update.id} className="bg-white rounded-xl border-l-4 border-l-emerald-400 border border-slate-200 p-6 opacity-80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 bg-navy/5 text-navy px-3 py-1 rounded-lg text-sm font-semibold">
                      <FileText className="w-4 h-4" />
                      {update.document}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${impactColors[update.impact]}`}>
                      {update.impact} impact
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-emerald-600 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Resolved {update.resolvedDate}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <ExternalLink className="w-3 h-3" />
                  {update.regulation}
                </div>

                <p className="text-sm text-slate-500">{update.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 bg-navy/5 rounded-xl p-5 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-navy shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-slate-600">
              <strong className="text-navy">INLAi monitors regulatory changes continuously.</strong> In the full version, you will receive email notifications when new regulations affect your compliance documents, with auto-generated draft updates ready for your review.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
