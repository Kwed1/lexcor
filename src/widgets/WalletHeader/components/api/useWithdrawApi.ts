import useApi from '../../../../api/apiHandler'


const useWithdrawApi = () => {
	const api=useApi()
	const WithdrawAmount =async(coin: string, address:string, amount:number)=>{
		const res = await api({
			url: `/wallet/withdraw?coin=${coin}&amount=${Number(amount).toFixed(5)}&address=${address}`,
			method: 'POST'
		})
		return res
	}
	return {WithdrawAmount}
}

export default useWithdrawApi