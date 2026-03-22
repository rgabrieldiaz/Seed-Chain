import { Activity } from 'lucide-react';
import { cn } from './GlassCard';

export interface NetworkStatusPillProps {
  name: 'Avalanche' | 'GenLayer';
  status: 'connected' | 'disconnected' | 'connecting';
}

export function NetworkStatusPill({ name, status }: NetworkStatusPillProps) {
  const isConnected = status === 'connected';
  
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl transition-all hover:bg-white/10">
      <div 
        className={cn(
          "w-2.5 h-2.5 rounded-full",
          isConnected ? "bg-bioLime shadow-[0_0_8px_rgba(190,242,100,0.8)] animate-pulse" : "bg-red-500"
        )} 
      />
      <span className="text-sm font-semibold text-slate-200 tracking-wide">{name}</span>
      {isConnected && (
         <Activity className="w-4 h-4 text-bioLime opacity-70 ml-1" />
      )}
    </div>
  );
}
