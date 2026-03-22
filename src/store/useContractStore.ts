import { create } from 'zustand';

type Network = 'Avalanche' | 'GenLayer';
type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

interface ContractState {
  networks: Record<Network, ConnectionStatus>;
  usdcBalance: number;
  tokenizedLots: number;
  aiValidationStatus: 'idle' | 'scanning' | 'validated';
  
  setNetworkStatus: (network: Network, status: ConnectionStatus) => void;
  setAiValidationStatus: (status: 'idle' | 'scanning' | 'validated') => void;
}

export const useContractStore = create<ContractState>((set) => ({
  networks: {
    Avalanche: 'connected',
    GenLayer: 'connected',
  },
  usdcBalance: 12540.50,
  tokenizedLots: 14,
  aiValidationStatus: 'idle',

  setNetworkStatus: (network, status) =>
    set((state) => ({
      networks: { ...state.networks, [network]: status }
    })),

  setAiValidationStatus: (status) =>
    set({ aiValidationStatus: status }),
}));
