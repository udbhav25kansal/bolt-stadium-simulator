import { useSimulationStore } from '../../store/simulationStore';
import { WEEKLY_KPI_SCORECARD, type KPIMetric } from '../../config/implementationTimeline';
import { useState } from 'react';

export function KPIScorecard() {
  const [expanded, setExpanded] = useState(false);
  const currentMonth = useSimulationStore((state) => state.controls.day);
  const kpis = useSimulationStore((state) => state.snapshot.kpis);

  // Calculate progress for each KPI based on current month
  const calculateProgress = (metric: KPIMetric): number => {
    const monthProgress = currentMonth / 12; // 0 to 1
    const targetDelta = metric.month12Target - metric.baseline;
    const currentValue = metric.baseline + (targetDelta * monthProgress);

    // For queue time and energy, lower is better
    if (metric.name === 'Average queue time' || metric.name === 'Energy use per event') {
      const improvement = (metric.baseline - currentValue) / (metric.baseline - metric.month12Target);
      return Math.max(0, Math.min(100, improvement * 100));
    }

    // For all other metrics, higher is better
    const improvement = (currentValue - metric.baseline) / targetDelta;
    return Math.max(0, Math.min(100, improvement * 100));
  };

  // Get actual current value from simulation
  const getCurrentValue = (metric: KPIMetric): number => {
    switch (metric.name) {
      case 'F&B per fan':
        return kpis.fnb_per_capita;
      case 'Average queue time':
        return kpis.queue_time_min;
      case 'Revenue per event':
        return kpis.revenue_usd;
      case '% orders via app': {
        const controls = useSimulationStore.getState().controls;
        return controls.mobileOrdersPct;
      }
      case 'Energy use per event': {
        // Simulate energy reduction based on modernization level
        const controls = useSimulationStore.getState().controls;
        return 100 - (controls.modernizationLevel / 100) * 17; // Up to 17% reduction
      }
      case 'Merch conversion rate': {
        // Simulate merch conversion improvement
        const monthProgress = currentMonth / 12;
        return metric.baseline + (metric.month12Target - metric.baseline) * monthProgress;
      }
      case 'International merch share': {
        const controls = useSimulationStore.getState().controls;
        return controls.internationalStore ? 20 : 10;
      }
      case 'OSB active bars': {
        // Simulate bar growth over time
        return Math.round((currentMonth / 12) * 25);
      }
      case 'Off-season events': {
        const controls = useSimulationStore.getState().controls;
        return controls.offSeasonEvents;
      }
      default:
        return metric.baseline;
    }
  };

  // Category colors
  const categoryColors: Record<KPIMetric['category'], string> = {
    revenue: 'text-green-600',
    operations: 'text-blue-600',
    engagement: 'text-purple-600',
  };

  const categoryIcons: Record<KPIMetric['category'], string> = {
    revenue: '💰',
    operations: '⚙️',
    engagement: '👥',
  };

  return (
    <div className="absolute top-4 left-4 w-80 z-50">
      <div className="bg-white/95 backdrop-blur rounded-lg shadow-xl border border-gray-200">
        {/* Header */}
        <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-green-600 to-emerald-700 cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <div>
                <h3 className="text-white font-bold text-sm">Weekly KPI Scorecard</h3>
                <p className="text-green-100 text-xs">Track your progress</p>
              </div>
            </div>
            <button className="text-white hover:text-green-100 transition-colors">
              {expanded ? '−' : '+'}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
            {WEEKLY_KPI_SCORECARD.map((metric, idx) => {
              const currentValue = getCurrentValue(metric);
              const progress = calculateProgress(metric);
              const isOnTrack = progress >= (currentMonth / 12) * 80; // At least 80% of expected progress

              return (
                <div key={idx} className="p-2 bg-gray-50 rounded border border-gray-200">
                  {/* Metric Name and Category */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{categoryIcons[metric.category]}</span>
                      <span className="text-xs font-semibold text-gray-900">{metric.name}</span>
                    </div>
                    <span className={`text-xs font-medium ${categoryColors[metric.category]}`}>
                      {metric.category}
                    </span>
                  </div>

                  {/* Current Value */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-lg font-bold text-gray-900">
                      {metric.unit === '$' && '$'}
                      {metric.unit === 'kWh' || metric.unit === 'min' ? currentValue.toFixed(1) : Math.round(currentValue)}
                      {metric.unit === '%' && '%'}
                      {metric.unit === '#' && ''}
                    </span>
                    <span className="text-xs text-gray-500">
                      / {metric.month12Target}{metric.unit === '%' ? '%' : metric.unit === '#' ? '' : ` ${metric.unit}`} target
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                        isOnTrack ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min(100, progress)}%` }}
                    />
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      Baseline: {metric.baseline}{metric.unit === '%' ? '%' : metric.unit === '#' ? '' : ` ${metric.unit}`}
                    </span>
                    <span className={`text-xs font-medium ${isOnTrack ? 'text-green-600' : 'text-yellow-600'}`}>
                      {isOnTrack ? '✓ On track' : '⚠ Needs focus'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary Footer (always visible) */}
        {!expanded && (
          <div className="p-3 text-xs text-gray-600 text-center">
            Click to view {WEEKLY_KPI_SCORECARD.length} tracked metrics
          </div>
        )}
      </div>
    </div>
  );
}
