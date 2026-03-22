import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, LocationOn, ExpandMore, Info, CheckCircle, Wallet, Sprout, ShieldCheck } from '../components/ui/StitchIcons';


import { useContractStore } from '../store/useContractStore';
import { GlassCard } from '../components/ui/GlassCard';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Reusing some logic from the HTML but making it a proper React component
export default function RegistroLotes() {
  const navigate = useNavigate();
  const addLot = useContractStore((state) => state.addLot);
  const startValidation = useContractStore((state) => state.startValidation);

  
  const [step, setStep] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({

    name: '',
    variety: 'Soja Intacta 2 Xtend',
    origin: '',
    weight: 12.5,
    price: 4500
  });

  const steps = [
    { id: 1, name: 'Origen', icon: <Sprout className="w-6 h-6" /> },
    { id: 2, name: 'Calidad', icon: <ShieldCheck className="w-6 h-6" /> },
    { id: 3, name: 'Tokenización', icon: <Wallet className="w-6 h-6" /> }
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Finalize
      setIsMinting(true);
      
      addLot({

        name: formData.name || 'Nuevo Lote',
        variety: formData.variety,
        origin: formData.origin || 'Desconocido',
        weight: formData.weight,
        price: formData.price
      });

      // We need to know which ID was generated. Let's modify addLot or just use the ID we created.
      // For simplicity in this mock, I'll pass the ID logic.
      
      // Wait a bit to simulate initial submission
      setTimeout(() => {
        const lastLot = useContractStore.getState().registeredLots[0];
        startValidation(lastLot.id);
        
        // Finalize state after store's 5s
        setTimeout(() => {
          setIsMinting(false);
          setShowToast(true);
          setTimeout(() => navigate('/'), 3000);
        }, 5500);
      }, 1000);
    }
  };


  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header */}
      <header className="flex justify-between items-end mb-12">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-bioLime/60 mb-2 block font-medium">Supply Chain Onboarding</span>
          <h1 className="text-5xl font-bold font-display text-white tracking-tight">Registro de Lotes</h1>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Dashboard</span>
        </button>
      </header>

      {/* Progress Stepper */}
      <div className="mb-16 max-w-4xl">
        <div className="flex items-center">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-2 relative">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500",
                  step >= s.id ? "bg-bioLime text-deepForest shadow-[0_0_20px_rgba(190,242,100,0.3)]" : "bg-white/5 border border-white/10 text-slate-500"
                )}>
                  {step > s.id ? <CheckCircle className="w-6 h-6" /> : `0${s.id}`}
                </div>
                <span className={cn(
                  "text-[10px] font-bold tracking-widest uppercase transition-colors duration-300",
                  step >= s.id ? "text-bioLime" : "text-slate-500"
                )}>
                  {s.name}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-[2px] mx-4 -mt-6 transition-colors duration-500",
                  step > s.id ? "bg-bioLime/50" : "bg-white/5"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* Left: Form Section */}
        <div className="col-span-12 lg:col-span-7">
          <GlassCard className="p-10 border-white/10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  key="step1"
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Datos de Origen</h2>
                    <p className="text-slate-400 text-sm max-w-md">Insira las informaciones básicas del lote para iniciar el proceso de rastreabilidad digital.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-bold">Nombre del Lote</label>
                      <input 
                        className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-bioLime/30 transition-all placeholder:text-slate-600" 
                        placeholder="Ex: Lote Premium Safra 2024-A" 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-bold">Variedad de Semilla</label>
                        <div className="relative">
                          <select 
                            className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-white appearance-none focus:outline-none focus:ring-1 focus:ring-bioLime/30 transition-all"
                            value={formData.variety}
                            onChange={(e) => setFormData({...formData, variety: e.target.value})}
                          >
                            <option value="Soja Intacta 2 Xtend">Soja Intacta 2 Xtend</option>
                            <option value="Milho Bio-Hybrid">Milho Bio-Hybrid</option>
                            <option value="Trigo Winter-Gold">Trigo Winter-Gold</option>
                          </select>
                          <ExpandMore className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-bold">Geo-localización</label>
                        <div className="relative">
                          <input 
                            className="w-full bg-white/5 border border-white/5 rounded-xl p-4 pl-12 text-white focus:outline-none focus:ring-1 focus:ring-bioLime/30 transition-all placeholder:text-slate-600" 
                            placeholder="-23.5505, -46.6333" 
                            type="text"
                            value={formData.origin}
                            onChange={(e) => setFormData({...formData, origin: e.target.value})}
                          />
                          <LocationOn className="absolute left-4 top-1/2 -translate-y-1/2 text-bioLime" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  key="step2"
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Validación de Calidad</h2>
                    <p className="text-slate-400 text-sm max-w-md">Envío de muestras para validación por Oráculos GenLayer e IA.</p>
                  </div>
                  
                  <div className="p-8 bg-bioLime/5 border border-bioLime/10 rounded-2xl flex items-center gap-6">
                    <div className="w-16 h-16 bg-bioLime/10 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="w-10 h-10 text-bioLime" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">GenLayer Oracle Ready</h3>
                      <p className="text-sm text-slate-400">Verificación descentralizada de pureza y germinación disponible.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-bold">Peso en Toneladas</label>
                      <input 
                        className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-bioLime/30 transition-all" 
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: parseFloat(e.target.value)})}
                      />
                    </div>
                    <div className="flex items-end">
                       <button className="w-full h-[58px] border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                         Subir Certificado de Origen
                       </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  key="step3"
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Configuración RWA</h2>
                    <p className="text-slate-400 text-sm max-w-md">Defina los parámetros económicos del activo antes de mintear en Avalanche.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-bold">Valor de Mercado (USDC)</label>
                      <div className="relative">
                        <input 
                          className="w-full bg-white/5 border border-white/5 rounded-xl p-4 pl-12 text-white focus:outline-none focus:ring-1 focus:ring-bioLime/30 transition-all" 
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bioLime font-bold">$</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                       <div className="flex items-center gap-4 mb-4">
                         <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                           <Wallet className="w-6 h-6 text-slate-300" />
                         </div>
                         <h4 className="font-bold text-white">Smart Contract Deployment</h4>
                       </div>
                       <p className="text-xs text-slate-500 leading-relaxed">
                         Al continuar, se desplegará un contrato representativo en la C-Chain de Avalanche, permitiendo la colateralización del lote.
                       </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 pt-10 border-t border-white/5 flex items-center justify-between">
              <button 
                onClick={() => step > 1 && setStep(step -1)}
                className={cn(
                  "text-slate-500 hover:text-white transition-colors text-sm font-medium",
                  step === 1 && "opacity-0 pointer-events-none"
                )}
              >
                Volver
              </button>
              <button 
                onClick={handleNext}
                disabled={isMinting}
                className={cn(
                  "bg-bioLime text-deepForest px-10 py-4 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2",
                  isMinting ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0_0_20px_rgba(190,242,100,0.4)]"
                )}
              >
                {isMinting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-deepForest/30 border-t-deepForest animate-spin rounded-full" />
                    <span>Validando IA...</span>
                  </>
                ) : (
                  step === 3 ? 'Iniciar Validación de Lote' : 'Continuar Registro'
                )}
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Success Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-bioLime text-deepForest px-6 py-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center gap-3 font-bold"
            >
              <CheckCircle className="w-6 h-6" />
              <span>RWA Minted en Avalanche Mainnet</span>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Right: Preview Section */}
        <div className="col-span-12 lg:col-span-5">
          <div className="sticky top-32">
            <div className="p-1 rounded-[2rem] bg-gradient-to-br from-bioLime/20 to-transparent">
              <div className="bg-[#001209] p-8 rounded-[1.8rem] overflow-hidden relative border border-white/5">
                {/* Background Bio-Glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-bioLime/10 blur-[100px] rounded-full" />
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-bioLime mb-1 uppercase">Asset ID</span>
                    <span className="font-display font-bold text-2xl text-white">SEED-TOKEN #NEW</span>
                  </div>
                  <div className="w-14 h-14 bg-white/5 backdrop-blur-md flex items-center justify-center rounded-2xl border border-white/10">
                    <Sprout className="w-8 h-8 text-bioLime" />
                  </div>
                </div>

                <div className="space-y-6 mb-12 relative z-10">
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-sm text-slate-400">Batch Name</span>
                    <span className="text-sm font-medium text-white">{formData.name || '---'}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-sm text-slate-400">Seed Variety</span>
                    <span className="text-sm font-medium text-white">{formData.variety}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-sm text-slate-400">Weight (MT)</span>
                    <span className="text-sm font-medium text-white">{formData.weight.toFixed(2)} MT</span>
                  </div>
                </div>

                <div className="relative z-10 p-6 bg-bioLime/5 rounded-2xl border border-bioLime/10">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-bioLime/60 mb-1 uppercase block">Current Evaluation</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-bold text-white">{formData.price.toLocaleString()}</span>
                    <span className="text-lg font-medium text-bioLime/80">USDC</span>
                  </div>
                </div>

                {/* Decorative Map element */}
                <div className="mt-8 h-32 w-full rounded-2xl bg-white/5 border border-white/5 overflow-hidden relative group">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=800')] opacity-20 grayscale bg-cover bg-center group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#001209] to-transparent" />
                   <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-bioLime animate-pulse" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                        {formData.origin ? 'Location Active' : 'Waiting Geodata'}
                      </span>
                   </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-4 px-4">
              <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed">
                Este es un preview dinámico del activo real (RWA) que será cunhado no blockchain após a validação do lote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
