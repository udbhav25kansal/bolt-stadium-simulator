/**
 * Business Rules & Lift Assumptions
 *
 * Simple, editable configuration for how each control affects the stadium operations.
 * These are the "starter lift" assumptions - adjust based on real data.
 */

// ============================================================================
// BASELINE DATA (From Vancouver City FC 2024 actual data)
// ============================================================================
export const BASELINE = {
  // Fanbase & Demographics
  totalFanbase: 70000, // Total registered fans
  avgAttendance: 15000, // Average attendance per match (based on 5.7 games × 70k fans / matches)
  capacityUtilization: 0.85, // 85% of seats filled on average

  // Current Financial Performance (2024 Actuals)
  currentFnbPerCapita: 19.6, // $19,948,319 F&B ÷ (15,000 attendance × matches) ≈ $19.60
  currentMerchConversionRate: 0.636, // 63.6% of fans bought merchandise (44,395/70,000)
  avgMerchBasket: 92, // Average merchandise purchase per buyer

  // Operations
  avgQueueTimeMin: 6.5, // minutes waiting in line (baseline assumption)
  avgOrdersPerMin: 85, // throughput across all concessions (baseline assumption)
  cashlessAdoptionRate: 0.40, // 40% currently use cashless

  // Costs (annual - 2024 actuals)
  utilitiesCostAnnual: 3469941, // $ per year (from stadium data)
  laborCostAnnual: 39646000, // $ per year (staff costs from stadium data)
  maintenanceCostAnnual: 7870000, // $ per year
  insuranceCostAnnual: 1920000, // $ per year

  // Revenue Streams (annual - 2024 actuals)
  totalRevenue2024: 19690647, // Net profit from stadium + merchandise
  stadiumNetProfit: 13233516, // Stadium operations net profit
  merchandiseRevenue: 6457131, // Total merchandise sales

  // Events
  matchesPerYear: 20, // Regular season games (estimated based on typical season)
  avgRevenuePerEvent: 661658, // Total stadium gross ÷ matches ($66,139,457 / 100 events)

  // Revenue breakdown per event (from stadium data)
  lowerBowlPerEvent: 246693, // $24,669,304 / 100
  foodServicesPerEvent: 199483, // $19,948,319 / 100
  advertisingPerEvent: 50990, // $5,098,950 / 100
  upperBowlPerEvent: 38557, // $3,855,705 / 100
  seasonTicketsPerEvent: 38075, // $3,807,502 / 100
  premiumSeatsPerEvent: 23222, // $2,322,177 / 100
};

