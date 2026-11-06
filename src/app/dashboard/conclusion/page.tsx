'use client';

import { motion } from 'framer-motion';
import {
  BookmarkCheck,
  ExternalLink,
  BookOpen,
  Award,
  Globe,
  CheckCircle2,
  Download,
  Share2,
  FileCheck,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

const externalCitations = [
  {
    title: 'IEA Data and Statistics Hub',
    org: 'International Energy Agency (IEA)',
    desc: 'World Energy Balances, Global Solar PV Electricity Generation, and Renewables 2024 Market Forecasts.',
    url: 'https://www.iea.org/data-and-statistics',
    badge: 'IEA Official API',
  },
  {
    title: 'MNRE National Portal for Rooftop Solar',
    org: 'Ministry of New and Renewable Energy',
    desc: 'Guidelines for Grid-Connected Rooftop PV Phase-II, ALMM Manufacturer Lists, and PM Surya Ghar Subsidy Schemes.',
    url: 'https://mnre.gov.in',
    badge: 'Govt of India',
  },
  {
    title: 'International Solar Alliance (ISA)',
    org: 'ISA Headquarters (Gurugram)',
    desc: 'Towards 1000 Strategy: Mobilizing $1,000 billion in solar investments and bringing clean energy to 1 billion people.',
    url: 'https://isolaralliance.org',
    badge: 'Global Intergovernmental',
  },
  {
    title: 'NREL PVWatts & SAM Modeling Engine',
    org: 'National Renewable Energy Laboratory',
    desc: 'Standard solar irradiance databases, spectral mismatch factors, and single-diode performance simulation.',
    url: 'https://pvwatts.nrel.gov',
    badge: 'NREL DOE',
  },
  {
    title: 'Central Electricity Authority (CEA)',
    org: 'Ministry of Power, Govt of India',
    desc: 'Monthly Generation Reports, Installed Capacity Station Data, and Technical Standards for Connectivity to the Grid.',
    url: 'https://cea.nic.in',
    badge: 'Statutory Authority',
  },
  {
    title: 'Central Electricity Regulatory Commission (CERC)',
    org: 'CERC India',
    desc: 'Terms & Conditions for Tariff Determination from Renewable Energy Sources Regulations and Section 63 Bidding Benchmarks.',
    url: 'https://cercind.gov.in',
    badge: 'Tariff Regulator',
  },
];

const keyTakeaways = [
  {
    num: '01',
    title: 'Techno-Economic Superiority of Solar PV',
    text: 'India’s solar tariff plummeted by 69% from ₹6.47/kWh in 2010 to ₹1.99–2.18/kWh today, establishing utility and rooftop solar PV as the lowest levelized cost of energy (LCOE) generation source nationwide.',
  },
  {
    num: '02',
    title: 'Single-Diode Model Accuracy & Environmental Sensitivity',
    text: 'Module open-circuit voltage (Voc) exhibits an intrinsic negative temperature coefficient (-0.29%/°C), requiring string sizing based on minimum site ambient temperatures to avoid inverter overvoltage trips while compensating for summer voltage drop.',
  },
  {
    num: '03',
    title: 'IEC 61724-1 Performance Ratio as the Gold Standard',
    text: 'The campus 70 kWp rooftop installation demonstrates an operational Performance Ratio of 78.4%, with monthly solar yields of ~1,24,320 kWh/year eliminating 73.4 tonnes of CO₂ emissions annually in synergy with campus wind and biomass resources.',
  },
  {
    num: '04',
    title: 'Proactive Thermographic & Electrical O&M',
    text: 'Quarterly infrared thermography and periodic clamp-meter Voc/Isc testing detect localized hot-spots, bypass diode shorts, and soiling penalties before they cause irreversible EVA delamination or backsheet failure.',
  },
  {
    num: '05',
    title: 'Regulatory Enablers & the 500 GW 2030 Mandate',
    text: 'Policy instruments including ISTS transmission charge waivers, Section 63 TBCB transparency, ALMM quality mandates, and 43.33% RPO requirements create robust regulatory certainty toward India’s 500 GW clean energy horizon.',
  },
];

const courseCompetencies = [
  { module: 'Module I: Semiconductor PV Physics', topics: 'Bandgap energy, Shockley-Read-Hall recombination, AM1.5G spectral irradiance, single-diode equations.' },
  { module: 'Module II: Technology Comparison', topics: 'Mono PERC, TOPCon, HJT, thin film CdTe / a-Si, bifaciality factors, temperature coefficients.' },
  { module: 'Module III: Engineering Design & Sizing', topics: 'Peak Sun Hours (PSH), inverter DC/AC oversizing (1.15–1.25), voltage drop calculations, string sizing.' },
  { module: 'Module IV: Campus Energy Auditing', topics: 'Net-metering bidirectional logging, TANGEDCO peak load shifting, clean energy yield indexing.' },
  { module: 'Module V: Operation & Diagnostics', topics: 'Voc/Isc fault isolation, bypass diode replacement, megger testing, thermographic hot-spot detection.' },
  { module: 'Module VI: Policy & Indian Electricity Acts', topics: 'Section 63 Electricity Act 2003, Electricity Rules 2022, PM-KUSUM, Rooftop Solar Phase II, ALMM.' },
];

export default function ConclusionPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <div className="flex items-center gap-2">
          <BookmarkCheck className="w-5 h-5 text-emerald-400" />
          <h1 className="text-2xl font-bold text-foreground">
            Conclusion & <span className="gradient-text-solar">Reference Repository</span>
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Field study synthesis · Citation index · Verified external data portals · PHY2100 Course Outcomes
        </p>
      </motion.div>

      {/* Hero Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl border border-border relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-orange-400" />
              <span className="font-mono text-xs font-semibold text-orange-400 uppercase tracking-wider">
                PHY2100: Solar Photovoltaic Field Study Report
              </span>
            </div>
            <h2 className="text-lg font-bold text-foreground">
              Executive Field Summary & Sustainability Verification
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted/30 hover:bg-muted text-xs font-medium text-foreground transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Print / Export Report
            </button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
          This analytics platform distills the technical and operational findings of the PHY2100 on-site field study.
          By integrating empirical campus energy records (50 kW + 20 kW rooftop arrays, TANGEDCO bidirectional net metering,
          and micro-wind turbines) with global energy benchmarks from the International Energy Agency (IEA) and statutory 
          Indian policy targets (MNRE 500 GW pledge), the platform bridges theoretical semiconductor physics with real-world 
          clean energy asset management.
        </p>
      </motion.div>

      {/* 5 Core Takeaways */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5 rounded-2xl border border-border space-y-4"
      >
        <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Key Analytical & Empirical Takeaways
        </h2>

        <div className="space-y-3">
          {keyTakeaways.map((item) => (
            <div
              key={item.num}
              className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col sm:flex-row sm:items-start gap-3.5"
            >
              <span className="font-mono text-base font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg self-start">
                {item.num}
              </span>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Course Outcomes & Syllabus Mapping */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-card p-5 rounded-2xl border border-border space-y-4"
      >
        <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-400" />
          PHY2100 Course Outcomes & Pedagogical Attainment Matrix
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {courseCompetencies.map((comp) => (
            <div key={comp.module} className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{comp.module}</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{comp.topics}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* External Citation & Reference Hub */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5 rounded-2xl border border-border space-y-4"
      >
        <div>
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            Verified External Data Hub & Primary Literature Citations
          </h2>
          <p className="text-xs text-muted-foreground">
            Official statutory agencies, open datasets, and international regulatory repositories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {externalCitations.map((cite) => (
            <a
              key={cite.title}
              href={cite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-border bg-muted/15 hover:border-orange-500/50 hover:bg-muted/30 transition-all flex flex-col justify-between group space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-muted/80 text-foreground">
                    {cite.badge}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-orange-400 transition-colors" />
                </div>
                <h3 className="text-xs font-bold text-foreground group-hover:text-orange-400 transition-colors">
                  {cite.title}
                </h3>
                <p className="text-[11px] font-medium text-muted-foreground/80 mt-0.5">{cite.org}</p>
                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">{cite.desc}</p>
              </div>

              <div className="pt-2 border-t border-border/50 text-[10px] font-mono text-orange-400/80 truncate">
                {cite.url}
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
