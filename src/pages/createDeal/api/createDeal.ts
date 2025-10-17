import useApi from '../../../api/apiHandler'

export interface ICoinPrice {
	in_trx: number,
	in_usdt: number
}
export default function useCreateDealApi() {
	const api = useApi()

	const postCreateDeal = async(coin:string, mem_coin:string, limit_min:number, limit_max:number, order_type:number, minSug:number|string, maxSug:number|string, priceForCoin: number|string) => {
		const res = await api({
			url: `/order/`,
			method: 'POST',
			data: {
				coin: coin,
				mem_coin: mem_coin,
				limit_min: limit_min,
				limit_max: limit_max,
				order_type: order_type,
				limit_propose_from: minSug,
				limit_propose_to: maxSug,
				price_for_coin: Number(priceForCoin)
			}
		})
		return res
	}

	const getCoinPrice = async(coin:string) => {
		const res = await api<ICoinPrice>({
			url: `/coin/price?coin=${coin}`,
			method: 'GET'
		})
		return res?.data
	}
	
	return {postCreateDeal, getCoinPrice}
}