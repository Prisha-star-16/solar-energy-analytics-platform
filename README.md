# Solar Energy & Sustainability Analytics Platform
### Course: PHY2100 - Solar Photovoltaic

A modern, responsive, full-stack analytics platform and field study visualization system built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, **Recharts**, and **Lucide Icons**, optimized for deployment on **Vercel**.

---

## 🌟 Key Features & Course Modules

### 1. 📊 Executive Overview & Introduction
- **KPI Metrics**: Global Solar PV Generation (2,050 TWh in 2024), India Solar Tariff Trends (₹2.14/kWh), Campus Performance Ratio (78.4%), and Campus Solar Yield (1,24,320 kWh/year).
- **IEA World Energy Supply Area Chart**: Evolution of Total Energy Supply (TES) by source (Coal, Oil, Natural Gas, Nuclear, Hydro, Solar & Wind, Biofuels) from 1990 to 2024.
- **Global Solar PV Generation Chart**: Regional breakdown across China, North America, Europe, Asia Pacific, and Rest of World.
- **Dynamic Quick Insights Banner**: Auto-rotating key takeaways on fossil-to-clean energy transitions.

### 2. 🔬 Solar PV Fundamentals & Modules
- **Interactive I-V & P-V Curve Generator**: Real-time single-diode Shockley model simulator reacting dynamically to temperature sliders (10°C to 75°C) and solar irradiance sliders (200 to 1200 W/m²).
- **Key Photovoltaic Metrics**: Open-circuit voltage ($V_{oc}$), Short-circuit current ($I_{sc}$), Maximum Power Point ($P_{max}$), and Fill Factor ($FF$).
- **Technology Comparison Selector**: Side-by-side technical evaluation of Monocrystalline PERC vs. Polycrystalline vs. Thin Film (a-Si / CdTe).

### 3. 🧮 System Design, Calculations & Practical Learning
- **Performance Ratio (PR) Calculator**: Computes operational PR percentage based on IEC 61724-1 standard:
  $$PR = \frac{E_{\text{Grid}}}{GII \times P_{\text{nomPV}}} \times 100$$
- **Array Sizing & Inverter Matching Assistant**: Dynamic input parameters for daily energy load, local Peak Sun Hours (PSH), module wattage, and system efficiency, outputting required panels, string counts, inverter kVA rating, and DC/AC oversizing ratio (1.15–1.25).
- **System Loss Breakdown Matrix**: Soiling, temperature coefficient losses, wiring resistance, inverter efficiency, and degradation.

### 4. 🏢 Campus Field Trip & Audit Analytics
- **Campus Green Audit Energy Data**: Monthly stacked & grouped bar charts comparing TANGEDCO grid imports against rooftop Solar PV generation (50 kW + 20 kW arrays) and wind power.
- **On-Site Inverter Inspection Log**: Technical telemetry for SMA Sunny Tripower 50000TL and Fronius Symo 20.0-3-M units (daily yield, monthly yield, efficiency, net-metering readings).
- **Interactive Photo & Field Visit Gallery**: 5 high-resolution verified inspection photographs (Rooftop Array, Inverter Control Room, Bidirectional Net Metering, Infrared Thermal Inspection, and Biomass/STP integration) with modal lightbox.

### 5. 🛠️ Operations, Maintenance & Skills Gained
- **Predictive Maintenance Schedule & Checklist**: IEC 62446 & MNRE-aligned maintenance matrix with category filters (Module & Array, Inverter, Mechanical Structure, Earth Pits) and interactive inspection status checkboxes.
- **Diagnostic Flowchart & Anomaly Troubleshooter**: Anomaly isolation tree for $V_{oc}$ / $I_{sc}$ deviations (low current from soiling, bypassed diode drop, string fuse disconnects, earth ground faults).
- **Core Engineering Competencies**: Hands-on skills in MC4 connector crimping, thermal radiometry, pyranometer calibration, and anti-islanding compliance.

### 6. 📜 Policies, Regulations & Course Outcomes
- **Tariff-Based Competitive Bidding (TBCB)**: Interactive timeline and chart tracing the 69.2% tariff decline in India from ₹6.47/kWh (JNNSM 2010) down to ₹1.99/kWh (2021).
- **Government Schemes Tracker**: Targets vs. achievements for PM-KUSUM (34.2 GW target), Rooftop Solar Phase II (40 GW target), Solar Parks (50 GW target), and ISTS Transmission Waiver.
- **Statutory Frameworks**: Analysis of Section 63 of Electricity Act 2003, Electricity Rules 2022, and MNRE ALMM quality notifications.

### 7. 📌 Conclusion & Reference Repository
- **Synthesis Report**: Executive field study report card with printable/exportable layout.
- **Citation Hub**: Direct verified links to IEA Data & Statistics, MNRE National Portal, International Solar Alliance (ISA), NREL PVWatts, CEA, and CERC.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14+ / Next.js 16 (App Router, Server & Client Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Custom Properties (OKLCH color system)
- **Design System**: Glassmorphism dashboard UI with dark/light mode toggle via `next-themes`
- **Charts & Data Visualization**: Recharts (ResponsiveContainer, AreaChart, LineChart, BarChart)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: Vercel-ready with zero build warnings and pre-rendered static routes

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Installation
```bash
# Navigate to the project directory
cd solar-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. The root path automatically redirects to `/dashboard/overview`.

### Production Build
```bash
npm run build
npm start
```

---

## 📂 Project Directory Structure

```
solar-dashboard/
├── public/
│   └── gallery/                # Verified field visit photographs
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with ThemeProvider & Navigation
│   │   ├── page.tsx            # Root redirect to /dashboard/overview
│   │   ├── globals.css         # Glassmorphism, animations & Tailwind theme
│   │   └── dashboard/
│   │       ├── overview/       # Executive Overview & IEA Data
│   │       ├── fundamentals/   # I-V & P-V Curve Physics Engine
│   │       ├── system-design/  # PR & Array Sizing Calculators
│   │       ├── campus-audit/   # Green Audit & Field Trip Log
│   │       ├── operations/     # Maintenance Checklist & Diagnostics
│   │       ├── policies/       # Bidding Tariffs & MNRE Schemes
│   │       └── conclusion/     # Reference Repository & Citations
│   ├── components/
│   │   ├── layout/             # Sidebar, TopBar, ThemeProvider
│   │   ├── dashboard/          # KPICard, InsightsBanner
│   │   ├── charts/             # 6 customized Recharts visualizations
│   │   └── calculators/        # IVCurveGenerator, PRCalculator, ArraySizing
│   ├── data/                   # Structured datasets (IEA, Campus, Tariffs, Schemes)
│   └── lib/                    # pv-physics.ts, utils.ts
├── vercel.json                 # Vercel deployment configuration
└── package.json
```
