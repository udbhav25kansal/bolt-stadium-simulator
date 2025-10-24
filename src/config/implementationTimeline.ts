/**
 * 12-Month Implementation Timeline for VCFC Stadium Transformation
 * Guides stadium operators/owners on what to implement and when
 */

export interface TimelineAction {
  title: string;
  description: string;
  category: 'app' | 'stadium' | 'fnb' | 'merch' | 'osb' | 'review';
  impact: string; // Money logic / benefit
  priority: 'critical' | 'high' | 'medium';
}

export interface MonthlyMilestone {
  month: number;
  phase: string;
  subtitle: string;
  actions: TimelineAction[];
  goalposts: string[]; // Success criteria
  budgetGate?: {
    condition: string;
    decision: string;
  };
}

export const IMPLEMENTATION_TIMELINE: MonthlyMilestone[] = [
  {
    month: 0,
    phase: 'Baseline',
    subtitle: 'Current State - Before Transformation',
    actions: [
      {
        title: 'Document Current Operations',
        description: 'Measure baseline KPIs: F&B per capita, queue times, energy use, merch conversion',
        category: 'review',
        impact: 'Establishes metrics to track improvement',
        priority: 'critical',
      },
      {
        title: 'Stakeholder Alignment',
        description: 'Present 12-month plan to leadership and secure budget approval',
        category: 'review',
        impact: 'Ensures resources and support for transformation',
        priority: 'critical',
      },
    ],
    goalposts: [
      'Baseline KPIs documented',
      'Budget approved',
      'Implementation team assigned',
    ],
  },
  {
    month: 1,
    phase: 'Setup & Design',
    subtitle: 'Do the boring-but-important stuff',
    actions: [
      {
        title: 'Select App Developer',
        description: 'Choose vendor for SuperApp (food ordering, ticket wallet, merch)',
        category: 'app',
        impact: 'Lets fans buy faster and more often',
        priority: 'critical',
      },
      {
        title: 'Order Stadium Tech',
        description: 'Purchase LED lights, smart building controls (BAS), cashless checkout gear',
        category: 'stadium',
        impact: 'Lower power bills; serve more people per minute',
        priority: 'critical',
      },
      {
        title: 'Plan Premium Seating',
        description: 'Pick location for 1,000-seat Club Block',
        category: 'fnb',
        impact: 'Premium seats raise spend per fan',
        priority: 'high',
      },
      {
        title: 'Plan Food Halls',
        description: 'Choose 2 spots for Food Halls with diverse vendor options',
        category: 'fnb',
        impact: 'More food choices increase F&B spend',
        priority: 'high',
      },
      {
        title: 'Merch Strategy',
        description: 'Plan express pickup stands; line up 1 celebrity collab',
        category: 'merch',
        impact: 'Make buying easier and cooler',
        priority: 'high',
      },
    ],
    goalposts: [
      'App developer contract signed',
      'Stadium tech ordered',
      'Food hall locations confirmed',
      'Celebrity collab partner named',
    ],
  },
  {
    month: 2,
    phase: 'Setup & Design',
    subtitle: 'Do the boring-but-important stuff',
    actions: [
      {
        title: 'App Screen Designs',
        description: 'Design UX for food ordering, ticket wallet, merchandise shopping',
        category: 'app',
        impact: 'User-friendly design drives adoption',
        priority: 'critical',
      },
      {
        title: 'International Merch Planning',
        description: 'Plan international website with local payments (India, Japan, China)',
        category: 'merch',
        impact: 'New revenue beyond local market',
        priority: 'medium',
      },
      {
        title: 'Recruit OSB Bars',
        description: 'Sign up 10 local bars to host match watch-parties',
        category: 'osb',
        impact: 'Bars become mini-stadiums driving fandom',
        priority: 'medium',
      },
    ],
    goalposts: [
      'App mockups approved',
      '10 OSB bars confirmed',
      'International payment partners identified',
    ],
    budgetGate: {
      condition: 'Only proceed if vendors signed and pilot plan ready',
      decision: 'Gate 1: Vendors confirmed, pilot scope defined',
    },
  },
  {
    month: 3,
    phase: 'Build & Pilot',
    subtitle: 'Small real tests',
    actions: [
      {
        title: 'App MVP Launch',
        description: 'Turn on mobile food ordering in 2 stadium sections + 1 pickup counter',
        category: 'app',
        impact: 'Test technology with real fans',
        priority: 'critical',
      },
      {
        title: 'Express Checkout Pilot',
        description: 'Open 4 express cashless lanes connected to app',
        category: 'stadium',
        impact: '20% queue time reduction in pilot areas',
        priority: 'critical',
      },
      {
        title: 'LED/BAS Installation Start',
        description: 'Begin installing LED lights and smart building controls during non-event hours',
        category: 'stadium',
        impact: '5% energy savings in upgraded zones',
        priority: 'high',
      },
      {
        title: 'Food Hall Design Finalization',
        description: 'Complete design, get permits, select vendors (tacos, noodles, vegan, local beer)',
        category: 'fnb',
        impact: 'Diverse options drive higher spend',
        priority: 'high',
      },
    ],
    goalposts: [
      'App crash-free in pilot sections',
      'Queue time down 20% in pilot areas',
      'Energy use down 5% in upgraded zones',
    ],
  },
  {
    month: 4,
    phase: 'Build & Pilot',
    subtitle: 'Small real tests',
    actions: [
      {
        title: 'Merch Quick Wins',
        description: 'Add click-and-collect to app; test 1 pop-up store with express line',
        category: 'merch',
        impact: 'Faster checkout increases conversion',
        priority: 'high',
      },
      {
        title: 'OSB Bar Events',
        description: 'Host first 5 bar events with trivia + discounts',
        category: 'osb',
        impact: 'Build community beyond stadium',
        priority: 'medium',
      },
      {
        title: 'Pilot Review & Optimization',
        description: 'Analyze pilot data, fix bugs, optimize user flows',
        category: 'review',
        impact: 'Ensure scalability before stadium-wide launch',
        priority: 'critical',
      },
    ],
    goalposts: [
      'App stable with <2% crash rate',
      '500+ orders through app pilot',
      '5 OSB bar events completed',
    ],
    budgetGate: {
      condition: 'Only scale if pilot shows queue −20% and no major app bugs',
      decision: 'Gate 2: Proceed with stadium-wide rollout',
    },
  },
  {
    month: 5,
    phase: 'First Big Launch',
    subtitle: 'Turn on money taps',
    actions: [
      {
        title: 'App v1 Stadium-Wide Launch',
        description: 'Enable food ordering, wallet, and merch across entire stadium',
        category: 'app',
        impact: '15% of food orders through app',
        priority: 'critical',
      },
      {
        title: 'Double Express Lanes',
        description: 'Expand to 8 express checkout stations with clear signage',
        category: 'stadium',
        impact: 'Serve 2x more fans per minute',
        priority: 'critical',
      },
      {
        title: 'Off-Season Events',
        description: 'Host 2 concerts/large events in a cold month',
        category: 'stadium',
        impact: 'Revenue during traditionally empty months',
        priority: 'high',
      },
    ],
    goalposts: [
      '15% of food orders through app',
      '+5% F&B spend per fan on launch games',
      '2 off-season events booked with profit',
    ],
  },
  {
    month: 6,
    phase: 'First Big Launch',
    subtitle: 'Turn on money taps',
    actions: [
      {
        title: 'Celebrity Collab #1 Drop',
        description: 'Launch limited edition jersey/hoodie with free stadium pickup',
        category: 'merch',
        impact: 'Creates urgency and drives merch revenue',
        priority: 'high',
      },
      {
        title: 'Expand OSB Network',
        description: 'Grow to 15 bars, add in-app map and event RSVPs',
        category: 'osb',
        impact: 'Broader fan engagement beyond stadium',
        priority: 'medium',
      },
      {
        title: 'Mid-Year Review',
        description: 'Assess progress vs. targets, adjust roadmap if needed',
        category: 'review',
        impact: 'Stay on track for year-end goals',
        priority: 'critical',
      },
    ],
    goalposts: [
      '15 OSB bars active',
      'Celebrity collab generates 20% lift in merch',
      'First 6-month targets met',
    ],
    budgetGate: {
      condition: 'Only build Food Hall #2 if app orders ≥15% and +$1 per fan uplift seen',
      decision: 'Gate 3: Approve Food Hall #2 construction',
    },
  },
  {
    month: 7,
    phase: 'Build Premium',
    subtitle: 'Bigger upgrades',
    actions: [
      {
        title: 'Club Block Pilot',
        description: 'Install signage, better seating, in-seat service in 2 blocks (pilot)',
        category: 'fnb',
        impact: 'Premium fans spend 2x regular fans',
        priority: 'critical',
      },
      {
        title: 'Food Hall #1 Opening',
        description: 'Open first hall with 4-6 vendors + micro-brew tap wall',
        category: 'fnb',
        impact: '+$1 per fan in food hall areas',
        priority: 'critical',
      },
      {
        title: 'Complete LED/BAS Install',
        description: 'Finish installations, turn on full energy optimization',
        category: 'stadium',
        impact: '−15% energy use vs. baseline',
        priority: 'high',
      },
    ],
    goalposts: [
      '+$1 per fan average spend in food hall zone',
      'Club Block seats 70% sold for next 5 games',
      'Energy use −15% vs. baseline',
    ],
  },
  {
    month: 8,
    phase: 'Build Premium',
    subtitle: 'Bigger upgrades',
    actions: [
      {
        title: 'App Loyalty Points',
        description: 'Add loyalty rewards and one-tap "order again" re-buys',
        category: 'app',
        impact: 'Increases repeat purchases',
        priority: 'high',
      },
      {
        title: 'Food Hall Optimization',
        description: 'Analyze vendor performance, optimize menu and layout',
        category: 'fnb',
        impact: 'Maximize revenue per square foot',
        priority: 'medium',
      },
      {
        title: 'Premium Block Analysis',
        description: 'Review Club Block performance, plan full expansion',
        category: 'fnb',
        impact: 'Data-driven decision for 1,000-seat rollout',
        priority: 'high',
      },
    ],
    goalposts: [
      'App loyalty program live',
      'Food Hall #1 hitting revenue targets',
      'Club Block expansion plan approved',
    ],
  },
  {
    month: 9,
    phase: 'Go International & Scale',
    subtitle: 'Expand beyond local market',
    actions: [
      {
        title: 'International Shop Launch',
        description: 'Enable local payments + shipping for India, Japan, China markets',
        category: 'merch',
        impact: 'Double international sales to 20%',
        priority: 'critical',
      },
      {
        title: 'Celebrity Collab #2',
        description: 'Derby/rival game drop + livestream Q&A in app',
        category: 'merch',
        impact: 'Drives engagement and merchandise sales',
        priority: 'high',
      },
      {
        title: 'OSB Expansion',
        description: 'Reach 25 bars (add Seattle/Portland), run "Bar Cup" leaderboard',
        category: 'osb',
        impact: 'Regional fan base expansion',
        priority: 'medium',
      },
    ],
    goalposts: [
      'International merch share hits 15%',
      '25 OSB bars active',
      'App MAU +10k users',
    ],
    budgetGate: {
      condition: 'Expand Club Block to full 1,000 seats if 70% pre-sold',
      decision: 'Gate 4: Approve full Club Block expansion',
    },
  },
  {
    month: 10,
    phase: 'Go International & Scale',
    subtitle: 'Expand beyond local market',
    actions: [
      {
        title: 'Off-Season Event Push',
        description: 'Lock in 4 more events for next cold months (total 6 so far)',
        category: 'stadium',
        impact: '$600k+ revenue in off-season',
        priority: 'high',
      },
      {
        title: 'International Marketing',
        description: 'Launch targeted campaigns in international markets',
        category: 'merch',
        impact: 'Drive awareness and sales in new regions',
        priority: 'medium',
      },
      {
        title: 'App Feature Expansion',
        description: 'Add social features, fan polls, exclusive content',
        category: 'app',
        impact: 'Increase engagement and daily active users',
        priority: 'medium',
      },
    ],
    goalposts: [
      '6 off-season events completed',
      'International merch on track to 20%',
      'App engagement metrics up 30%',
    ],
  },
  {
    month: 11,
    phase: 'Finish the Set',
    subtitle: 'Lock in habits',
    actions: [
      {
        title: 'Food Hall #2 Opening',
        description: 'Open second hall with family-friendly vendors',
        category: 'fnb',
        impact: 'Further distribute crowds, increase F&B revenue',
        priority: 'critical',
      },
      {
        title: 'Full Club Block Launch',
        description: 'Expand to full 1,000 premium seats with waitlist',
        category: 'fnb',
        impact: '+$1.2M annual premium revenue',
        priority: 'critical',
      },
      {
        title: 'App v2 Features',
        description: 'Add seat delivery to more sections, push offers (halftime deals)',
        category: 'app',
        impact: 'Maximize revenue per user',
        priority: 'high',
      },
    ],
    goalposts: [
      '2 Food Halls operational',
      '1,000 Club Block seats sold',
      'Seat delivery available in 50% of stadium',
    ],
  },
  {
    month: 12,
    phase: 'Year-End Review',
    subtitle: 'Measure success & plan Year 2',
    actions: [
      {
        title: 'Final Off-Season Events',
        description: 'Complete 10 total off-season events for the year',
        category: 'stadium',
        impact: '$1.5M+ off-season revenue',
        priority: 'high',
      },
      {
        title: 'Annual KPI Review',
        description: 'Measure all KPIs vs. baseline and Year 1 targets',
        category: 'review',
        impact: 'Validate $24M revenue target achieved',
        priority: 'critical',
      },
      {
        title: 'Vendor & Sponsor Renewals',
        description: 'Re-sign successful vendors, negotiate Year 2 improvements',
        category: 'review',
        impact: 'Lock in partners for continued growth',
        priority: 'critical',
      },
      {
        title: 'Year 2 Planning',
        description: 'Build roadmap for $29M revenue target (Year 2)',
        category: 'review',
        impact: 'Sustain momentum toward 3-year goal',
        priority: 'critical',
      },
    ],
    goalposts: [
      '20% of F&B orders via app',
      '+8-10% F&B spend per fan overall',
      '10 off-season events completed',
      'International merch at 20%',
      'Energy use −17% locked in',
      '$24M revenue achieved',
    ],
  },
];

