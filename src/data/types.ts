export interface KPIData {
  fnb_per_capita: number;
  queue_time_min: number;
  orders_per_min: number;
  revenue_usd: number;
}

export interface ServiceNode {
  id: string;
  type: 'concession' | 'store' | 'gate' | 'pickup' | 'foodhall';
  label: string;
  position: [number, number, number];
  queueLength: number;
  queueTimeMin?: number;
}

export interface PremiumBlock {
  enabled: boolean;
  label: string;
  seats: Array<[number, number, number]>;
}

export interface PeopleZone {
  id: 'concourse' | 'bowl' | 'foodhall' | 'premium';
  count: number;
}

// Interactive controls that affect the simulation in real-time
export interface SimulationControls {
  day: number; // 0-365 timeline
  expressLanes: number; // Number of express lanes
  mobileOrdersPct: number; // 0-100% mobile orders via SuperApp
  premiumSeatingPct: number; // 0-100% premium seating capacity
  foodHallCount: number; // 0, 1, or 2 food halls
  celebMerchIntensity: number; // 0-5 celebrity merch drop intensity
  internationalStore: boolean; // ON/OFF
  modernizationLevel: number; // 0-100% modernization
  offSeasonEvents: number; // Number of off-season events
}

export interface VisibilityFlags {
  express_lanes: boolean;
  osb_enabled: boolean;
}

export interface SnapshotData {
  kpis: KPIData;
  nodes: ServiceNode[];
  premium_block: PremiumBlock;
  people_zones: PeopleZone[];
  flags: VisibilityFlags;
}
