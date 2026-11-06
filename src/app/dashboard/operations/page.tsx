'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Search,
  ShieldCheck,
  ChevronRight,
  Flame,
  Zap,
  Activity,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  task: string;
  category: 'Module & Array' | 'Electrical & Inverter' | 'Mounting & Mechanical' | 'Safety & Grounds';
  frequency: 'Weekly' | 'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual';
  tool: string;
  acceptanceCriteria: string;
  completed: boolean;
}

const initialChecklist: ChecklistItem[] = [
  {
    id: 'm1',
    task: 'Robotic / Manual Module Cleaning',
    category: 'Module & Array',
    frequency: 'Weekly',
    tool: 'Demineralized water, soft microfiber wiper (< 6 bar)',
    acceptanceCriteria: 'Surface clean; zero abrasive scratching; soiling loss < 2%',
    completed: true,
  },
  {
    id: 'm2',
    task: 'Drone / Handheld Thermal IR Inspection',
    category: 'Module & Array',
    frequency: 'Quarterly',
    tool: 'FLIR E8-XT / DJI Matrice 300 RTK + H20T IR camera',
    acceptanceCriteria: 'ΔT hot-spot < 10°C; zero bypassed sub-strings',
    completed: true,
  },
  {
    id: 'm3',
    task: 'Junction Box & Bypass Diode Health Check',
    category: 'Module & Array',
    frequency: 'Bi-Annual',
    tool: 'Digital multimeter, forward diode bias mode',
    acceptanceCriteria: 'Forward voltage drop 0.5–0.7V; zero reverse leakage',
    completed: false,
  },
  {
    id: 'e1',
    task: 'DC String Voc & Isc Verification',
    category: 'Electrical & Inverter',
    frequency: 'Monthly',
    tool: 'Seaward PV200 Solar PV Tester / DC Clamp Meter',
    acceptanceCriteria: 'Voc within ±3% of predicted; string mismatch < 5%',
    completed: true,
  },
  {
    id: 'e2',
    task: 'Inverter Air Filter Cleaning & Heat-Sink Check',
    category: 'Electrical & Inverter',
    frequency: 'Monthly',
    tool: 'Compressed air canister / soft vacuum',
    acceptanceCriteria: 'Fans spinning without vibration; heatsink temp < 65°C',
    completed: false,
  },
  {
    id: 'e3',
    task: 'Insulation Resistance (Megger Test)',
    category: 'Electrical & Inverter',
    frequency: 'Bi-Annual',
    tool: '1000V Megohmmeter (Megger MIT400/2)',
    acceptanceCriteria: 'R_iso > 1 MΩ (positive to earth & negative to earth)',
    completed: true,
  },
  {
    id: 's1',
    task: 'Galvanized Structure Torque Verification',
    category: 'Mounting & Mechanical',
    frequency: 'Quarterly',
    tool: 'Calibrated digital torque wrench (15–20 Nm)',
    acceptanceCriteria: 'Zero fastener loosening; torque marks intact',
    completed: false,
  },
  {
    id: 's2',
    task: 'Cable Tray & Vermin Mesh Integrity Check',
    category: 'Mounting & Mechanical',
    frequency: 'Monthly',
    tool: 'Visual inspection & UV-resistant zip replacement',
    acceptanceCriteria: 'Zero cable sagging; mesh free of bird nests / rodents',
    completed: true,
  },
  {
    id: 'g1',
    task: 'Earth Pit Resistance & Chemical Treatment',
    category: 'Safety & Grounds',
    frequency: 'Bi-Annual',
    tool: '4-terminal Digital Earth Resistance Tester (IS 3043)',
    acceptanceCriteria: 'Total combined grid earth resistance < 1.0 Ω',
    completed: true,
  },
  {
    id: 'g2',
    task: 'SPD (Surge Protection Device) Cartridge Inspection',
    category: 'Safety & Grounds',
    frequency: 'Monthly',
    tool: 'Visual optical inspection window',
    acceptanceCriteria: 'Indicator flag is GREEN (Red indicates blown MOVs)',
    completed: true,
  },
];

