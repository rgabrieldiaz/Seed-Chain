import { useContractStore } from '../../store/useContractStore';
import { NetworkStatusPill } from '../ui/NetworkStatusPill';
import { Activity } from 'lucide-react';

export function Header() {
  const networks = useContractStore((state) => state.networks);

  return (
    <header className="h-20 px-8 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-xl z-10 sticky top-0">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Dashboard del Productor</h1>
        <p className="text-sm text-slate-400">Estado de la red RWA y tus activos</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-bioLime">
          <Activity className="w-5 h-5" />
          <span className="font-semibold tracking-wider text-sm">SYSTEM LIVE</span>
        </div>
        
        <div className="h-8 w-px bg-white/10" />
        
        <div className="flex items-center gap-3">
          {(Object.entries(networks) as [string, string][]).map(([name, status]) => (
            <NetworkStatusPill key={name} name={name as 'Avalanche' | 'GenLayer'} status={status as any} />
          ))}
        </div>
      </div>
    </header>
  );
}
