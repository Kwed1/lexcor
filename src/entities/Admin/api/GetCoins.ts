import useApi from '../../../api/apiHandler'
import { Coin } from '../../../shared/types/store/CoinStore'


export default function GetCoinsApi() {
	const api = useApi()
	const GetCoins = async(name:string) => {
		const res = await api<Coin[]>({
			url: `/coin/?name=${name}`,
			method: 'GET'
		})
		return res
	}

	const DeleteCoin = async(coin:string) => {
		const res = await api<Coin[]>({
			url: `/coin/?coin=${coin}`,
			method: 'DELETE'
		})
		return res
	}

	return {GetCoins, DeleteCoin}
}