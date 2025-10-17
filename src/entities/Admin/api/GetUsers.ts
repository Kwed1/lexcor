import useApi from '../../../api/apiHandler'
import { UsersInt } from '../type/UsersInt'


export default function GetUsersApi() {
	const api = useApi()
	const GetUsers = async(username:string) => {
		const res = await api<UsersInt[]>({
			url: `/user/?username=${username}`,
			method: 'GET'
		})
		return res
	}
	
	return {GetUsers}
}