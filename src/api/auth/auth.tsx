import { useTelegram } from '../../shared/hooks/useTelegram'
import { useTokenStore } from '../../shared/store/TokenStore'
import useApi from '../apiHandler'

export const useSignIn = () => {
	const { user, userId, name } = useTelegram()
	const { setToken } = useTokenStore()
	const api = useApi()

	const signIn = async () => {
		setToken('')
		const res = await api<{ token: string; has_password: boolean }>({
			url: '/auth/sign-in/',
			method: 'POST',
			data: {
				user_id: userId,
				username: user || name,
			},
		})
		const data = {
			token: res?.data?.token || '',
			has_password: res?.data?.has_password || false,
		}
		return data
	}

	return { signIn }
}