// Weekly KPI Scorecard - what to track every week
export interface KPIMetric {
  name: string;
  unit: string;
  baseline: number;
  month12Target: number;
  category: 'revenue' | 'operations' | 'engagement';
  priority: 'critical' | 'high' | 'medium';
}

export const WEEKLY_KPI_SCORECARD: KPIMetric[] = [
  {
    name: 'F&B per fan',
    unit: '$',
    baseline: 19.6,
    month12Target: 21.5, // +10% from food service optimization
    category: 'revenue',
    priority: 'critical',
  },
  {
    name: '% orders via app',
    unit: '%',
    baseline: 0,
    month12Target: 20,
    category: 'operations',
    priority: 'critical',
  },
  {
    name: 'Average queue time',
    unit: 'min',
    baseline: 6.5,
    month12Target: 4.5, // −30% from express lanes + app
    category: 'operations',
    priority: 'critical',
  },
  {
    name: 'Energy use per event',
    unit: 'kWh',
    baseline: 100, // Normalized to 100 for baseline
    month12Target: 83, // −17% from LED/BAS
    category: 'operations',
    priority: 'high',
  },
  {
    name: 'Merch conversion rate',
    unit: '%',
    baseline: 63.6,
    month12Target: 75, // Convert 20% of non-purchasers
    category: 'revenue',
    priority: 'high',
  },
  {
    name: 'International merch share',
    unit: '%',
    baseline: 10,
    month12Target: 20,
    category: 'revenue',
    priority: 'medium',
  },
  {
    name: 'OSB active bars',
    unit: '#',
    baseline: 0,
    month12Target: 25,
    category: 'engagement',
    priority: 'medium',
  },
  {
    name: 'Off-season events',
    unit: '#',
    baseline: 0,
    month12Target: 10,
    category: 'revenue',
    priority: 'high',
  },
  {
    name: 'Revenue per event',
    unit: '$',
    baseline: 661658,
    month12Target: 806897, // +22% to reach $24M annual
    category: 'revenue',
    priority: 'critical',
  },
];

// Helper function to get actions for a specific month
export function getActionsForMonth(month: number): MonthlyMilestone | null {
  return IMPLEMENTATION_TIMELINE.find(m => m.month === month) || null;
}

// Helper function to get current phase description
export function getPhaseForMonth(month: number): string {
  const milestone = getActionsForMonth(month);
  return milestone ? `${milestone.phase}: ${milestone.subtitle}` : 'Unknown Phase';
}

// Helper function to check if month has a budget gate
export function getBudgetGateForMonth(month: number): MonthlyMilestone['budgetGate'] | null {
  const milestone = getActionsForMonth(month);
  return milestone?.budgetGate || null;
}