// ============================================================================
// LIFT ASSUMPTIONS (How much each intervention helps)
// ============================================================================
export const LIFT_FACTORS = {
  // Express Lanes
  // Reduces queue time and increases throughput (from food service optimization recommendation)
  expressLane: {
    queueTimeReductionPct: 0.08, // -8% queue time per lane
    throughputIncreasePct: 0.10, // +10% orders per minute per lane
    fnbLiftPerFan: 0.40, // +$0.40 per fan (10% F&B increase target = $2M / 15k attendance / 20 games)
  },

  // Mobile Orders (SuperApp)
  // Mobile pre-ordering bypasses lines, creates upsell opportunities
  mobileOrders: {
    queueTimeReductionPct: 0.25, // -25% queue time at full adoption
    fnbLiftPerFan: 0.20, // +20% spend per capita
    throughputIncreasePct: 0.30, // +30% effective capacity
    partnerRevenuePct: 0.02, // +2% from delivery partner fees
  },

  // Premium Seating
  // Convert lower bowl sections to premium (recommendation: +$1.2M)
  premiumSeating: {
    fnbMultiplier: 2.0, // Premium fans spend 2x regular fans
    attendanceBoostPct: 0.05, // +5% from premium tier appeal
    revenueBoostPct: 0.50, // +50% premium revenue target ($2.3M → $3.5M)
  },

  // Food Hall
  // Variety drives higher spend (part of F&B optimization)
  foodHall: {
    fnbLiftPerFan: 0.30, // +$0.30 per fan per food hall
    throughputIncreasePct: 0.15, // +15% orders per minute
    queueTimeReductionPct: 0.10, // -10% queue time
    crowdShiftPct: 0.015, // 1.5% of crowd moves to food hall area
  },

  // Celebrity Merch Drops
  // Limited edition items (youth market expansion + product diversification)
  celebMerch: {
    conversionRateLift: 0.05, // +5% conversion per intensity level
    basketSizeLift: 0.08, // +8% basket size per intensity level
    revenueMultiplier: 0.08, // Contributes to merchandise growth
  },

  // International Store
  // International expansion (target: double international sales = $635k)
  internationalStore: {
    merchRevenueLift: 0.10, // +10% overall merch revenue
    conversionRateLift: 0.05, // +5% conversion rate for international segment
  },

  // Modernization (LED, BAS, Cashless)
  // Tech upgrades - tied to staff cost reduction (5% = $2M target)
  modernization: {
    queueTimeReductionPct: 0.20, // -20% queue time at full modernization
    throughputIncreasePct: 0.25, // +25% orders per minute
    fnbLiftPerFan: 0.15, // +15% spend (seamless experience)
    utilitySavingsPct: 0.10, // -10% utilities (conservative estimate)
    laborSavingsPct: 0.05, // -5% labor (matches recommendation)
  },

  // Off-Season Events
  // Non-match revenue (recommendation: 2-3 additional events per weak month = $2-3M)
  offSeasonEvents: {
    revenuePerEvent: 150000, // $ per off-season event (based on $2.5M / ~18 events target)
    attendancePerEvent: 8000, // Lower attendance than match days
    fnbPerCapita: 12.0, // Moderate F&B spend
  },

  // Timeline Progression
  // Natural improvements over the 12-month period (based on VCFC growth plan)
  timeline: {
    maxImprovementPct: 0.22, // Up to 22% improvement over year 1 (from insights: $19.7M → $24M)
    // This represents: quick wins + medium-term initiatives implemented gradually
    // Month 0-3: Quick wins ($2.9M expected value)
    // Month 4-12: Medium-term growth ($4.7M expected value)
  },
};

// ============================================================================
// CALCULATION HELPERS
// ============================================================================

/**
 * Calculate compound effect when multiple factors apply
 * (multiplicative, not additive - more realistic)
 */
export function compoundEffect(base: number, factors: number[]): number {
  return factors.reduce((acc, factor) => acc * (1 + factor), base);
}

/**
 * Calculate diminishing returns (each increment has less impact)
 * Common in economics - first express lane helps more than the 5th
 */
export function diminishingReturns(
  intensity: number,
  maxIntensity: number,
  baseEffect: number
): number {
  const normalized = intensity / maxIntensity;
  // Square root curve = diminishing returns
  return baseEffect * Math.sqrt(normalized) * intensity;
}

/**
 * Timeline progression multiplier for 12-month implementation
 * Uses non-linear growth: faster gains in first 3 months (quick wins),
 * then steady growth through month 12
 */
export function timelineMultiplier(month: number, maxMonths: number = 12): number {
  if (month === 0) return 1; // No change at baseline

  // Quick wins phase (months 1-3): accelerated growth
  if (month <= 3) {
    return 1 + (month / 3) * 0.10; // Up to 10% improvement in first 3 months
  }

  // Medium-term phase (months 4-12): steady linear growth
  const quickWinBoost = 0.10; // Gain from first 3 months
  const remainingMonths = month - 3;
  const remainingGrowth = 0.12; // Additional 12% gain over months 4-12

  return 1 + quickWinBoost + (remainingMonths / 9) * remainingGrowth;
}

// ============================================================================
// EXPORT EVERYTHING
// ============================================================================
export const BUSINESS_CONFIG = {
  baseline: BASELINE,
  lifts: LIFT_FACTORS,
};
