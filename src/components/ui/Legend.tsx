import { useSimulationStore } from '../../store/simulationStore';

export function Legend() {
  const flags = useSimulationStore((state) => state.snapshot.flags);
  const controls = useSimulationStore((state) => state.controls);

  return (
    <div className="absolute bottom-8 left-4 z-20">
      <div className="bg-white/90 backdrop-blur rounded-lg px-4 py-3 shadow-lg min-w-[150px]">
        <div className="text-sm font-semibold text-gray-900 mb-2">Active Features</div>
        <div className="space-y-1.5">
          {controls.expressLanes > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <span className="w-3 h-3 bg-blue-500 rounded"></span>
              <span>Express Lanes ({controls.expressLanes})</span>
            </div>
          )}
          {controls.mobileOrdersPct > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <span className="w-3 h-3 bg-purple-500 rounded"></span>
              <span>Mobile Orders ({controls.mobileOrdersPct}%)</span>
            </div>
          )}
          {controls.premiumSeatingPct > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <span className="w-3 h-3 bg-yellow-500 rounded"></span>
              <span>Premium Seating</span>
            </div>
          )}
          {controls.foodHallCount > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <span className="w-3 h-3 bg-orange-500 rounded"></span>
              <span>Food Hall ({controls.foodHallCount})</span>
            </div>
          )}
          {controls.internationalStore && (
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <span className="w-3 h-3 bg-green-500 rounded"></span>
              <span>International Store</span>
            </div>
          )}
          {controls.celebMerchIntensity > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <span className="w-3 h-3 bg-pink-500 rounded"></span>
              <span>Celebrity Merch</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