interface DiagnosticCase {
  id: string;
  symptom: string;
  vocStatus: 'Normal' | 'Low' | 'Zero';
  iscStatus: 'Normal' | 'Low' | 'Zero';
  rootCause: string;
  severity: 'Critical' | 'Warning' | 'Low';
  solution: string;
  standardRef: string;
}

const diagnosticCases: DiagnosticCase[] = [
  {
    id: 'diag-1',
    symptom: 'Voc normal, Isc significantly low (> 20% drop)',
    vocStatus: 'Normal',
    iscStatus: 'Low',
    rootCause: 'Heavy localized soiling, module shading (trees/dust), or series interconnection resistive corrosion',
    severity: 'Warning',
    solution: 'Inspect string for localized shade obstacles; clean module face; measure individual module Isc with clamp meter to isolate affected panel.',
    standardRef: 'IEC 62446-1 Section 6.3',
  },
  {
    id: 'diag-2',
    symptom: 'Voc low (~33% or 66% drop), Isc normal',
    vocStatus: 'Low',
    iscStatus: 'Normal',
    rootCause: 'Activated or shorted bypass diode inside junction box due to cell partial shading or surge damage',
    severity: 'Warning',
    solution: 'Thermal imaging scan to identify heated diode box; perform multimeter forward/reverse diode conduction test; replace diode.',
    standardRef: 'IEC 61215-2 MQT 18',
  },
  {
    id: 'diag-3',
    symptom: 'Voc zero, Isc zero',
    vocStatus: 'Zero',
    iscStatus: 'Zero',
    rootCause: 'Blown DC string fuse in combiner box, tripped DC isolator switch, or open-circuit MC4 connector disconnect',
    severity: 'Critical',
    solution: 'Lockout/Tagout (LOTO) inverter; check DC fuse continuity; inspect all MC4 crimps and string disconnect switches.',
    standardRef: 'IS 16221 / IEC 62109',
  },
  {
    id: 'diag-4',
    symptom: 'Voc zero or drifting, Inverter displays "Earth Fault / R_iso Low"',
    vocStatus: 'Zero',
    iscStatus: 'Zero',
    rootCause: 'Ground fault caused by degraded cable insulation contacting wet metal mounting structure or vermin bite',
    severity: 'Critical',
    solution: 'Conduct Megger insulation test from (+) to ground and (-) to ground with array disconnected from inverter. Isolate faulty half-string.',
    standardRef: 'CEA Technical Standards 2010',
  },
  {
    id: 'diag-5',
    symptom: 'Voc slightly low, Isc slightly low, localized hot-spot > 20°C above ambient',
    vocStatus: 'Low',
    iscStatus: 'Low',
    rootCause: 'Cracked cell, solder ribbon detachment, or internal cell delamination (hot-spot heating)',
    severity: 'Critical',
    solution: 'Immediate thermal scan confirmation; take string offline to prevent backsheet fire hazard; replace module under warranty.',
    standardRef: 'IEC 61730-2 Fire Safety',
  },
];

const practicalSkills = [
  {
    skill: 'Single-Diode Model Characterization',
    desc: 'Extracting saturation current (I₀), ideality factor (n), series resistance (Rₛ), and shunt resistance (Rₛₕ) from raw I-V sweeps.',
    tag: 'PV Physics',
  },
  {
    skill: 'MC4 Connector Assembly & Crimping',
    desc: 'Precision stripper & ratcheting crimper usage for 4mm² and 6mm² solar PV DC solar cables ensuring waterproof IP68 seal.',
    tag: 'Field Craft',
  },
  {
    skill: 'IEC 61724-1 PR Performance Audit',
    desc: 'Calculating Weather-Corrected Performance Ratio, Reference Yield (Yᵣ), Array Yield (Yₐ), and Final Yield (Y_f).',
    tag: 'Green Audit',
  },
  {
    skill: 'Thermographic Drone Diagnostics',
    desc: 'Identifying cell snail trails, hot spots, PID (Potential-Induced Degradation), and cracked bypass diodes using FLIR radiometry.',
    tag: 'O&M Inspection',
  },
  {
    skill: 'Lockout / Tagout (LOTO) & Arc Flash Safety',
    desc: 'Safe isolation of 1000V DC arrays, discharging inverter DC link capacitors, and PPE category compliance.',
    tag: 'Safety Standards',
  },
  {
    skill: 'Net Metering Synchronization',
    desc: 'Configuring anti-islanding protection (IEEE 1547 / IEC 62116), total harmonic distortion (THD < 3%), and bi-directional energy logging.',
    tag: 'Grid Integration',
  },
];

