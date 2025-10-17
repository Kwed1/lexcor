export interface Coin {
  name: string;
  token: string;
  price_in_trx:number,
  price_in_usdt:number,
  name_id: string;
  id: string,
}

export interface CoinStore {
  coins: Coin[];
  GetDataLoading: boolean
  setCoins: (coins: Coin[]) => void;
  setGetDataLoading: (loading: boolean) => void
  getNameIdByName: (name: string) => string | undefined;
}