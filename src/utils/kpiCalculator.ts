import type { KPIData, ServiceNode, PeopleZone, SimulationControls } from '../data/types';
import { BASELINE, LIFT_FACTORS, timelineMultiplier } from '../config/businessRules';

/**
 * Calculate KPIs based on simulation controls in real-time
 * Uses documented business rules from businessRules.ts (VCFC 2024 actual data)
 * This engine responds to every slider/toggle change
 * Timeline: Month 0 (baseline) → Month 12 (Year 1 end state)
 */
export function calculateKPIs(controls: SimulationControls): KPIData {
  // Timeline progression (natural improvements over 12 months)
  // Month 0-3: Quick wins phase (+10% improvement)
  // Month 4-12: Medium-term growth (+12% additional improvement)
  const timeMultiplier = timelineMultiplier(controls.day); // 'day' field stores month number (0-12)

  // ========================================================================
  // F&B PER CAPITA
  // ========================================================================
  let fnbPerCapita = BASELINE.currentFnbPerCapita;

  // Apply timeline improvement
  fnbPerCapita *= timeMultiplier;

  // Mobile orders: convenience + upsells
  fnbPerCapita *= 1 + (controls.mobileOrdersPct / 100) * LIFT_FACTORS.mobileOrders.fnbLiftPerFan;

  // Food halls: more variety = more spend
  fnbPerCapita += controls.foodHallCount * LIFT_FACTORS.foodHall.fnbLiftPerFan;

  // Express lanes: faster service = more purchases
  fnbPerCapita += controls.expressLanes * LIFT_FACTORS.expressLane.fnbLiftPerFan;

  // Celebrity merch: drives higher basket
  fnbPerCapita *= 1 + (controls.celebMerchIntensity * LIFT_FACTORS.celebMerch.basketSizeLift);

  // Modernization: seamless experience
  fnbPerCapita *= 1 + (controls.modernizationLevel / 100) * LIFT_FACTORS.modernization.fnbLiftPerFan;

  // Premium seating: higher spenders
  const premiumEffect = (controls.premiumSeatingPct / 100) * (LIFT_FACTORS.premiumSeating.fnbMultiplier - 1);
  fnbPerCapita *= 1 + premiumEffect * 0.5; // Blended average

  // ========================================================================
  // QUEUE TIME (lower is better)
  // ========================================================================
  let queueTime = BASELINE.avgQueueTimeMin;

  // Timeline improvement
  queueTime /= timeMultiplier;

  // Express lanes: direct queue reduction
  queueTime *= 1 - (controls.expressLanes * LIFT_FACTORS.expressLane.queueTimeReductionPct);

  // Mobile orders: bypass physical lines
  queueTime *= 1 - (controls.mobileOrdersPct / 100) * LIFT_FACTORS.mobileOrders.queueTimeReductionPct;

  // Food halls: distribute crowd
  queueTime *= 1 - (controls.foodHallCount * LIFT_FACTORS.foodHall.queueTimeReductionPct);

  // Modernization: self-checkout, cashless
  queueTime *= 1 - (controls.modernizationLevel / 100) * LIFT_FACTORS.modernization.queueTimeReductionPct;

  queueTime = Math.max(queueTime, 1.0); // Minimum 1 minute

  // ========================================================================
  // ORDERS PER MINUTE (throughput)
  // ========================================================================
  let ordersPerMin = BASELINE.avgOrdersPerMin;

  // Timeline improvement
  ordersPerMin *= timeMultiplier;

  // Express lanes: increase throughput
  ordersPerMin *= 1 + (controls.expressLanes * LIFT_FACTORS.expressLane.throughputIncreasePct);

  // Mobile orders: effective capacity boost
  ordersPerMin *= 1 + (controls.mobileOrdersPct / 100) * LIFT_FACTORS.mobileOrders.throughputIncreasePct;

  // Food halls: more stations
  ordersPerMin *= 1 + (controls.foodHallCount * LIFT_FACTORS.foodHall.throughputIncreasePct);

  // Modernization: automation
  ordersPerMin *= 1 + (controls.modernizationLevel / 100) * LIFT_FACTORS.modernization.throughputIncreasePct;

  // ========================================================================
  // REVENUE (per event) - Based on VCFC 2024 actual data
  // ========================================================================
  const baseAttendance = BASELINE.avgAttendance;
  const premiumBoost = (controls.premiumSeatingPct / 100) * LIFT_FACTORS.premiumSeating.attendanceBoostPct;
  const attendance = baseAttendance * (1 + premiumBoost);

  // Start with baseline revenue per event from actual 2024 data
  let revenue = BASELINE.avgRevenuePerEvent;

  // Apply timeline multiplier (natural growth over 12 months)
  revenue *= timeMultiplier;

  // F&B Revenue impact (baseline: $199,483 per event)
  const fnbRevenue = BASELINE.foodServicesPerEvent;
  const fnbImpact = fnbRevenue * ((fnbPerCapita / BASELINE.currentFnbPerCapita) - 1);
  revenue += fnbImpact;

  // Premium seating expansion (baseline: $23,222 per event, target: +50%)
  const premiumRevenue = BASELINE.premiumSeatsPerEvent;
  const premiumImpact = premiumRevenue * (controls.premiumSeatingPct / 100) * LIFT_FACTORS.premiumSeating.revenueBoostPct;
  revenue += premiumImpact;

  // Merch revenue per event (baseline: $6,457,131 annual / ~100 events = $64,571 per event)
  const merchPerEvent = BASELINE.merchandiseRevenue / 100; // Rough estimate
  const merchConversion = BASELINE.currentMerchConversionRate *
    (1 + controls.celebMerchIntensity * LIFT_FACTORS.celebMerch.conversionRateLift) *
    (1 + (controls.internationalStore ? LIFT_FACTORS.internationalStore.conversionRateLift : 0));

  const merchBasket = BASELINE.avgMerchBasket *
    (1 + controls.celebMerchIntensity * LIFT_FACTORS.celebMerch.basketSizeLift);

  const merchImpact = (merchConversion / BASELINE.currentMerchConversionRate - 1) * merchPerEvent +
                      (merchBasket / BASELINE.avgMerchBasket - 1) * merchPerEvent;
  revenue += merchImpact;

  // International store boost
  if (controls.internationalStore) {
    revenue += merchPerEvent * LIFT_FACTORS.internationalStore.merchRevenueLift;
  }

  // Off-season events (additional revenue beyond regular matches)
  const offSeasonRevenue = controls.offSeasonEvents * LIFT_FACTORS.offSeasonEvents.revenuePerEvent / BASELINE.matchesPerYear;
  revenue += offSeasonRevenue;

  // Partner revenue from mobile orders
  const partnerRevenue = fnbRevenue * (controls.mobileOrdersPct / 100) * LIFT_FACTORS.mobileOrders.partnerRevenuePct;
  revenue += partnerRevenue;

  // Safety checks to prevent NaN or invalid values
  const safeFnb = isNaN(fnbPerCapita) || !isFinite(fnbPerCapita) ? BASELINE.currentFnbPerCapita : fnbPerCapita;
  const safeQueue = isNaN(queueTime) || !isFinite(queueTime) ? BASELINE.avgQueueTimeMin : queueTime;
  const safeOrders = isNaN(ordersPerMin) || !isFinite(ordersPerMin) ? BASELINE.avgOrdersPerMin : ordersPerMin;
  const safeRevenue = isNaN(revenue) || !isFinite(revenue) ? BASELINE.avgRevenuePerEvent : revenue;

  return {
    fnb_per_capita: Math.round(safeFnb * 10) / 10,
    queue_time_min: Math.round(safeQueue * 10) / 10,
    orders_per_min: Math.round(safeOrders),
    revenue_usd: Math.round(safeRevenue / 1000) * 1000, // Round to nearest 1000
  };
}

