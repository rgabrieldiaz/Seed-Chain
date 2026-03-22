import React from 'react';
import { useContractStore } from '../../store/useContractStore';
import { cn } from './GlassCard';

export const NetworkStatusPill: React.FC<{ className?: string }> = ({ className }) => {
  const { networks } = useContractStore();

  return (
    <div className={cn(
      "hidden lg:flex items-center gap-3 px-4 py-1.5 bg-[#002517] rounded-full border border-white/10",
      className
    )}>
      <div className="flex items-center gap-2">
        <span className={cn(
          "w-2 h-2 rounded-full",
          networks.Avalanche === 'connected' ? "bg-bioLime animate-pulse shadow-[0_0_10px_#BEF264]" : "bg-white/20"
        )}></span>
        <span className={cn(
          "text-[10px] uppercase tracking-widest font-bold font-headline",
          networks.Avalanche === 'connected' ? "text-bioLime" : "text-white/40"
        )}>Avalanche</span>
      </div>
      <div className="w-px h-3 bg-white/20"></div>
      <div className="flex items-center gap-2">
        <span className={cn(
          "w-2 h-2 rounded-full opacity-50",
          networks.GenLayer === 'connected' ? "bg-bioLime animate-pulse shadow-[0_0_10px_#BEF264]" : "bg-white/20"
        )}></span>
        <span className={cn(
           "text-[10px] uppercase tracking-widest font-bold font-headline text-slate-300",
           networks.GenLayer === 'connected' ? "text-bioLime opacity-70" : "text-white/40"
        )}>GenLayer</span>
      </div>
    </div>
  );
};
