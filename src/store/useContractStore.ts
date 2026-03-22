import { create } from 'zustand';

type Network = 'Avalanche' | 'GenLayer';
type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

interface Lot {
  id: string;
  name: string;
  variety: string;
  origin: string;
  weight: number;
  price: number;
  status: 'pending' | 'validated' | 'minted';
  timestamp: number;
}

interface ContractState {
  networks: Record<Network, ConnectionStatus>;
  usdcBalance: number;
  tokenizedLots: number;
  registeredLots: Lot[];
  aiValidationStatus: 'idle' | 'scanning' | 'validated';
  
  setNetworkStatus: (network: Network, status: ConnectionStatus) => void;
  setAiValidationStatus: (status: 'idle' | 'scanning' | 'validated') => void;
  addLot: (lot: Omit<Lot, 'id' | 'status' | 'timestamp'>) => void;
  checkConnectivity: () => Promise<void>;
}


export const useContractStore = create<ContractState>((set) => ({
  networks: {
    Avalanche: 'connected',
    GenLayer: 'connected',
  },
  usdcBalance: 142850.24,
  tokenizedLots: 14,
  registeredLots: [
    {
      id: 'LOT-772A',
      name: 'Arabica Heirloom',
      variety: 'Arabica',
      origin: 'Mt. Elgon',
      weight: 250,
      price: 4250,
      status: 'minted',
      timestamp: Date.now() - 86400000
    }
  ],
  aiValidationStatus: 'idle',

  setNetworkStatus: (network, status) =>
    set((state) => ({
      networks: { ...state.networks, [network]: status }
    })),

  setAiValidationStatus: (status) =>
    set({ aiValidationStatus: status }),

  addLot: (lotData) => 
    set((state) => ({
      registeredLots: [
        {
          ...lotData,
          id: `LOT-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
          status: 'pending',
          timestamp: Date.now()
        },
        ...state.registeredLots
      ]
    })),

  checkConnectivity: async () => {
    // Dynamic Avalanche Check (Simulated for Hackathon but checking window.ethereum)
    const hasEth = typeof window !== 'undefined' && !!(window as any).ethereum;
    
    // GenLayer Mock Check (Pinging a dummy endpoint or simulating latency)
    const genLayerStatus: ConnectionStatus = Math.random() > 0.1 ? 'connected' : 'disconnected';

    set({
      networks: {
        Avalanche: hasEth ? 'connected' : 'disconnected',
        GenLayer: genLayerStatus
      }
    });
  }
}));