/**
 * Calculate queue lengths for each service node based on controls
 */
export function calculateQueueLengths(
  controls: SimulationControls,
  nodeId: string
): { queueLength: number; queueTimeMin: number } {
  try {
    // Base queue length
    let baseQueue = 20;

    // Adjust based on controls
    let queueMultiplier = 1;
    queueMultiplier *= Math.max(0, 1 - (controls.expressLanes * 0.12));
    queueMultiplier *= Math.max(0, 1 - (controls.mobileOrdersPct / 100) * 0.4);
    queueMultiplier *= Math.max(0, 1 - (controls.modernizationLevel / 100) * 0.3);
    queueMultiplier *= Math.max(0, 1 - (controls.day / 365) * 0.3);

    // Specific adjustments
    if (nodeId.includes('pickup')) {
      baseQueue *= 0.4; // Pickup has shorter queues
      queueMultiplier *= Math.max(0, 1 - (controls.mobileOrdersPct / 100) * 0.5); // Extra boost for mobile
    }

    if (nodeId.includes('foodhall')) {
      baseQueue *= 0.7; // Food halls handle more capacity
    }

    const queueLength = Math.max(0, Math.round(baseQueue * queueMultiplier));
    const queueTimeMin = Math.max(0.5, Math.round(queueLength * 0.3 * 10) / 10);

    return { queueLength, queueTimeMin };
  } catch (error) {
    console.error('Error calculating queue lengths:', error);
    return { queueLength: 10, queueTimeMin: 3.0 };
  }
}

/**
 * Calculate crowd distribution across zones
 */
export function calculateCrowdDistribution(controls: SimulationControls): PeopleZone[] {
  try {
    const baseAttendance = BASELINE.avgAttendance;
    const totalAttendance = baseAttendance * (1 + Math.max(0, controls.premiumSeatingPct / 100) * 0.2);

    // Calculate distribution
    const concourseRatio = 0.02 + (controls.foodHallCount * 0.01) + (controls.mobileOrdersPct / 100 * 0.01);
    const premiumRatio = controls.premiumSeatingPct / 100 * 0.05;
    const foodhallRatio = controls.foodHallCount * 0.015;
    const bowlRatio = Math.max(0, 1 - concourseRatio - premiumRatio - foodhallRatio);

    return [
      { id: 'concourse', count: Math.max(0, Math.round(totalAttendance * concourseRatio)) },
      { id: 'bowl', count: Math.max(0, Math.round(totalAttendance * bowlRatio)) },
      { id: 'foodhall', count: Math.max(0, Math.round(totalAttendance * foodhallRatio)) },
      { id: 'premium', count: Math.max(0, Math.round(totalAttendance * premiumRatio)) },
    ];
  } catch (error) {
    console.error('Error calculating crowd distribution:', error);
    return [
      { id: 'concourse', count: 300 },
      { id: 'bowl', count: 14500 },
      { id: 'foodhall', count: 100 },
      { id: 'premium', count: 100 },
    ];
  }
}
