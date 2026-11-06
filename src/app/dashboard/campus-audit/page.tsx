'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Zap,
  Wind,
  Grid3X3,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Download,
  Search,
  IndianRupee,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import CampusMonthlyBarChart from '@/components/charts/CampusMonthlyBarChart';
import { campusMonthlyData, inverterLogs, campusKPIs, systemSpecs } from '@/data/campus-audit';

const galleryImages = [
  {
    id: 1,
    title: 'Main Block Rooftop Solar Array (50 kWp)',
    desc: 'Monocrystalline PERC modules mounted on elevated GI structure with 15° tilt angle facing due South.',
    path: '/gallery/rooftop.jpg',
    tag: 'Array & PV Modules',
  },
  {
    id: 2,
    title: 'Central Inverter Room (50kW + 20kW)',
    desc: 'Dual grid-tied inverters (SMA Sunny Tripower 50000TL & Fronius Symo 20.0-3-M) with integrated DC disconnects.',
    path: '/gallery/inverter.jpg',
    tag: 'Power Electronics',
  },
  {
    id: 3,
    title: 'Bidirectional Net Energy Meter Panel',
    desc: 'TANGEDCO approved TOD bi-directional meter recording 11kV grid import, solar export, and reactive power.',
    path: '/gallery/netmeter.jpg',
    tag: 'Grid Synchronization',
  },
  {
    id: 4,
    title: 'Thermal Infrared (IR) Thermography',
    desc: 'Radiometric scan isolating localized cell hot-spots, bypass diode conduction, and micro-crack heat signatures.',
    path: '/gallery/thermal.jpg',
    tag: 'Diagnostics & O&M',
  },
  {
    id: 5,
    title: 'Campus Green Energy Tri-Generation System',
    desc: 'Hybrid clean ecosystem integrating 70 kWp solar PV, 10 kW micro-wind turbine, and STP biomass digestor.',
    path: '/gallery/biomass.jpg',
    tag: 'Campus Sustainability',
  },
];

const annualSummary = campusMonthlyData.reduce(
  (acc, d) => ({
    tangedco: acc.tangedco + d.tangedcoImport,
    solar: acc.solar + d.solarGeneration,
    wind: acc.wind + d.windGeneration,
    netExport: acc.netExport + d.netExport,
  }),
  { tangedco: 0, solar: 0, wind: 0, netExport: 0 }
);

