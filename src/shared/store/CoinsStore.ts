import { create } from 'zustand'
import { Coin, CoinStore } from '../types/store/CoinStore'

export const useCoinStore = create<CoinStore>((set, get) => ({
  coins: [],
  GetDataLoading: false,
  setCoins: (coins: Coin[]) => set({ coins }),
  setGetDataLoading: (GetDataLoading: boolean) => set({ GetDataLoading }),
  getNameIdByName: (name: string) => {
    const coins = get().coins;
    const coin = coins.find((coin) => coin.name === name);
    return coin?.name_id;
  }
}));
