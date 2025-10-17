import useApi from '../../../api/apiHandler'
import { TradesInt } from '../type/TradesInt'

export default function useGetTrade() {
  const api = useApi();
  const GetTrades = async (coin:string, orderType: number, priceTo: number, memCoin: string) => {
    try {
      const res = await api<TradesInt[]>({
        url: `/order/?coin=${coin}&order_type=${orderType}&price_from=0&price_to=${priceTo}&mem_coin=${memCoin === 'All' ? '' : memCoin}`,
        method: 'GET'
      });
      return res; 
    } catch (error) {
      console.error('Error fetching trades:', error);
      throw error;
    }
  };

  return { GetTrades };
}
