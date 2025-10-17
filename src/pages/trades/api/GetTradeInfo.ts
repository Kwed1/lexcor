import useApi from '../../../api/apiHandler'
import { GetTradeInt } from '../type/GetTradeInt'


export const useGetInfoApi = () => {
	const api = useApi()

	const GetTradeInfo = async (id:string) => {
		const res = await api<GetTradeInt>({
			url: `/order/{id}?order_id=${id}`,
			method: 'GET',
		})
		
		return res
	}

	const SuggestTrade = async (id:string, price:string|number, sugPrice:string|number) => {
		const res = await api({
			url: `/order/propose-price?order_id=${id}&price=${price}&proposal_price=${sugPrice}`,
			method: 'POST',
		})
		
		return res
	}


	return { GetTradeInfo, SuggestTrade }
}
