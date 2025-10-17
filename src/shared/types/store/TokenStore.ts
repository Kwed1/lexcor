export interface TokenState {
  token: string;
  currency: string;
  idTransaction:string,
  role: string,
  setRole: (role:string) => void;
  setToken: (token: string) => void;
  setTransactionId: (idTrasaction: string) => void;
  setCurrencyCoin: (currency: string) => void;
  getCurrency: () => string;
  getTransactionId: () => string;
  getToken: () => string | null;
}