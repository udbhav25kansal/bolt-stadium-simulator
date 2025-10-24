import { useSimulationStore } from '../../store/simulationStore';

export function Controls() {
  const controls = useSimulationStore((state) => state.controls);
  const setExpressLanes = useSimulationStore((state) => state.setExpressLanes);
  const setMobileOrdersPct = useSimulationStore((state) => state.setMobileOrdersPct);
  const setPremiumSeatingPct = useSimulationStore((state) => state.setPremiumSeatingPct);
  const setFoodHallCount = useSimulationStore((state) => state.setFoodHallCount);
  const setCelebMerchIntensity = useSimulationStore((state) => state.setCelebMerchIntensity);
  const setInternationalStore = useSimulationStore((state) => state.setInternationalStore);
  const setModernizationLevel = useSimulationStore((state) => state.setModernizationLevel);
  const setOffSeasonEvents = useSimulationStore((state) => state.setOffSeasonEvents);

  return (
    <div className="absolute bottom-28 left-4 right-4 bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 border border-gray-700 z-10">
      <h3 className="text-white text-xs font-semibold mb-2">💡 Interactive Controls</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Express Lanes */}
        <div className="space-y-1">
          <label className="text-xs text-gray-300 flex items-center justify-between">
            <span>Express Lanes</span>
            <span className="text-blue-400 font-mono">{controls.expressLanes}</span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={controls.expressLanes}
            onChange={(e) => setExpressLanes(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Mobile Orders % */}
        <div className="space-y-1">
          <label className="text-xs text-gray-300 flex items-center justify-between">
            <span>Mobile Orders</span>
            <span className="text-purple-400 font-mono">{controls.mobileOrdersPct}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={controls.mobileOrdersPct}
            onChange={(e) => setMobileOrdersPct(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Premium Seating % */}
        <div className="space-y-1">
          <label className="text-xs text-gray-300 flex items-center justify-between">
            <span>Premium Seating</span>
            <span className="text-yellow-400 font-mono">{controls.premiumSeatingPct}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={controls.premiumSeatingPct}
            onChange={(e) => setPremiumSeatingPct(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
          />
        </div>

        {/* Food Hall Count */}
        <div className="space-y-1">
          <label className="text-xs text-gray-300 flex items-center justify-between">
            <span>Food Halls</span>
            <span className="text-orange-400 font-mono">{controls.foodHallCount}</span>
          </label>
          <input
            type="range"
            min="0"
            max="2"
            value={controls.foodHallCount}
            onChange={(e) => setFoodHallCount(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Celebrity Merch Intensity */}
        <div className="space-y-1">
          <label className="text-xs text-gray-300 flex items-center justify-between">
            <span>Celebrity Merch</span>
            <span className="text-pink-400 font-mono">{controls.celebMerchIntensity}/5</span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={controls.celebMerchIntensity}
            onChange={(e) => setCelebMerchIntensity(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>

        {/* Modernization Level */}
        <div className="space-y-1">
          <label className="text-xs text-gray-300 flex items-center justify-between">
            <span>Modernization</span>
            <span className="text-cyan-400 font-mono">{controls.modernizationLevel}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={controls.modernizationLevel}
            onChange={(e) => setModernizationLevel(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* Off-Season Events */}
        <div className="space-y-1">
          <label className="text-xs text-gray-300 flex items-center justify-between">
            <span>Off-Season Events</span>
            <span className="text-green-400 font-mono">{controls.offSeasonEvents}</span>
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={controls.offSeasonEvents}
            onChange={(e) => setOffSeasonEvents(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>

        {/* International Store Toggle */}
        <div className="space-y-1">
          <label className="text-xs text-gray-300 flex items-center justify-between">
            <span>International Store</span>
            <span className={`text-xs font-semibold ${controls.internationalStore ? 'text-green-400' : 'text-gray-500'}`}>
              {controls.internationalStore ? 'ON' : 'OFF'}
            </span>
          </label>
          <button
            onClick={() => setInternationalStore(!controls.internationalStore)}
            className={`w-full h-8 rounded-lg font-semibold text-xs transition-all ${
              controls.internationalStore
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
            }`}
          >
            {controls.internationalStore ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-700">
        <p className="text-xs text-gray-400 text-center">
          Move sliders to see instant changes in queues, crowds, and revenue
        </p>
      </div>
    </div>
  );
}
