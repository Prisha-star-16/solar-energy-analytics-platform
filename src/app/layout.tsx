import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';

export const metadata: Metadata = {
  title: 'Solar Energy & Sustainability Analytics | PHY2100',
  description:
    'Interactive analytics dashboard for Solar Photovoltaic systems, global energy transition data, campus green audit metrics, and India solar policy frameworks.',
  keywords: ['solar energy', 'PV analytics', 'sustainability', 'IEA data', 'MNRE', 'green audit', 'PHY2100'],
  authors: [{ name: 'PHY2100 Solar PV Course' }],
  openGraph: {
    title: 'Solar Energy & Sustainability Analytics Platform',
    description: 'PHY2100 — Solar Photovoltaic Interactive Dashboard',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <TopBar />
              <main className="flex-1 overflow-y-auto solar-mesh-bg">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
