// India Solar Tariff Timeline — Competitive Bidding (₹/kWh)
// Based on MNRE/CERC tariff-based competitive bidding data

export interface TariffDataPoint {
  year: number;
  quarter?: string;
  tariff: number;       // ₹/kWh
  capacity: number;     // MW bid
  bidder?: string;
  project?: string;
  state?: string;
}

export const tariffTimeline: TariffDataPoint[] = [
  { year: 2010, tariff: 6.47, capacity: 150,  project: 'JNNSM Phase 1 Batch 1', state: 'Rajasthan' },
  { year: 2011, tariff: 5.90, capacity: 350,  project: 'JNNSM Phase 1 Batch 2', state: 'Various' },
  { year: 2012, tariff: 5.49, capacity: 250,  project: 'NTPC Tender', state: 'Rajasthan' },
  { year: 2013, tariff: 5.14, capacity: 500,  project: 'SECI Tender', state: 'Rajasthan' },
  { year: 2014, tariff: 4.68, capacity: 500,  project: 'NTPC REWA Pre-bid', state: 'MP' },
  { year: 2015, tariff: 4.34, capacity: 500,  project: 'SECI 500MW', state: 'Various' },
  { year: 2016, tariff: 3.49, capacity: 750,  project: 'REWA Solar Park', state: 'MP', bidder: 'ReNew Power' },
  { year: 2017, tariff: 2.44, capacity: 500,  project: 'SECI 500MW Bhadla', state: 'Rajasthan', bidder: 'SoftBank/SB Energy' },
  { year: 2017, quarter: 'Q4', tariff: 2.36, capacity: 1000, project: 'Bhadla Phase III & IV', state: 'Rajasthan' },
  { year: 2018, tariff: 2.44, capacity: 2000, project: 'SECI 2GW', state: 'Various' },
  { year: 2019, tariff: 2.55, capacity: 1500, project: 'GIPCL 400MW', state: 'Gujarat' },
  { year: 2020, tariff: 2.00, capacity: 500,  project: 'SECI 400MW Rajasthan', state: 'Rajasthan' },
  { year: 2021, tariff: 1.99, capacity: 500,  project: 'SECI 400MW Ultra Low', state: 'Rajasthan', bidder: 'Al Jomaih/NHPC' },
  { year: 2022, tariff: 2.14, capacity: 1000, project: 'NTPC 1GW Hybrid', state: 'Various' },
  { year: 2023, tariff: 2.21, capacity: 2000, project: 'SECI ISTS 2GW', state: 'Various' },
  { year: 2024, tariff: 2.18, capacity: 3000, project: 'SECI 3GW ISTS', state: 'Various' },
];

export const keyMilestones = [
  { year: 2010, event: 'JNNSM launched — ₹6.47/kWh opening tariff' },
  { year: 2016, event: 'Tariff breaks ₹4 barrier — Rewa Solar Park ₹3.49/kWh' },
  { year: 2017, event: 'Historic low ₹2.44/kWh — Bhadla Solar Park, Rajasthan' },
  { year: 2021, event: 'All-time low ₹1.99/kWh — SECI 400MW Rajasthan' },
  { year: 2022, event: 'Electricity Rules 2022 — Section 63 TBCB reforms' },
  { year: 2024, event: 'India targets 500 GW renewables by 2030' },
];
