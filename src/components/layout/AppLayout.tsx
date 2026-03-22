import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useContractStore } from '../../store/useContractStore';


export function AppLayout() {
  const checkConnectivity = useContractStore((state) => state.checkConnectivity);

  useEffect(() => {
    // Initial check
    checkConnectivity();
    
    // Interval check every 10s
    const interval = setInterval(checkConnectivity, 10000);
    return () => clearInterval(interval);
  }, [checkConnectivity]);

  return (
    <div className="flex h-screen bg-deepForest text-slate-100 overflow-hidden font-sans">

      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-bioLime/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/30 blur-[100px] pointer-events-none" />
        
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
