import useApi from '../../../api/apiHandler'
import { ErrorTransInt } from '../type/ErrorTrans'


export default function GetErrorTransApi() {
	const api = useApi()
	const GetTransaction = async(skip: number) => {
		const res = await api<ErrorTransInt[]>({
			url: `/order/get-transactions?take=100000&skip=${skip}`,
			method: 'GET'
		})
		return res
	}

	const postTransactionRead = async(id: string) => {
		const res = await api({
			url: `/order/read?transaction_id=${id}`,
			method: 'POST'
		})
		return res
	}

	return {GetTransaction, postTransactionRead}
}