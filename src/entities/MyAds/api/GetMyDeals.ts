import useApi from '../../../api/apiHandler'


export default function GetMyDealsApi() {
	const api = useApi()

	const GetMyDeals = async(status: boolean, coin: string) => {
		const res = await api({
			url: `/order/user-deals?coin=${coin}&active=${status}`,
			method: 'GET'
		})
		return res
	}

	const RemoveMyDeals = async(id:string) => {
		const res = await api({
			url: `/order/?order_id=${id}`,
			method: 'DELETE'
		})
		return res
	}

	return {GetMyDeals, RemoveMyDeals}
}