'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Zap,
  Calculator,
  Building2,
  Wrench,
  ScrollText,
  BookOpen,
  Sun,
  ChevronLeft,
  ChevronRight,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    id: 'overview',
    label: 'Executive Overview',
    shortLabel: 'Overview',
    href: '/dashboard/overview',
    icon: BarChart3,
    color: 'text-orange-400',
    description: 'KPIs & Global Energy Trends',
  },
  {
    id: 'fundamentals',
    label: 'PV Fundamentals',
    shortLabel: 'Fundamentals',
    href: '/dashboard/fundamentals',
    icon: Zap,
    color: 'text-yellow-400',
    description: 'I-V Curves & Technology',
  },
  {
    id: 'system-design',
    label: 'System Design',
    shortLabel: 'Design',
    href: '/dashboard/system-design',
    icon: Calculator,
    color: 'text-blue-400',
    description: 'PR Calculator & Sizing',
  },
  {
    id: 'campus-audit',
    label: 'Campus Audit',
    shortLabel: 'Audit',
    href: '/dashboard/campus-audit',
    icon: Building2,
    color: 'text-green-400',
    description: 'Field Trip & Analytics',
  },
  {
    id: 'operations',
    label: 'O&M Skills',
    shortLabel: 'O&M',
    href: '/dashboard/operations',
    icon: Wrench,
    color: 'text-purple-400',
    description: 'Maintenance & Diagnostics',
  },
  {
    id: 'policies',
    label: 'Policies & Regs',
    shortLabel: 'Policies',
    href: '/dashboard/policies',
    icon: ScrollText,
    color: 'text-sky-400',
    description: 'Tariffs & Govt Schemes',
  },
  {
    id: 'conclusion',
    label: 'Conclusion',
    shortLabel: 'Conclusion',
    href: '/dashboard/conclusion',
    icon: BookOpen,
    color: 'text-pink-400',
    description: 'Takeaways & References',
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col border-r border-border bg-card/50 backdrop-blur-xl z-20 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border shrink-0">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center glow-solar">
          <Sun className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-sm font-bold text-foreground leading-tight">Solar Analytics</p>
              <p className="text-xs text-muted-foreground">PHY2100 · Solar PV</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live indicator */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-3 mt-3 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot flex-shrink-0" />
            <span className="text-xs text-green-400 font-medium">Live Dashboard</span>
            <Activity className="w-3 h-3 text-green-400 ml-auto" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden',
                  isActive
                    ? 'nav-item-active'
                    : 'hover:bg-muted/60 text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 flex-shrink-0 transition-colors',
                    isActive ? item.color : 'group-hover:' + item.color
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className={cn('text-sm font-medium whitespace-nowrap', isActive && 'text-orange-400')}>
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">{item.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-orange-400"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer / Collapse button */}
      <div className="border-t border-border p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors text-sm"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