export default function OperationsPage() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedDiag, setSelectedDiag] = useState<DiagnosticCase>(diagnosticCases[0]);
  const [vocFilter, setVocFilter] = useState<'All' | 'Normal' | 'Low' | 'Zero'>('All');
  const [iscFilter, setIscFilter] = useState<'All' | 'Normal' | 'Low' | 'Zero'>('All');

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const categories = ['All', 'Module & Array', 'Electrical & Inverter', 'Mounting & Mechanical', 'Safety & Grounds'];

  const filteredChecklist = checklist.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const completedCount = checklist.filter((c) => c.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const filteredDiagnostics = diagnosticCases.filter((d) => {
    if (vocFilter !== 'All' && d.vocStatus !== vocFilter) return false;
    if (iscFilter !== 'All' && d.iscStatus !== iscFilter) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-400" />
          <h1 className="text-2xl font-bold text-foreground">
            Operations, <span className="gradient-text-solar">Maintenance</span> & Skills Gained
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Preventive maintenance matrices · Anomaly troubleshooting decision tree · Hands-on field competency log
        </p>
      </motion.div>

      {/* Progress & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 rounded-xl border border-border"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">O&M Protocol Compliance</span>
            <span className="font-mono text-sm font-bold text-amber-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            {completedCount} of {checklist.length} core tasks inspected
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 rounded-xl border border-border"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>Thermal IR Health</span>
          </div>
          <p className="font-mono text-lg font-bold text-foreground">No Critical Hotspots</p>
          <p className="text-[11px] text-emerald-400">ΔT max = 4.2°C (within tolerance)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 rounded-xl border border-border"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ground Resistance</span>
          </div>
          <p className="font-mono text-lg font-bold text-foreground">0.78 Ω</p>
          <p className="text-[11px] text-muted-foreground">Complies with IS 3043 (&lt; 1.0 Ω)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 rounded-xl border border-border"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Next Scheduled Overhaul</span>
          </div>
          <p className="font-mono text-lg font-bold text-foreground">In 14 Days</p>
          <p className="text-[11px] text-muted-foreground">Quarterly Inverter & Torque Audit</p>
        </motion.div>
      </div>

      {/* Predictive Maintenance Schedule & Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5 rounded-2xl border border-border space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              Predictive Maintenance Schedule & Checklist Matrix
            </h2>
            <p className="text-xs text-muted-foreground">
              IEC 62446 & MNRE-aligned preventive maintenance intervals for rooftop PV
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-muted/40 text-muted-foreground hover:bg-muted/70 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Checklist Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground font-semibold">
                <th className="py-2.5 px-3 w-10">Done</th>
                <th className="py-2.5 px-3">Maintenance Task</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Cadence</th>
                <th className="py-2.5 px-3">Equipment / Standard</th>
                <th className="py-2.5 px-3">Acceptance Criteria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredChecklist.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`cursor-pointer transition-colors ${
                    item.completed ? 'bg-muted/10 hover:bg-muted/20' : 'hover:bg-muted/30'
                  }`}
                >
                  <td className="py-3 px-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCheck(item.id);
                      }}
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                        item.completed
                          ? 'bg-emerald-500 border-emerald-500 text-black'
                          : 'border-border hover:border-amber-400'
                      }`}
                    >
                      {item.completed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                  </td>
                  <td className="py-3 px-3 font-medium text-foreground">
                    <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                      {item.task}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground whitespace-nowrap">{item.category}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground font-mono text-[10px]">
                      {item.frequency}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-muted-foreground">{item.tool}</td>
                  <td className="py-3 px-3 text-emerald-400/90 font-mono text-[11px]">
                    {item.acceptanceCriteria}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* PV Diagnostic Flowchart & Troubleshooting Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-card p-5 rounded-2xl border border-border space-y-4"
      >
        <div>
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-400" />
            Diagnostic Flowchart: Voc / Isc Anomaly Isolation
          </h2>
          <p className="text-xs text-muted-foreground">
            Systematic fault isolation protocol using clamp multimeter & IV curve tracing
          </p>
        </div>

        {/* Anomaly selector filters */}
        <div className="flex flex-wrap items-center gap-4 p-3 bg-muted/30 rounded-xl border border-border/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">Measured Voc:</span>
            {(['All', 'Normal', 'Low', 'Zero'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVocFilter(v)}
                className={`px-2 py-0.5 rounded font-mono ${
                  vocFilter === v
                    ? 'bg-orange-500 text-white font-bold'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">Measured Isc:</span>
            {(['All', 'Normal', 'Low', 'Zero'] as const).map((i) => (
              <button
                key={i}
                onClick={() => setIscFilter(i)}
                className={`px-2 py-0.5 rounded font-mono ${
                  iscFilter === i
                    ? 'bg-blue-500 text-white font-bold'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* Split View: Case Cards and Detailed Diagnostic Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* List of cases */}
          <div className="lg:col-span-5 space-y-2.5">
            {filteredDiagnostics.map((d) => (
              <div
                key={d.id}
                onClick={() => setSelectedDiag(d)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedDiag.id === d.id
                    ? 'bg-orange-500/10 border-orange-500/50 shadow-sm'
                    : 'glass-card border-border hover:border-border/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-foreground">{d.symptom}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      d.severity === 'Critical'
                        ? 'bg-rose-500/20 text-rose-400'
                        : d.severity === 'Warning'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {d.severity}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                  <span>Voc: {d.vocStatus}</span>
                  <span>•</span>
                  <span>Isc: {d.iscStatus}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Diagnostic Detail */}
          <div className="lg:col-span-7 glass-card p-5 rounded-xl border border-border space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold">{selectedDiag.id}</span>
                <h3 className="text-sm font-bold text-foreground mt-0.5">{selectedDiag.symptom}</h3>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  selectedDiag.severity === 'Critical'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {selectedDiag.severity} Anomaly
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider mb-1">
                  Root Cause Investigation
                </p>
                <p className="text-foreground leading-relaxed bg-muted/20 p-2.5 rounded-lg border border-border/50">
                  {selectedDiag.rootCause}
                </p>
              </div>

              <div>
                <p className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider mb-1">
                  Corrective Action Protocol (SOP)
                </p>
                <div className="text-foreground leading-relaxed bg-emerald-500/10 text-emerald-300 p-2.5 rounded-lg border border-emerald-500/20">
                  {selectedDiag.solution}
                </div>
              </div>

              <div className="flex items-center justify-between text-muted-foreground text-[11px] pt-1">
                <span>Governing Standard:</span>
                <span className="font-mono text-foreground font-medium">{selectedDiag.standardRef}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Practical Learning & Skills Gained Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5 rounded-2xl border border-border space-y-4"
      >
        <div>
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            Practical Engineering Competencies & Course Outcomes (PHY2100)
          </h2>
          <p className="text-xs text-muted-foreground">
            Core vocational and analytical capabilities gained throughout the Solar Photovoltaic field curriculum
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {practicalSkills.map((sk) => (
            <div
              key={sk.skill}
              className="glass-card p-3.5 rounded-xl border border-border/80 hover:border-amber-500/40 transition-colors"
            >
              <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[10px] font-mono font-medium">
                {sk.tag}
              </span>
              <h3 className="text-xs font-bold text-foreground mt-2 mb-1">{sk.skill}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{sk.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
