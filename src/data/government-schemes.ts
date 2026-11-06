// Government Solar Schemes & Policy Frameworks — India
// Source: MNRE, Ministry of Power, Ministry of Finance

export interface GovernmentScheme {
  id: string;
  name: string;
  fullName: string;
  ministry: string;
  targetGW: number;
  achievedGW: number;
  budget: string;
  status: 'Active' | 'Completed' | 'Pipeline';
  year: number;
  description: string;
  keyFeatures: string[];
  color: string;
}

export const governmentSchemes: GovernmentScheme[] = [
  {
    id: 'pm-kusum',
    name: 'PM-KUSUM',
    fullName: 'Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan',
    ministry: 'MNRE',
    targetGW: 34.2,
    achievedGW: 12.4,
    budget: '₹34,422 Cr',
    status: 'Active',
    year: 2019,
    description: 'Solar pumps and grid-connected solar for farmers',
    keyFeatures: ['Component A: 10 GW decentralized solar', 'Component B: 20 lakh solar pumps', 'Component C: Solarization of agriculture feeders'],
    color: '#22C55E',
  },
  {
    id: 'rooftop-phase2',
    name: 'Rooftop Solar Phase II',
    fullName: 'Grid Connected Rooftop Solar Programme Phase II',
    ministry: 'MNRE',
    targetGW: 40,
    achievedGW: 14.6,
    budget: '₹18,980 Cr',
    status: 'Active',
    year: 2019,
    description: 'Residential & institutional rooftop solar with subsidies',
    keyFeatures: ['40% subsidy for ≤2 kW', '20% subsidy for 2-3 kW', 'Net metering mandate', 'MNRE empanelled installers'],
    color: '#F97316',
  },
  {
    id: 'solar-parks',
    name: 'Solar Parks',
    fullName: 'Development of Solar Parks & Ultra Mega Solar Power Projects',
    ministry: 'MNRE',
    targetGW: 50,
    achievedGW: 32.1,
    budget: '₹8,100 Cr',
    status: 'Active',
    year: 2014,
    description: 'Large-scale solar parks with plug-and-play infrastructure',
    keyFeatures: ['50 parks across 21 states', 'Land acquisition support', 'Transmission infrastructure', 'Plug-and-play connectivity'],
    color: '#0EA5E9',
  },
  {
    id: 'ists-waiver',
    name: 'ISTS Charge Waiver',
    fullName: 'Inter-State Transmission System Charges & Losses Waiver',
    ministry: 'Ministry of Power',
    targetGW: 500,
    achievedGW: 180,
    budget: '₹35,000 Cr (est. waiver value)',
    status: 'Active',
    year: 2018,
    description: 'Waiver of ISTS charges for solar & wind till 2025',
    keyFeatures: ['Zero transmission charges for solar/wind', 'Extendable till June 2025', 'Boosts inter-state renewable trade', 'Approx. ₹1.0/unit savings'],
    color: '#8B5CF6',
  },
  {
    id: 'national-solar-mission',
    name: 'NSM / JNNSM',
    fullName: 'National Solar Mission / Jawaharlal Nehru National Solar Mission',
    ministry: 'MNRE',
    targetGW: 100,
    achievedGW: 73.3,
    budget: '₹1,00,000 Cr (cumulative)',
    status: 'Active',
    year: 2010,
    description: 'Flagship mission: 100 GW solar by 2022, now 500 GW by 2030',
    keyFeatures: ['Phase 1: 2010–13', 'Phase 2: 2013–17', 'Phase 3: 2017–22', '500 GW target by 2030'],
    color: '#EF4444',
  },
];

export const policyFramework = [
  {
    id: 'ea-2003',
    title: 'Electricity Act 2003',
    section: 'Section 63',
    description: 'Tariff-Based Competitive Bidding (TBCB) framework for procurement of power',
    relevance: 'All solar power procurement above 5 MW must follow TBCB guidelines',
  },
  {
    id: 'electricity-rules-2022',
    title: 'Electricity (Promoting Renewable Energy) Rules 2022',
    section: 'Rule 3–9',
    description: 'Must-run status for RE, RPO trajectory, green energy open access rules',
    relevance: 'Mandates 43.33% RPO by 2030 including 6.94% wind and 29.91% solar',
  },
  {
    id: 'rpo-schedule',
    title: 'RPO Schedule 2022–2030',
    section: 'Ministry of Power',
    description: 'Renewable Purchase Obligation escalation roadmap for obligated entities',
    relevance: 'Drives demand for solar certificates and grid-scale procurement',
  },
  {
    id: 'gazette-mnre-2024',
    title: 'MNRE Gazette Notification 2024',
    section: 'SO 1234(E)',
    description: 'Updated ALMM List, BIS certification requirements, domestic content clause',
    relevance: 'All government-funded solar installations must use ALMM-listed modules',
  },
];

export const indiaSolarTargets = {
  current2024: 73.3,  // GW installed
  target2030: 500,    // GW
  target2047: 1000,   // GW (Viksit Bharat)
  rooftop2024: 14.6,  // GW
  rooftopTarget: 40,  // GW by 2026
};
