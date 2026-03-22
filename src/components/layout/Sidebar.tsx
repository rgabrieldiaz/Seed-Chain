import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Leaf, QrCode, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../ui/GlassCard';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Registro de Lotes', path: '/registro', icon: Leaf },
  { name: 'Explorador', path: '/explorador', icon: QrCode },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      className="h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col relative z-20 shrink-0"
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-bioLime font-bold text-xl"
          >
            <Leaf className="w-6 h-6" />
            <span>Seed-Chain</span>
          </motion.div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-2 rounded-lg hover:bg-white/10 text-slate-300 transition-colors",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-bioLime/20 text-bioLime shadow-[0_0_15px_rgba(190,242,100,0.15)]"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )
            }
          >
            <item.icon className={cn("w-6 h-6 shrink-0", collapsed && "mx-auto")} />
            {!collapsed && <span className="font-medium whitespace-nowrap">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
      
      {!collapsed && (
        <div className="p-4 text-xs text-slate-500 text-center border-t border-white/5">
          RWA Traceability v1.0
        </div>
      )}
    </motion.div>
  );
}
