import { useEffect } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { useContractStore } from '../store/useContractStore';
import { SeedValidationCard } from '../components/ui/SeedValidationCard';
import { Activity, Box, DollarSign } from 'lucide-react';

export function Dashboard() {
  const { usdcBalance, tokenizedLots, aiValidationStatus, setAiValidationStatus } = useContractStore();

  // Simulate AI scanning process
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (aiValidationStatus === 'idle') {
      timeout = setTimeout(() => setAiValidationStatus('scanning'), 2000);
    } else if (aiValidationStatus === 'scanning') {
      timeout = setTimeout(() => setAiValidationStatus('validated'), 5000);
    }
    return () => clearTimeout(timeout);
  }, [aiValidationStatus, setAiValidationStatus]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
        
        {/* Balance Card */}
        <GlassCard className="col-span-1 lg:col-span-2 bg-gradient-to-br from-bioLime/5 to-transparent border-bioLime/20">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-slate-400 font-medium tracking-wide">Balance Total</h2>
              <div className="text-4xl font-bold text-white mt-2 flex items-center gap-2">
                <DollarSign className="w-8 h-8 text-bioLime" />
                {usdcBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="p-3 bg-bioLime/10 rounded-xl text-bioLime">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <div className="text-sm text-slate-400 flex flex-col gap-1">
            <p>+2.4% vs mes anterior</p>
            <p>Liquidez disponible en cruce de cadenas (Avalanche/Stellar)</p>
          </div>
        </GlassCard>

        {/* AI Validation Card */}
        <SeedValidationCard status={aiValidationStatus} />

        {/* Tokenized Lots Card */}
        <GlassCard className="col-span-1 border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <Box className="w-6 h-6 text-slate-400" />
            <h2 className="text-lg text-white font-medium">Lotes Tokenizados</h2>
          </div>
          <div className="text-5xl font-light text-white mb-2">{tokenizedLots}</div>
          <div className="text-sm text-slate-400">
            Representación en tokens RWA estándar Avalanche ERC-20
          </div>
        </GlassCard>
        
        {/* Placeholder cards to fill grid */}
         <GlassCard className="col-span-1 lg:col-span-2 border-white/5 min-h-[200px] flex items-center justify-center text-slate-500 text-sm">
           [ Gráfico de rendimiento de semilla pendiente de integración ]
         </GlassCard>
      </div>
    </div>
  );
}
