import useApi from '../../../api/apiHandler'


export default function GetAddressApi() {
	const api = useApi()

	const getAddress = async() => {
		const res = await api<string>({
			url: 'wallet/get-address',
			method: 'GET'
		})
		return res
	}
	
	return {getAddress}
}