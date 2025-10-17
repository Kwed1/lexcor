import useApi from '../../../api/apiHandler'


export default function NewCoinApi() {
	const api = useApi()
	const PostNewCoin = async(name:string, address:string, priceUSD:number, priceTRX:number, coinGeckoId:string) => {
		const res = await api({
			url: `/coin/`,
			method: 'POST',
			data: {
				name: name,
  			token: address,
				name_id: coinGeckoId,
				price_in_usdt: priceUSD,
  			price_in_trx: priceTRX
			}
		})
		return res
	}

	const EditCoin = async(name:string, address:string, priceUSD:number, priceTRX:number, id:string, coinGeckoId:string)=> {
		const res = await api({
			url: '/coin/',
			method: 'PUT',
			data: {
				id: id,
				name: name,
				name_id: coinGeckoId,
				token: address,
				price_in_trx: priceTRX,
				price_in_usdt:priceUSD 
			}
		})
		return res
	}
	return {PostNewCoin, EditCoin}
}