export default function CampusAuditPage() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [inverterFilter, setInverterFilter] = useState('');

  // Keyboard navigation for image modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryOpen) return;
      if (e.key === 'ArrowRight') {
        setGalleryIdx((p) => (p === galleryImages.length - 1 ? 0 : p + 1));
      } else if (e.key === 'ArrowLeft') {
        setGalleryIdx((p) => (p === 0 ? galleryImages.length - 1 : p - 1));
      } else if (e.key === 'Escape') {
        setGalleryOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryOpen]);

  const handleExportMonthlyCSV = () => {
    const headers = 'Month,TANGEDCO Import (kWh),Solar Generation (kWh),Wind Generation (kWh),Net Export (kWh)\n';
    const rows = campusMonthlyData
      .map((d) => `${d.month},${d.tangedcoImport},${d.solarGeneration},${d.windGeneration},${d.netExport}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Campus_Green_Audit_Energy_Data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredInverters = inverterLogs.filter(
    (inv) =>
      inv.id.toLowerCase().includes(inverterFilter.toLowerCase()) ||
      inv.model.toLowerCase().includes(inverterFilter.toLowerCase()) ||
      inv.location.toLowerCase().includes(inverterFilter.toLowerCase()) ||
      inv.status.toLowerCase().includes(inverterFilter.toLowerCase())
  );

  const annualSavingsINR = Math.round(annualSummary.solar * 8.5); // Approx commercial tariff ₹8.50/unit

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <h1 className="text-2xl font-bold text-foreground">
                Campus Field Trip & <span className="gradient-text-solar">Audit Analytics</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-sm">
              Empirical Green Audit records · 70 kWp Rooftop Solar Arrays · TANGEDCO Net Metering · On-site Inspection
            </p>
          </div>

          <button
            onClick={handleExportMonthlyCSV}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-muted/30 hover:bg-muted text-xs font-semibold text-foreground transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Audit CSV</span>
          </button>
        </div>
      </motion.div>

      {/* System KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: 'Total Solar Capacity',
            value: `${campusKPIs.installedCapacity} kWp`,
            sub: '50 kW SMA + 20 kW Fronius',
            color: 'text-orange-400',
            bg: 'bg-orange-500/10',
          },
          {
            label: 'Solar Energy Fraction',
            value: `${campusKPIs.solarFraction}%`,
            sub: 'Of total campus electricity load',
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
          },
          {
            label: 'Performance Ratio (PR)',
            value: `${campusKPIs.performanceRatio}%`,
            sub: 'Audited under IEC 61724-1',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
          },
          {
            label: 'Electricity Bill Savings',
            value: `₹${(annualSavingsINR / 100000).toFixed(2)} Lakh`,
            sub: `Avoids ${campusKPIs.co2Avoided} t CO₂ annually`,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
          },
        ].map(({ label, value, sub, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`glass-card p-4 rounded-xl border border-border ${bg}`}
          >
            <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
            <p className={`font-mono text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Monthly Energy Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-card p-5 rounded-2xl border border-border space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">Monthly Campus Power Balance</h2>
            <p className="text-xs text-muted-foreground">
              TANGEDCO grid import vs rooftop solar PV generation & micro-wind power (kWh/month)
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <div className="text-right">
              <p className="text-muted-foreground text-[10px] uppercase">Annual Solar Yield</p>
              <p className="text-orange-400 font-bold">{annualSummary.solar.toLocaleString('en-IN')} kWh</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-[10px] uppercase">Annual Wind Yield</p>
              <p className="text-cyan-400 font-bold">{annualSummary.wind.toLocaleString('en-IN')} kWh</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-[10px] uppercase">Net Grid Export</p>
              <p className="text-emerald-400 font-bold">{annualSummary.netExport.toLocaleString('en-IN')} kWh</p>
            </div>
          </div>
        </div>
        <CampusMonthlyBarChart />
      </motion.div>

      {/* Inverter Inspection Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5 rounded-2xl border border-border space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">On-Site Inverter Telemetry & Inspection Log</h2>
            <p className="text-xs text-muted-foreground">
              Technical inspection parameters gathered during PHY2100 electrical plant walk-through
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={inverterFilter}
              onChange={(e) => setInverterFilter(e.target.value)}
              placeholder="Search inverters, models..."
              className="w-full bg-muted/40 border border-border/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-orange-500/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-semibold">
                {['Unit ID', 'Inverter Model', 'Rated Power', 'Installed Location', 'Daily Yield', 'Monthly Yield', 'Conversion η', 'Net Meter Reading', 'Status'].map(
                  (h) => (
                    <th key={h} className="text-left pb-2.5 pr-4 whitespace-nowrap">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredInverters.map((inv) => (
                <tr key={inv.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 pr-4 font-mono font-bold text-orange-400">{inv.id}</td>
                  <td className="py-3 pr-4 font-medium text-foreground">{inv.model}</td>
                  <td className="py-3 pr-4 font-mono font-semibold text-foreground">{inv.capacity}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{inv.location}</td>
                  <td className="py-3 pr-4 font-mono text-foreground">{inv.dailyGen} kWh</td>
                  <td className="py-3 pr-4 font-mono text-foreground">{inv.monthlyGen.toLocaleString()} kWh</td>
                  <td className="py-3 pr-4 font-mono text-emerald-400 font-bold">{inv.efficiency}%</td>
                  <td className="py-3 pr-4 font-mono text-foreground">{inv.netMeterReading.toLocaleString('en-IN')} kWh</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        inv.status === 'Normal'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {inv.status === 'Normal' ? (
                        <CheckCircle className="w-3 h-3 stroke-[2.5]" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
                      )}
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* System Technical Specs & Photo Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* System Specs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-6 glass-card p-5 rounded-2xl border border-border space-y-4"
        >
          <div>
            <h2 className="text-base font-semibold text-foreground">Balance of System (BOS) Specifications</h2>
            <p className="text-xs text-muted-foreground">Certified plant architecture verified by the green audit team</p>
          </div>

          <div className="space-y-2.5">
            {[
              { label: 'PV Module Make & Rating', value: `${systemSpecs.panels.count} × ${systemSpecs.panels.wattage}Wp ${systemSpecs.panels.type}` },
              { label: 'Total Array Footprint', value: `${systemSpecs.panels.area} m² (South orientation, 15° tilt)` },
              { label: 'String Config (50 kW Inverter)', value: `${systemSpecs.string.stringsPerInverter1} strings × ${systemSpecs.string.modulesPerString} modules in series` },
              { label: 'String Config (20 kW Inverter)', value: `${systemSpecs.string.stringsPerInverter2} strings × ${systemSpecs.string.modulesPerString2} modules in series` },
              { label: 'Mounting Structure', value: systemSpecs.mounting },
              { label: 'DC / AC Cabling', value: systemSpecs.cabling },
              { label: 'System Earthing', value: systemSpecs.earthing },
              { label: 'Surge & Lightning Protection', value: systemSpecs.lightning },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-4 text-xs border-b border-border/50 pb-2">
                <span className="text-muted-foreground flex-shrink-0">{label}</span>
                <span className="text-foreground font-medium text-right">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Photo Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-6 glass-card p-5 rounded-2xl border border-border space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">On-Site Field Visit Photo Gallery</h2>
              <p className="text-xs text-muted-foreground">5 verified field inspection stations (Click to enlarge)</p>
            </div>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 font-bold">
              {galleryImages.length} Stations
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {galleryImages.map((img, i) => (
              <button
                key={img.id}
                onClick={() => {
                  setGalleryIdx(i);
                  setGalleryOpen(true);
                }}
                className={`relative aspect-video rounded-xl overflow-hidden border border-border group hover:border-orange-500/60 transition-all ${
                  i === 0 ? 'col-span-2' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                <div className="absolute top-2 left-2 z-20">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-orange-400 font-semibold border border-white/10">
                    {img.tag}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between">
                  <p className="text-xs text-white font-bold leading-tight truncate">{img.title}</p>
                  <Eye className="w-3.5 h-3.5 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
                <img
                  src={img.path}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Full-Fidelity Photo Lightbox Modal */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setGalleryOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-card border border-border rounded-2xl p-6 max-w-3xl w-full shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setGalleryOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tag & Counter */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 font-mono text-xs font-bold border border-orange-500/30">
                  {galleryImages[galleryIdx].tag}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  Station {galleryIdx + 1} of {galleryImages.length}
                </span>
              </div>

              {/* Main Image */}
              <div className="aspect-video bg-muted/40 rounded-xl mb-4 overflow-hidden border border-border relative group">
                <img
                  src={galleryImages[galleryIdx].path}
                  alt={galleryImages[galleryIdx].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-foreground mb-1">
                {galleryImages[galleryIdx].title}
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                {galleryImages[galleryIdx].desc}
              </p>

              {/* Lightbox Controls & Thumbnails */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <button
                  onClick={() => setGalleryIdx((p) => (p === 0 ? galleryImages.length - 1 : p - 1))}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {/* Filmstrip dots */}
                <div className="flex items-center gap-2">
                  {galleryImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIdx(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === galleryIdx ? 'bg-orange-400 w-6' : 'bg-border hover:bg-muted-foreground w-2'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setGalleryIdx((p) => (p === galleryImages.length - 1 ? 0 : p + 1))}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium text-foreground transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
