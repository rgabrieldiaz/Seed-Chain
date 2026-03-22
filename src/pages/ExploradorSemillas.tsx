import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { useContractStore } from '../store/useContractStore';
import { QrCode, Search, Database, ExternalLink, X, FileCheck, ShieldCheck, Box } from 'lucide-react';

interface Lot {
  id: string;
  name: string;
  variety: string;
  origin: string;
  weight: number;
  price: number;
  status: 'pending' | 'scanning' | 'validated' | 'minted';
  txHash?: string;
  certUrl?: string;
  timestamp: number;
}

export function ExploradorSemillas() {
  const [search, setSearch] = useState('');
  const registeredLots = useContractStore((state) => state.registeredLots);
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);

  const filteredLots = registeredLots.filter(lot => 
    lot.name.toLowerCase().includes(search.toLowerCase()) || 
    lot.id.toLowerCase().includes(search.toLowerCase()) ||
    lot.txHash?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <header>
        <span className="text-[10px] uppercase tracking-[0.4em] text-bioLime/60 mb-2 block font-medium">Blockchain Inspector</span>
        <h1 className="text-5xl font-bold text-white tracking-tight font-display">Explorador de Semillas</h1>
      </header>

      {/* Search Section */}
      <GlassCard className="p-2 flex items-center gap-3 bg-white/[0.02]">
        <Search className="w-5 h-5 ml-4 text-slate-500" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por Hash de Avalanche, ID de Lote o Variedad..." 
          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-600 py-4 font-medium"
        />
        <button className="bg-bioLime/10 hover:bg-bioLime/20 text-bioLime px-8 py-3 rounded-xl font-bold transition-all border border-bioLime/20 active:scale-95">
          Buscar
        </button>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* QR & Scanner Section */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="flex flex-col items-center justify-center text-center p-10 min-h-[350px] border-bioLime/10 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-bioLime/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-24 h-24 rounded-3xl bg-bioLime/10 border border-bioLime/20 flex flex-col items-center justify-center text-bioLime mb-6 shadow-[0_0_30px_rgba(190,242,100,0.1)] group-hover:scale-110 transition-transform duration-500">
              <QrCode className="w-12 h-12" />
            </div>
            <h2 className="text-2xl text-white font-bold mb-3">Escáner QR Ready</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Escanea la etiqueta del producto para verificar su historial inmutable en Avalanche Mainnet y certificados GenLayer.
            </p>
            <button className="mt-8 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-sm font-bold transition-all">
              Abrir Cámara
            </button>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
             <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-bioLime" /> Protocolo Genesis
             </h3>
             <ul className="space-y-3">
               <li className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest">
                 <div className="w-1 h-1 rounded-full bg-bioLime" /> Consensus: GenLayer v1.2
               </li>
               <li className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest">
                 <div className="w-1 h-1 rounded-full bg-bioLime" /> Settlements: Avalanche C-Chain
               </li>
             </ul>
          </GlassCard>
        </div>
        
        {/* Recent Records List */}
        <div className="lg:col-span-2">
          <GlassCard className="flex flex-col gap-6 h-full border-white/5">
            <h2 className="text-xl text-white font-bold flex items-center gap-3">
              <Database className="w-6 h-6 text-bioLime" /> Registros Recientes
            </h2>
            
            <div className="space-y-4">
              {filteredLots.length === 0 ? (
                <div className="text-center py-20 text-slate-600 italic">No se encontraron registros activos.</div>
              ) : (
                filteredLots.map((lot) => (
                  <motion.div 
                    layoutId={lot.id}
                    key={lot.id} 
                    onClick={() => setSelectedLot(lot)}
                    className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-bioLime/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-bioLime transition-colors">
                        <Box className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-white font-bold group-hover:text-bioLime transition-colors">{lot.name}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{lot.id} • {new Date(lot.timestamp).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs text-slate-500">Avalanche TX</div>
                        <div className="text-[10px] font-mono text-slate-400">{lot.txHash ? `${lot.txHash.substring(0, 10)}...` : 'Pendiente'}</div>
                      </div>
                      <div className={cn(
                        "px-4 py-2 text-[10px] font-black rounded-xl border uppercase tracking-[0.1em]",
                        lot.status === 'minted' ? "bg-bioLime/10 text-bioLime border-bioLime/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      )}>
                        {lot.status === 'minted' ? 'Verificado' : 'Procesando'}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Lot Detail Modal */}
      <AnimatePresence>
        {selectedLot && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLot(null)}
              className="fixed inset-0 bg-deepForest/80 backdrop-blur-md z-[60]"
            />
            <motion.div 
              layoutId={selectedLot.id}
              className="fixed inset-0 m-auto w-full max-w-2xl h-fit z-[70] p-1"
            >
              <GlassCard className="border-white/20 p-8 overflow-visible">
                <button 
                  onClick={() => setSelectedLot(null)}
                  className="absolute -top-4 -right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-start justify-between mb-10">
                  <div>
                    <span className="text-[10px] font-black text-bioLime uppercase tracking-[0.3em] mb-2 block">Traceability Certificate</span>
                    <h2 className="text-3xl font-bold text-white font-display uppercase tracking-tight">{selectedLot.name}</h2>
                    <p className="text-slate-500 text-sm mt-1">{selectedLot.id} • Verified Seed Asset</p>
                  </div>
                  <div className="w-16 h-16 bg-bioLime/10 rounded-2xl flex items-center justify-center border border-bioLime/20 shadow-[0_0_20px_rgba(190,242,100,0.1)]">
                    <FileCheck className="w-8 h-8 text-bioLime" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Avalanche C-Chain Hash</h4>
                      <div className="flex items-center gap-2 group cursor-pointer">
                        <code className="text-xs text-bioLime bg-bioLime/5 px-2 py-1 rounded border border-bioLime/10 break-all">
                          {selectedLot.txHash || 'Pending confirmation...'}
                        </code>
                        {selectedLot.txHash && <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-bioLime" />}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">GenLayer Certificate</h4>
                      <div className="flex items-center gap-2 group cursor-pointer">
                        <span className="text-xs text-white underline decoration-bioLime underline-offset-4">View Purity Oracle Result</span>
                        <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-bioLime" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Variedad</span>
                      <span className="text-xs text-white font-bold">{selectedLot.variety}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Origen</span>
                      <span className="text-xs text-white font-bold">{selectedLot.origin}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Peso</span>
                      <span className="text-xs text-white font-bold">{selectedLot.weight} MT</span>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-xs text-slate-500">Valor RWA</span>
                      <span className="text-xs text-bioLime font-black text-lg">${selectedLot.price.toLocaleString()} USDC</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-bioLime text-deepForest py-4 rounded-xl font-bold hover:shadow-[0_0_25px_rgba(190,242,100,0.4)] transition-all active:scale-[0.98]">
                    Descargar Certificado PDF
                  </button>
                  <button className="px-6 py-4 bg-white/5 text-white rounded-xl border border-white/10 font-bold hover:bg-white/10 transition-all">
                    Ver en Explorer
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
