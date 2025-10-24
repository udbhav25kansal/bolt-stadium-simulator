import { create } from 'zustand';
import type { SnapshotData, SimulationControls, ServiceNode } from '../data/types';
import { calculateKPIs, calculateQueueLengths, calculateCrowdDistribution } from '../utils/kpiCalculator';

interface SimulationState {
  controls: SimulationControls;
  snapshot: SnapshotData;

  // Update control values - these trigger immediate recalculation
  setDay: (day: number) => void;
  setExpressLanes: (count: number) => void;
  setMobileOrdersPct: (pct: number) => void;
  setPremiumSeatingPct: (pct: number) => void;
  setFoodHallCount: (count: number) => void;
  setCelebMerchIntensity: (intensity: number) => void;
  setInternationalStore: (enabled: boolean) => void;
  setModernizationLevel: (level: number) => void;
  setOffSeasonEvents: (count: number) => void;

  // Recalculate all derived data
  recalculate: () => void;
}

// Base service nodes configuration
const BASE_NODES: Omit<ServiceNode, 'queueLength' | 'queueTimeMin'>[] = [
  { id: 'concession_A', type: 'concession', label: 'Concession A', position: [-18, 0, 12] },
  { id: 'concession_B', type: 'concession', label: 'Concession B', position: [18, 0, 12] },
  { id: 'pickup', type: 'pickup', label: 'Mobile Pickup', position: [-22, 0, 0] },
  { id: 'foodhall_1', type: 'foodhall', label: 'Food Hall', position: [15, 0, -15] },
  { id: 'team_store', type: 'store', label: 'Team Store', position: [22, 0, -8] },
  { id: 'gate_north', type: 'gate', label: 'Entry Gates', position: [0, 0, 24] },
];

// Initial controls
const INITIAL_CONTROLS: SimulationControls = {
  day: 0,
  expressLanes: 0,
  mobileOrdersPct: 0,
  premiumSeatingPct: 0,
  foodHallCount: 1,
  celebMerchIntensity: 0,
  internationalStore: false,
  modernizationLevel: 0,
  offSeasonEvents: 0,
};

