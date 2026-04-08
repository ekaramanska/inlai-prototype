const steps = ['Company', 'AI System', 'Risk Level', 'Obligations', 'Action Plan']

export default function ProgressBar({ current }) {
  return (
    <nav aria-label="Assessment progress" className="max-w-2xl mx-auto mb-10">
      <ol className="flex items-center justify-between list-none m-0 p-0">
        {steps.map((label, i) => {
          const step = i + 1
          const isActive = step === current
          const isDone = step < current
          return (
            <li
              key={label}
              className="flex flex-col items-center flex-1"
              aria-current={isActive ? 'step' : undefined}
            >
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div
                    className={`h-0.5 flex-1 ${isDone ? 'bg-orange' : 'bg-slate-200'}`}
                    aria-hidden="true"
                  />
                )}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors ${
                    isActive
                      ? 'bg-orange text-white'
                      : isDone
                        ? 'bg-orange/20 text-orange'
                        : 'bg-slate-200 text-slate-400'
                  }`}
                  aria-hidden="true"
                >
                  {isDone ? '\u2713' : step}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${isDone ? 'bg-orange' : 'bg-slate-200'}`}
                    aria-hidden="true"
                  />
                )}
              </div>
              <span
                className={`text-xs mt-2 text-center hidden sm:block ${
                  isActive ? 'text-navy font-semibold' : 'text-slate-400'
                }`}
              >
                <span className="sr-only">
                  Step {step}{isDone ? ' (completed)' : isActive ? ' (current)' : ''}:{' '}
                </span>
                {label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
