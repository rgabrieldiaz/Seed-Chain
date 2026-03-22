
import { GlassCard } from '../components/ui/GlassCard';
import { Leaf, Plus } from 'lucide-react';

export function RegistroLotes() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white tracking-tight">Registro de Lotes</h1>
        <button className="flex items-center gap-2 bg-bioLime hover:bg-bioLime/90 text-deepForest font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-5 h-5" />
          Nuevo Lote
        </button>
      </div>

      <GlassCard className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mb-2">
          <Leaf className="w-8 h-8" />
        </div>
        <h2 className="text-xl text-white font-medium">No hay lotes en registro activo</h2>
        <p className="text-slate-400 max-w-md">
          Comienza ingresando los datos geoespaciales y subiendo los certificados de origen. GenLayer automatizará la validación y emitiremos el RWA en Avalanche.
        </p>
      </GlassCard>
    </div>
  );
}
