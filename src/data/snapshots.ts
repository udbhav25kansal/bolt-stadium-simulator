import type { SnapshotData } from './types';

export const SNAPSHOTS: Record<number, SnapshotData> = {
  0: {
    kpis: {
      fnb_per_capita: 12.5,
      queue_time_min: 6.5,
      orders_per_min: 85,
      revenue_usd: 380000,
    },
    nodes: [
      {
        id: 'concession_A',
        type: 'concession',
        label: 'Concession A',
        position: [-18, 0, 12],
        queueLength: 22,
        queueTimeMin: 7.0,
      },
      {
        id: 'concession_B',
        type: 'concession',
        label: 'Concession B',
        position: [18, 0, 12],
        queueLength: 20,
        queueTimeMin: 6.5,
      },
      {
        id: 'pickup',
        type: 'concession',
        label: 'Pickup',
        position: [-22, 0, 0],
        queueLength: 8,
        queueTimeMin: 2.0,
      },
      {
        id: 'food_hall',
        type: 'concession',
        label: 'Food Hall',
        position: [15, 0, -15],
        queueLength: 15,
        queueTimeMin: 5.0,
      },
      {
        id: 'team_store',
        type: 'store',
        label: 'Entry Store',
        position: [22, 0, -8],
        queueLength: 12,
        queueTimeMin: 4.0,
      },
      {
        id: 'gate_north',
        type: 'gate',
        label: 'Entry Gates',
        position: [0, 0, 24],
        queueLength: 0,
      },
    ],
    premium_block: {
      enabled: false,
      label: 'Premium Club Block',
      seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]],
    },
    people_zones: [
      { id: 'concourse', count: 320 },
      { id: 'bowl', count: 14500 },
    ],
    flags: {
      express_lanes: false,
      osb_enabled: false,
    },
  },
  60: {
    kpis: {
      fnb_per_capita: 14.2,
      queue_time_min: 5.0,
      orders_per_min: 100,
      revenue_usd: 445000,
    },
    nodes: [
      {
        id: 'concession_A',
        type: 'concession',
        label: 'Concession A',
        position: [-18, 0, 12],
        queueLength: 18,
        queueTimeMin: 5.5,
      },
      {
        id: 'concession_B',
        type: 'concession',
        label: 'Concession B',
        position: [18, 0, 12],
        queueLength: 16,
        queueTimeMin: 5.0,
      },
      {
        id: 'pickup',
        type: 'concession',
        label: 'Pickup',
        position: [-22, 0, 0],
        queueLength: 6,
        queueTimeMin: 1.5,
      },
      {
        id: 'food_hall',
        type: 'concession',
        label: 'Food Hall',
        position: [15, 0, -15],
        queueLength: 12,
        queueTimeMin: 4.0,
      },
      {
        id: 'team_store',
        type: 'store',
        label: 'Entry Store',
        position: [22, 0, -8],
        queueLength: 10,
        queueTimeMin: 3.5,
      },
      {
        id: 'gate_north',
        type: 'gate',
        label: 'Entry Gates',
        position: [0, 0, 24],
        queueLength: 0,
      },
    ],
    premium_block: {
      enabled: true,
      label: 'Premium Club Block',
      seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]],
    },
    people_zones: [
      { id: 'concourse', count: 380 },
      { id: 'bowl', count: 15200 },
    ],
    flags: {
      express_lanes: true,
      osb_enabled: false,
    },
  },
  120: {
    kpis: {
      fnb_per_capita: 16.5,
      queue_time_min: 4.0,
      orders_per_min: 120,
      revenue_usd: 525000,
    },
    nodes: [
      {
        id: 'concession_A',
        type: 'concession',
        label: 'Concession A',
        position: [-18, 0, 12],
        queueLength: 18,
        queueTimeMin: 4.5,
      },
      {
        id: 'concession_B',
        type: 'concession',
        label: 'Concession B',
        position: [18, 0, 12],
        queueLength: 15,
        queueTimeMin: 4.0,
      },
      {
        id: 'pickup',
        type: 'concession',
        label: 'Pickup',
        position: [-22, 0, 0],
        queueLength: 6,
        queueTimeMin: 1.5,
      },
      {
        id: 'food_hall',
        type: 'concession',
        label: 'Food Hall',
        position: [15, 0, -15],
        queueLength: 12,
        queueTimeMin: 3.5,
      },
      {
        id: 'team_store',
        type: 'store',
        label: 'Entry Store',
        position: [22, 0, -8],
        queueLength: 9,
        queueTimeMin: 3.0,
      },
      {
        id: 'gate_north',
        type: 'gate',
        label: 'Entry Gates',
        position: [0, 0, 24],
        queueLength: 0,
      },
    ],
    premium_block: {
      enabled: true,
      label: 'Premium Club Block',
      seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]],
    },
    people_zones: [
      { id: 'concourse', count: 450 },
      { id: 'bowl', count: 16000 },
    ],
    flags: {
      express_lanes: true,
      osb_enabled: true,
    },
  },
  365: {
    kpis: {
      fnb_per_capita: 18.8,
      queue_time_min: 3.2,
      orders_per_min: 145,
      revenue_usd: 615000,
    },
    nodes: [
      {
        id: 'concession_A',
        type: 'concession',
        label: 'Concession A',
        position: [-18, 0, 12],
        queueLength: 14,
        queueTimeMin: 3.5,
      },
      {
        id: 'concession_B',
        type: 'concession',
        label: 'Concession B',
        position: [18, 0, 12],
        queueLength: 12,
        queueTimeMin: 3.0,
      },
      {
        id: 'pickup',
        type: 'concession',
        label: 'Pickup',
        position: [-22, 0, 0],
        queueLength: 5,
        queueTimeMin: 1.2,
      },
      {
        id: 'food_hall',
        type: 'concession',
        label: 'Food Hall',
        position: [15, 0, -15],
        queueLength: 10,
        queueTimeMin: 2.8,
      },
      {
        id: 'team_store',
        type: 'store',
        label: 'Entry Store',
        position: [22, 0, -8],
        queueLength: 7,
        queueTimeMin: 2.5,
      },
      {
        id: 'gate_north',
        type: 'gate',
        label: 'Entry Gates',
        position: [0, 0, 24],
        queueLength: 0,
      },
    ],
    premium_block: {
      enabled: true,
      label: 'Premium Club Block',
      seats: [[2, 2, -10], [6, 2, -10], [2, 2, -8], [6, 2, -8]],
    },
    people_zones: [
      { id: 'concourse', count: 520 },
      { id: 'bowl', count: 16800 },
    ],
    flags: {
      express_lanes: true,
      osb_enabled: true,
    },
  },
};

export function getSnapshot(day: number): SnapshotData {
  const keys = [0, 60, 120, 365];
  const closest = keys.reduce((prev, curr) =>
    Math.abs(curr - day) < Math.abs(prev - day) ? curr : prev
  );
  return SNAPSHOTS[closest];
}
