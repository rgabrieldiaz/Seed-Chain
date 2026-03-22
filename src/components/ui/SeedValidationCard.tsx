import { motion } from 'framer-motion';
import { Cpu, CheckCircle, Box } from 'lucide-react';
import { cn } from './GlassCard';

export interface SeedValidationCardProps {
  status: 'idle' | 'scanning' | 'validated';
  className?: string;
}

export function SeedValidationCard({ status, className }: SeedValidationCardProps) {
  return (
    <div className={cn(
      "col-span-1 row-span-2 relative overflow-hidden group",
      "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.2)]",
      className
    )}>
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-bioLime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <Cpu className="w-6 h-6 text-bioLime" />
        <h2 className="text-lg text-white font-medium">Intelligent Seed Oracle</h2>
      </div>
      
      <div className="relative h-56 rounded-xl border border-white/10 bg-black/40 flex flex-col items-center justify-center overflow-hidden mb-4 shadow-inner">
        {status === 'scanning' && (
          <motion.div
             initial={{ top: '-20%' }}
             animate={{ top: '120%' }}
             transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
             className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-bioLime/40 to-bioLime/80 border-b-2 border-bioLime shadow-[0_0_30px_rgba(190,242,100,0.6)] z-20"
          />
        )}
        
        {status === 'validated' ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-bioLime flex flex-col items-center gap-3 z-10"
          >
            <CheckCircle className="w-14 h-14 drop-shadow-[0_0_15px_rgba(190,242,100,0.5)]" />
            <span className="font-semibold tracking-widest text-lg">VALIDADO</span>
          </motion.div>
        ) : (
          <Box className={cn("w-12 h-12 z-10 transition-colors duration-500", status === 'scanning' ? "text-bioLime" : "text-slate-600")} />
        )}
        
        {/* Advanced Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(190,242,100,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(190,242,100,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      </div>
      
      <div className="flex justify-between text-sm items-center relative z-10 mt-6">
        <span className="text-slate-400">Estado P2P</span>
        <span className={cn(
          "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border",
          status === 'validated' 
            ? "bg-bioLime/10 text-bioLime border-bioLime/30" 
            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
        )}>
          {status}
        </span>
      </div>
      <p className="text-xs text-slate-500 mt-4 border-t border-white/10 pt-4 leading-relaxed">
        GenLayer Oracle en ejecución. Analizando telemetría geoespacial y registros climáticos inmutables.
      </p>
    </div>
  );
}