export const useSimulationStore = create<SimulationState>((set, get) => ({
  controls: INITIAL_CONTROLS,
  snapshot: {
    kpis: calculateKPIs(INITIAL_CONTROLS),
    nodes: BASE_NODES.map(node => ({
      ...node,
      ...calculateQueueLengths(INITIAL_CONTROLS, node.id),
    })),
    premium_block: {
      enabled: false,
      label: 'Premium Club',
      seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]],
    },
    people_zones: calculateCrowdDistribution(INITIAL_CONTROLS),
    flags: {
      express_lanes: false,
      osb_enabled: false,
    },
  },

  recalculate: () => {
    const { controls } = get();

    try {
      const kpis = calculateKPIs(controls);
      const nodes = BASE_NODES.map(node => {
        // Hide foodhalls if count is 0
        if (node.type === 'foodhall' && controls.foodHallCount === 0) {
          return null;
        }

        const queueData = calculateQueueLengths(controls, node.id);

        return {
          ...node,
          queueLength: queueData.queueLength || 0,
          queueTimeMin: queueData.queueTimeMin || 0,
        };
      }).filter(Boolean) as ServiceNode[];

      const peopleZones = calculateCrowdDistribution(controls);

      set({
        snapshot: {
          kpis,
          nodes,
          premium_block: {
            enabled: controls.premiumSeatingPct > 0,
            label: 'Premium Club',
            seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]],
          },
          people_zones: peopleZones,
          flags: {
            express_lanes: controls.expressLanes > 0,
            osb_enabled: true,
          },
        },
      });
    } catch (error) {
      console.error('Error in recalculate:', error);
      // Keep previous state on error
    }
  },

  setDay: (day: number) => {
    const newControls = { ...get().controls, day };
    const kpis = calculateKPIs(newControls);
    const nodes = BASE_NODES.map(node => {
      if (node.type === 'foodhall' && newControls.foodHallCount === 0) return null;
      const queueData = calculateQueueLengths(newControls, node.id);
      return { ...node, queueLength: queueData.queueLength || 0, queueTimeMin: queueData.queueTimeMin || 0 };
    }).filter(Boolean) as ServiceNode[];

    set({
      controls: newControls,
      snapshot: {
        kpis,
        nodes,
        premium_block: { enabled: newControls.premiumSeatingPct > 0, label: 'Premium Club', seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]] },
        people_zones: calculateCrowdDistribution(newControls),
        flags: { express_lanes: newControls.expressLanes > 0, osb_enabled: true },
      },
    });
  },

  setExpressLanes: (count: number) => {
    console.log('setExpressLanes called with:', count);
    try {
      const newControls = { ...get().controls, expressLanes: count };
      console.log('newControls:', newControls);
      const kpis = calculateKPIs(newControls);
      console.log('kpis:', kpis);
      const nodes = BASE_NODES.map(node => {
        if (node.type === 'foodhall' && newControls.foodHallCount === 0) return null;
        const queueData = calculateQueueLengths(newControls, node.id);
        return { ...node, queueLength: queueData.queueLength || 0, queueTimeMin: queueData.queueTimeMin || 0 };
      }).filter(Boolean) as ServiceNode[];

      console.log('About to set state with:', { controls: newControls, kpis, nodes: nodes.length });
      set({
        controls: newControls,
        snapshot: {
          kpis,
          nodes,
          premium_block: { enabled: newControls.premiumSeatingPct > 0, label: 'Premium Club', seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]] },
          people_zones: calculateCrowdDistribution(newControls),
          flags: { express_lanes: newControls.expressLanes > 0, osb_enabled: true },
        },
      });
      console.log('State set successfully');
    } catch (error) {
      console.error('ERROR in setExpressLanes:', error);
    }
  },

  setMobileOrdersPct: (pct: number) => {
    const newControls = { ...get().controls, mobileOrdersPct: pct };
    const kpis = calculateKPIs(newControls);
    const nodes = BASE_NODES.map(node => {
      if (node.type === 'foodhall' && newControls.foodHallCount === 0) return null;
      const queueData = calculateQueueLengths(newControls, node.id);
      return { ...node, queueLength: queueData.queueLength || 0, queueTimeMin: queueData.queueTimeMin || 0 };
    }).filter(Boolean) as ServiceNode[];

    set({
      controls: newControls,
      snapshot: {
        kpis,
        nodes,
        premium_block: { enabled: newControls.premiumSeatingPct > 0, label: 'Premium Club', seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]] },
        people_zones: calculateCrowdDistribution(newControls),
        flags: { express_lanes: newControls.expressLanes > 0, osb_enabled: true },
      },
    });
  },

  setPremiumSeatingPct: (pct: number) => {
    const newControls = { ...get().controls, premiumSeatingPct: pct };
    const kpis = calculateKPIs(newControls);
    const nodes = BASE_NODES.map(node => {
      if (node.type === 'foodhall' && newControls.foodHallCount === 0) return null;
      const queueData = calculateQueueLengths(newControls, node.id);
      return { ...node, queueLength: queueData.queueLength || 0, queueTimeMin: queueData.queueTimeMin || 0 };
    }).filter(Boolean) as ServiceNode[];

    set({
      controls: newControls,
      snapshot: {
        kpis,
        nodes,
        premium_block: { enabled: newControls.premiumSeatingPct > 0, label: 'Premium Club', seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]] },
        people_zones: calculateCrowdDistribution(newControls),
        flags: { express_lanes: newControls.expressLanes > 0, osb_enabled: true },
      },
    });
  },

  setFoodHallCount: (count: number) => {
    const newControls = { ...get().controls, foodHallCount: count };
    const kpis = calculateKPIs(newControls);
    const nodes = BASE_NODES.map(node => {
      if (node.type === 'foodhall' && newControls.foodHallCount === 0) return null;
      const queueData = calculateQueueLengths(newControls, node.id);
      return { ...node, queueLength: queueData.queueLength || 0, queueTimeMin: queueData.queueTimeMin || 0 };
    }).filter(Boolean) as ServiceNode[];

    set({
      controls: newControls,
      snapshot: {
        kpis,
        nodes,
        premium_block: { enabled: newControls.premiumSeatingPct > 0, label: 'Premium Club', seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]] },
        people_zones: calculateCrowdDistribution(newControls),
        flags: { express_lanes: newControls.expressLanes > 0, osb_enabled: true },
      },
    });
  },

  setCelebMerchIntensity: (intensity: number) => {
    const newControls = { ...get().controls, celebMerchIntensity: intensity };
    const kpis = calculateKPIs(newControls);
    const nodes = BASE_NODES.map(node => {
      if (node.type === 'foodhall' && newControls.foodHallCount === 0) return null;
      const queueData = calculateQueueLengths(newControls, node.id);
      return { ...node, queueLength: queueData.queueLength || 0, queueTimeMin: queueData.queueTimeMin || 0 };
    }).filter(Boolean) as ServiceNode[];

    set({
      controls: newControls,
      snapshot: {
        kpis,
        nodes,
        premium_block: { enabled: newControls.premiumSeatingPct > 0, label: 'Premium Club', seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]] },
        people_zones: calculateCrowdDistribution(newControls),
        flags: { express_lanes: newControls.expressLanes > 0, osb_enabled: true },
      },
    });
  },

  setInternationalStore: (enabled: boolean) => {
    const newControls = { ...get().controls, internationalStore: enabled };
    const kpis = calculateKPIs(newControls);
    const nodes = BASE_NODES.map(node => {
      if (node.type === 'foodhall' && newControls.foodHallCount === 0) return null;
      const queueData = calculateQueueLengths(newControls, node.id);
      return { ...node, queueLength: queueData.queueLength || 0, queueTimeMin: queueData.queueTimeMin || 0 };
    }).filter(Boolean) as ServiceNode[];

    set({
      controls: newControls,
      snapshot: {
        kpis,
        nodes,
        premium_block: { enabled: newControls.premiumSeatingPct > 0, label: 'Premium Club', seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]] },
        people_zones: calculateCrowdDistribution(newControls),
        flags: { express_lanes: newControls.expressLanes > 0, osb_enabled: true },
      },
    });
  },

  setModernizationLevel: (level: number) => {
    const newControls = { ...get().controls, modernizationLevel: level };
    const kpis = calculateKPIs(newControls);
    const nodes = BASE_NODES.map(node => {
      if (node.type === 'foodhall' && newControls.foodHallCount === 0) return null;
      const queueData = calculateQueueLengths(newControls, node.id);
      return { ...node, queueLength: queueData.queueLength || 0, queueTimeMin: queueData.queueTimeMin || 0 };
    }).filter(Boolean) as ServiceNode[];

    set({
      controls: newControls,
      snapshot: {
        kpis,
        nodes,
        premium_block: { enabled: newControls.premiumSeatingPct > 0, label: 'Premium Club', seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]] },
        people_zones: calculateCrowdDistribution(newControls),
        flags: { express_lanes: newControls.expressLanes > 0, osb_enabled: true },
      },
    });
  },

  setOffSeasonEvents: (count: number) => {
    const newControls = { ...get().controls, offSeasonEvents: count };
    const kpis = calculateKPIs(newControls);
    const nodes = BASE_NODES.map(node => {
      if (node.type === 'foodhall' && newControls.foodHallCount === 0) return null;
      const queueData = calculateQueueLengths(newControls, node.id);
      return { ...node, queueLength: queueData.queueLength || 0, queueTimeMin: queueData.queueTimeMin || 0 };
    }).filter(Boolean) as ServiceNode[];

    set({
      controls: newControls,
      snapshot: {
        kpis,
        nodes,
        premium_block: { enabled: newControls.premiumSeatingPct > 0, label: 'Premium Club', seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]] },
        people_zones: calculateCrowdDistribution(newControls),
        flags: { express_lanes: newControls.expressLanes > 0, osb_enabled: true },
      },
    });
  },
}));
