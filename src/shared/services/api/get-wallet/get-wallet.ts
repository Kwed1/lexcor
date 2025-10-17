import useApi from '../../../../api/apiHandler'
import { WalletHistoryInt } from '../../../../entities/WalletHistory/type/HistoryInt'
import useWalletStore from '../../../store/WalletStore'
interface MemCoins {
  token: string,
  price: number
}
export interface GetWalletInt {
  pino: number,
  trx: number,
  usdt: number,
  withdraw_commission_trx: number,
  withdraw_commission_usdt: number,
  withdraw_commission_mem_coins: number,
  mem_coins: MemCoins[]
  commission: 
    {
        name: string,
        commission_in_trx: number,
        commission_in_usdt: number
    }[]
}

export const useGetWallet = () => {
  const api = useApi();
  const {setTrx,
    setUsdt,
    setPino,
    setMemCoins,
    setAddress,
    setComission,
    setWithdrawTRXCom,
    setWithdrawUSDTCom,
    setWithdrawMemCom} = useWalletStore()

  const getWallet = async () => {
    try {
      const res = await api<GetWalletInt>({
        url: '/wallet/',
        method: 'GET',
      });
      if (res?.data) {
        setTrx(res?.data.trx)
        setUsdt(res?.data.usdt)
        setPino(res?.data.pino)
        setMemCoins(res?.data.mem_coins)
        setComission(res?.data?.commission)
        setWithdrawTRXCom(res?.data?.withdraw_commission_trx)
        setWithdrawUSDTCom(res?.data?.withdraw_commission_usdt)
        setWithdrawMemCom(res?.data?.withdraw_commission_mem_coins)
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
      throw error;
    }
  };

  const getWalletAddress = async () => {
    try {
      const res = await api<string>({
        url: '/wallet/get-address',
        method: 'GET',
      });
      if (res?.data) {
        setAddress(res?.data)
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
      throw error;
    }
  };

  
  const getWalletHistory = async() => {
    const res = await api<WalletHistoryInt[]>({
      url: `/wallet/history`,
      method: 'GET'
    })
    if (res) return res
  }

  return { getWallet, getWalletHistory, getWalletAddress};
};
