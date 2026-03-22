import React from 'react';
import { cn } from './GlassCard';
import { BrainCircuit, CheckCircle2 } from 'lucide-react';

interface SeedValidationCardProps {
  status: 'idle' | 'scanning' | 'validated';
  className?: string;
}

export const SeedValidationCard: React.FC<SeedValidationCardProps> = ({ status, className }) => {
  return (
    <div className={cn(
      "glass h-full rounded-xl overflow-hidden relative flex flex-col min-h-[400px]",
      className
    )}>
      {status === 'scanning' && (
        <div className="absolute left-0 right-0 h-[2px] z-10 animate-[scan_3s_ease-in-out_infinite]"
             style={{
               background: 'linear-gradient(90deg, transparent, #bef264, transparent)',
               boxShadow: '0 0 15px #bef264',
             }}></div>
      )}
      
      <div className="p-8 pb-4 relative z-20 flex-1">
        <div className="flex items-center gap-3 mb-6">
          <BrainCircuit className="text-bioLime w-6 h-6" />
          <h3 className="font-headline font-bold text-xl tracking-tight uppercase text-slate-100">GenLayer Intelligent Oracle</h3>
        </div>
        
        <div className="aspect-square w-full rounded-lg bg-black/40 border border-white/5 relative flex items-center justify-center overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-deepForest/80 via-transparent to-transparent z-10"></div>
          
          {/* Analysis Overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 pointer-events-none">
            <div className="flex justify-between">
              <div className="text-[10px] font-mono text-bioLime bg-black/60 px-2 py-1 border border-bioLime/30">SCAN_SEQ: 8829-X</div>
              <div className="text-[10px] font-mono text-bioLime bg-black/60 px-2 py-1 border border-bioLime/30">AZIMUTH: 14.2°</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center transition-all duration-500",
                 status === 'validated' ? "border-bioLime/80" : "border-bioLime/30"
              )}>
                <div className={cn(
                  "w-24 h-24 border rounded-full transition-all duration-300",
                  status === 'scanning' ? "animate-pulse border-bioLime shadow-[0_0_20px_#bef264]" : "border-bioLime/50",
                  status === 'validated' && "bg-bioLime/20 border-bioLime"
                )}>
                  {status === 'validated' && <div className="w-full h-full flex items-center justify-center"><CheckCircle2 className="text-bioLime w-10 h-10" /></div>}
                </div>
              </div>
              <p className="mt-4 text-[10px] font-headline font-black text-bioLime tracking-[0.2em] uppercase">
                {status === 'idle' ? 'Awaiting Data' : status === 'scanning' ? 'Validating Genetic Integrity' : 'Batch Verified'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-8 bg-white/5 border-t border-white/5">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-slate-300">Probability Index</span>
          <span className="text-xs font-bold text-bioLime">
            {status === 'validated' ? '99.8% CERTAINTY' : status === 'scanning' ? 'CALCULATING...' : '--'}
          </span>
        </div>
        <div className="w-full h-1 bg-[#1c402f] rounded-full overflow-hidden">
          <div className={cn(
            "h-full bg-bioLime transition-all duration-700",
            status === 'validated' ? "w-[99.8%]" : status === 'scanning' ? "w-1/2 animate-pulse" : "w-0"
          )}></div>
        </div>
      </div>
    </div>
  );
};
