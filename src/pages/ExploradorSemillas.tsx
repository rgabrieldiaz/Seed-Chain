import { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { QrCode, Search, CheckCircle, Database } from 'lucide-react';

export function ExploradorSemillas() {
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white tracking-tight">Explorador de Semillas</h1>
      </div>

      <GlassCard className="p-2 flex items-center gap-3">
        <Search className="w-5 h-5 ml-4 text-slate-400" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por Hash de Transacción, ID de Lote o Wallet..." 
          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500 py-3"
        />
        <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-colors border border-white/5">
          Buscar
        </button>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <GlassCard className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
          <div className="w-20 h-20 rounded-2xl bg-bioLime/10 border border-bioLime/20 flex flex-col items-center justify-center text-bioLime mb-6 shadow-[0_0_30px_rgba(190,242,100,0.1)]">
            <QrCode className="w-10 h-10" />
          </div>
          <h2 className="text-xl text-white font-medium mb-2">Escáner QR Ready</h2>
          <p className="text-slate-400">
            Escanea el código QR del producto final para verificar su historial inmutable en la blockchain (Stellar/Avalanche).
          </p>
        </GlassCard>
        
        <GlassCard className="flex flex-col gap-4">
          <h2 className="text-lg text-white font-medium mb-2 flex items-center gap-2">
            <Database className="w-5 h-5 text-bioLime" /> Registros Recientes
          </h2>
          
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-bioLime" />
                <div>
                  <div className="text-white font-medium">Lote #00{4 - i}X9V</div>
                  <div className="text-xs text-slate-400">Hace {i * 12} mins</div>
                </div>
              </div>
              <div className="px-3 py-1 bg-bioLime/10 text-bioLime text-xs font-bold rounded-lg border border-bioLime/20">
                VERIFICADO
              </div>
            </div>
          ))}
        </GlassCard>
      </div>

    </div>
  );
}
