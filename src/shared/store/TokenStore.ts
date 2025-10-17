import { create } from 'zustand'
import { TokenState } from '../types/store/TokenStore'

export const useTokenStore = create<TokenState>((set, get) => ({
  currency: 'TRX',
  token: '',
  idTransaction: '',
  role: '',
  setRole: (role: string) => set({ role }),
  setTransactionId: (idTransaction: string) => set({ idTransaction }),
  setToken: (token: string) => set({ token }),
  setCurrencyCoin: (currency: string) => set({ currency }),
  getCurrency: () => get().currency,
  getTransactionId: () => get().idTransaction,
  getToken: () => get().token
}))
