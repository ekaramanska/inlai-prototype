import { Building2, MapPin, Users, Briefcase, Bot, Shield, Calendar, Edit3 } from 'lucide-react'

const companyInfo = {
  name: 'NovaTech Solutions',
  industry: 'Financial Services',
  size: 'Medium (50 to 249 employees)',
  location: 'Sofia, Bulgaria',
  registeredSince: 'April 2026',
}

const aiSystems = [
  { name: 'Credit Scoring Engine', risk: 'High', status: 'Active', lastAssessed: 'Apr 7, 2026' },
  { name: 'Customer Chatbot', risk: 'Limited', status: 'Active', lastAssessed: 'Apr 5, 2026' },
]

const riskColors = {
  High: 'bg-orange/10 text-orange',
  Limited: 'bg-yellow-100 text-yellow-700',
  Minimal: 'bg-emerald-100 text-emerald-700',
}

export default function Profile() {
  return (
    <div className="py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">Company Profile</h1>
            <p className="text-slate-500 text-sm mt-1">Your organisation details and AI system inventory</p>
          </div>
          <button className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 hover:text-navy hover:border-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Company details */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-navy/10 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-navy" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">{companyInfo.name}</h2>
              <p className="text-sm text-slate-500">Registered on INLAi since {companyInfo.registeredSince}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <Briefcase className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-xs text-slate-400 font-medium">Industry</div>
                <div className="text-sm font-semibold text-slate-700">{companyInfo.industry}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <Users className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-xs text-slate-400 font-medium">Company Size</div>
                <div className="text-sm font-semibold text-slate-700">{companyInfo.size}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <MapPin className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-xs text-slate-400 font-medium">Location</div>
                <div className="text-sm font-semibold text-slate-700">{companyInfo.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <Shield className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-xs text-slate-400 font-medium">Regulatory Framework</div>
                <div className="text-sm font-semibold text-slate-700">EU AI Act (Regulation EU 2024/1689)</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Systems inventory */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-navy flex items-center gap-2">
              <Bot className="w-5 h-5 text-orange" />
              AI Systems Inventory
            </h2>
            <button className="text-sm text-orange hover:text-orange-dark font-semibold cursor-pointer transition-colors">
              + Add System
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 pr-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">System</th>
                  <th className="text-left py-3 pr-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Risk Level</th>
                  <th className="text-left py-3 pr-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Status</th>
                  <th className="text-left py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Last Assessed</th>
                </tr>
              </thead>
              <tbody>
                {aiSystems.map((sys, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 font-medium text-slate-700">{sys.name}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${riskColors[sys.risk]}`}>
                        {sys.risk}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {sys.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500">{sys.lastAssessed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-navy mb-5 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-400" />
            Compliance Timeline
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">GPAI model obligations</p>
                <p className="text-xs text-slate-500">Applicable since August 2, 2025</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Active</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-orange/5 rounded-lg border border-orange/20">
              <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-orange" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">High-risk system obligations (Annex III)</p>
                <p className="text-xs text-slate-500">Applicable from August 2, 2026</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-orange bg-orange/10 px-3 py-1 rounded-full">Upcoming</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
