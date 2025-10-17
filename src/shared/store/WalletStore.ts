import { create } from 'zustand'

interface MemCoin {
  token: string,
  price: number
}
interface Comission {
  name: string,
  commission_in_trx: number,
  commission_in_usdt: number
}


interface StoreState {
  pino: number;
  trx: number;
  usdt: number;
  mem_coins: MemCoin[];
  address: string;
  privateKey: string;
  commission: Comission[];
  withdrawTRXCom: number,
  withdrawUSDTCom: number,
  withdrawMemCom: number,
  setWithdrawTRXCom: (value: number) => void;
  setWithdrawUSDTCom: (value: number) => void;
  setWithdrawMemCom: (value: number) => void;
  setAddress: (value: string) => void;
  setPrivateKey: (value: string) => void;
  setComission: (commission: Comission[]) => void;
  setPino: (value: number) => void;
  setTrx: (value: number) => void;
  setUsdt: (value: number) => void;
  setMemCoins: (coins: MemCoin[]) => void;
}

const useWalletStore = create<StoreState>((set, get) => ({
  pino: 0.0,
  trx: 0.0,
  usdt: 0.0,
  mem_coins: [],
  commission: [],
  withdrawTRXCom: 0,
  withdrawUSDTCom: 0,
  withdrawMemCom: 0,
  address: '',
  privateKey: '',
  setComission: (commission: Comission[]) => set({ commission }),
  setAddress: (address: string) => set({ address: address }),
  setWithdrawTRXCom: (withdrawTRXCom: number) => set({ withdrawTRXCom }),
  setWithdrawUSDTCom: (withdrawUSDTCom: number) => set({ withdrawUSDTCom }),
  setWithdrawMemCom: (withdrawMemCom: number) => set({ withdrawMemCom }),
  setPrivateKey: (privateKey: string) => set({ privateKey: privateKey }),
  setTrx: (value: number) => set({ trx: value }),
  setPino: (value: number) => set({ pino: value }),
  setUsdt: (value: number) => set({ usdt: value }),
  setMemCoins: (coins: MemCoin[]) => set({ mem_coins: coins }),
}));

export default useWalletStore;
