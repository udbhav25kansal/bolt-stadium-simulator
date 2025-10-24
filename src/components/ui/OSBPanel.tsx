import { useSimulationStore } from '../../store/simulationStore';

export function OSBPanel() {
  const flags = useSimulationStore((state) => state.snapshot.flags);

  if (!flags.osb_enabled) return null;

  return (
    <div className="absolute bottom-8 right-4 z-20">
      <div className="bg-white/90 backdrop-blur rounded-lg p-4 shadow-lg w-48">
        <div className="text-sm font-semibold text-gray-900 mb-2">OSB</div>
        <div className="bg-gray-200 rounded aspect-square flex items-center justify-center">
          <svg
            className="w-full h-full p-4"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
          >
            <ellipse cx="50" cy="50" rx="40" ry="30" strokeWidth="2" />
            <rect x="30" y="35" width="40" height="20" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
