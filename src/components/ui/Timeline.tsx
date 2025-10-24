import { useSimulationStore } from '../../store/simulationStore';

export function Timeline() {
  const currentMonth = useSimulationStore((state) => state.controls.day);
  const setDay = useSimulationStore((state) => state.setDay);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setDay(value);
  };

  // Month labels for display
  const monthLabel = currentMonth === 0 ? 'Baseline' : `Month ${currentMonth}`;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[500px] z-[100]">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg px-6 py-3 shadow-2xl border-2 border-blue-400">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-lg">🗓️</div>
            <div>
              <div className="text-xs text-blue-100 uppercase tracking-wider font-semibold">
                Timeline
              </div>
              <div className="text-xl font-bold text-white">{monthLabel}</div>
            </div>
          </div>
          <div className="text-right">
            {currentMonth > 0 && currentMonth <= 3 && (
              <div className="text-xs text-blue-200 font-medium">⚡ Quick Wins</div>
            )}
            {currentMonth > 3 && (
              <div className="text-xs text-green-300 font-medium">📈 Growth Phase</div>
            )}
            <div className="text-xs text-blue-100 mt-0.5">
              {Math.round((currentMonth / 12) * 100)}% Complete
            </div>
          </div>
        </div>

        {/* Month markers */}
        <div className="flex justify-between text-[10px] text-blue-200 mb-2 font-medium">
          <span className={currentMonth === 0 ? 'text-white font-bold' : ''}>Base</span>
          <span className={currentMonth === 3 ? 'text-white font-bold' : ''}>M3</span>
          <span className={currentMonth === 6 ? 'text-white font-bold' : ''}>M6</span>
          <span className={currentMonth === 9 ? 'text-white font-bold' : ''}>M9</span>
          <span className={currentMonth === 12 ? 'text-white font-bold' : ''}>M12</span>
        </div>

        {/* Slider */}
        <div className="relative">
          <input
            type="range"
            min="0"
            max="12"
            value={currentMonth}
            onChange={handleChange}
            className="w-full h-2.5 bg-blue-300 rounded-full appearance-none cursor-grab active:cursor-grabbing slider-thumb"
            style={{
              background: `linear-gradient(to right, #60a5fa 0%, #60a5fa ${(currentMonth/12)*100}%, #93c5fd ${(currentMonth/12)*100}%, #93c5fd 100%)`
            }}
          />
        </div>
      </div>

      {/* Custom slider thumb styles */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: grab;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          border: 3px solid #2563eb;
        }
        .slider-thumb:active::-webkit-slider-thumb {
          cursor: grabbing;
          transform: scale(1.1);
        }
        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: grab;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          border: 3px solid #2563eb;
        }
        .slider-thumb:active::-moz-range-thumb {
          cursor: grabbing;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
