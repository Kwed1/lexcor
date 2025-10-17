import useApi from '../../../api/apiHandler'
import useWalletStore from '../../../shared/store/WalletStore'


const usePasswordApi = () => {
	const api = useApi()
  const {setPrivateKey} = useWalletStore()

	const setPassword = async(pass:string) => {
		const res = await api({
			url: `/auth/set-password/?password=${pass}`,
			method: 'POST'
		})
		return res
	}

	const getPrivatePassword = async(pass:string) => {
		const res = await api<string>({
			url: `/wallet/get-private?password=${pass}`,
			method: 'POST'
		})
		if (res?.data) {
			setPrivateKey(res?.data)
		}
		return res
	}
	return {setPassword, getPrivatePassword}
}

export default usePasswordApi