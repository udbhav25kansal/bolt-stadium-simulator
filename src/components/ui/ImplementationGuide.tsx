import { useSimulationStore } from '../../store/simulationStore';
import { getActionsForMonth, getBudgetGateForMonth, type TimelineAction } from '../../config/implementationTimeline';
import { useState } from 'react';

export function ImplementationGuide() {
  const currentMonth = useSimulationStore((state) => state.controls.day);
  const milestone = getActionsForMonth(currentMonth);
  const budgetGate = getBudgetGateForMonth(currentMonth);
  const [expanded, setExpanded] = useState(true);

  if (!milestone) return null;

  // Category colors and icons
  const categoryStyles: Record<TimelineAction['category'], { bg: string; text: string; icon: string }> = {
    app: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '📱' },
    stadium: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '🏟️' },
    fnb: { bg: 'bg-orange-100', text: 'text-orange-700', icon: '🍔' },
    merch: { bg: 'bg-green-100', text: 'text-green-700', icon: '👕' },
    osb: { bg: 'bg-pink-100', text: 'text-pink-700', icon: '🍺' },
    review: { bg: 'bg-gray-100', text: 'text-gray-700', icon: '📊' },
  };

  // Priority badges
  const priorityStyles: Record<TimelineAction['priority'], { bg: string; text: string }> = {
    critical: { bg: 'bg-red-100', text: 'text-red-700' },
    high: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    medium: { bg: 'bg-blue-100', text: 'text-blue-600' },
  };

  return (
    <div className="absolute top-4 right-4 w-96 max-h-[calc(100vh-2rem)] overflow-y-auto z-50">
      <div className="bg-white/95 backdrop-blur rounded-lg shadow-xl border border-gray-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="text-white font-bold text-lg">Implementation Guide</h3>
                <p className="text-blue-100 text-xs">Month {currentMonth} Action Plan</p>
              </div>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-white hover:text-blue-100 transition-colors"
            >
              {expanded ? '−' : '+'}
            </button>
          </div>
        </div>

        {expanded && (
          <>
            {/* Phase Info */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
              <div className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
                {milestone.phase}
              </div>
              <div className="text-gray-700 text-sm mt-1 italic">
                {milestone.subtitle}
              </div>
            </div>

            {/* Budget Gate Warning (if applicable) */}
            {budgetGate && (
              <div className="m-4 p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
                <div className="flex items-start gap-2">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <div className="text-sm font-semibold text-amber-900">Budget Gate Decision Point</div>
                    <div className="text-xs text-amber-700 mt-1">{budgetGate.condition}</div>
                    <div className="text-xs text-amber-800 font-medium mt-1">
                      ✓ {budgetGate.decision}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions List */}
            <div className="p-4 space-y-3">
              <div className="text-sm font-semibold text-gray-900 mb-2">
                What to implement now:
              </div>
              {milestone.actions.map((action, idx) => {
                const catStyle = categoryStyles[action.category];
                const prioStyle = priorityStyles[action.priority];

                return (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    {/* Title and Category */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span>{catStyle.icon}</span>
                        <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                          {action.title}
                        </h4>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded ${prioStyle.bg} ${prioStyle.text} font-medium whitespace-nowrap`}>
                        {action.priority}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      {action.description}
                    </p>

                    {/* Impact / Money Logic */}
                    <div className="flex items-start gap-1.5 mt-2 p-2 bg-green-50 rounded border border-green-200">
                      <span className="text-sm">💰</span>
                      <div className="text-xs text-green-800 font-medium leading-tight">
                        {action.impact}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Goalposts / Success Criteria */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span>🎯</span>
                <span>Success Criteria ("Good" looks like):</span>
              </div>
              <ul className="space-y-1.5">
                {milestone.goalposts.map((goal, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="flex-1">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Team Ownership Footer */}
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs">
              <div className="font-semibold mb-1">Who's responsible:</div>
              <div className="grid grid-cols-2 gap-1">
                <div>📱 App: Product Lead</div>
                <div>🏟️ Stadium: Ops Lead</div>
                <div>🍔 F&B: Ops Lead</div>
                <div>👕 Merch: Commercial Lead</div>
                <div>🍺 OSB: Commercial Lead</div>
                <div>📊 Review: Finance PMO</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
