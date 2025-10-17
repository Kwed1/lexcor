import useApi from '../../../api/apiHandler'
import { UserTableInt } from '../../../entities/UserInfo/type/UserTableInt'


export default function GetUserInfoApi() {
	const api = useApi()
	const GetUserInfoActive = async(userId: string) => {
		const res = await api<UserTableInt[]>({
			url: `/user/deals?user_id=${userId}`,
			method: 'GET'
		})
		return res
	}

	const GetUserInfoFinished = async(userId: string) => {
		const res = await api<UserTableInt[]>({
			url: `/useruser-finished-deals?user_id=${userId}`,
			method: 'GET'
		})
		return res
	}

	return {GetUserInfoActive, GetUserInfoFinished}
}