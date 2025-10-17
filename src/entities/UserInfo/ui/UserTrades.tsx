import { useEffect, useState } from 'react'
import Spinner from '../../../assets/spinner2.svg'
import GetUserInfoApi from '../../../pages/userinfo/api/GetUserInfo'
import { formatDate } from '../../../shared/services/date'
import { useTokenStore } from '../../../shared/store/TokenStore'
import { UserTableInt } from '../type/UserTableInt'
interface Props {
	mode: string
	id:string
}

export default function UserTrades({ mode, id }: Props) {
	const { GetUserInfoActive, GetUserInfoFinished } = GetUserInfoApi()
	const [trades, _setTrades] = useState<UserTableInt[]>([])
	const {getToken} = useTokenStore()
	let token = getToken()
	const [loading, setLoading] = useState<boolean>(false)
	

	const UserInfoReq = async () => {
		if (id) {
			_setTrades([])
			setLoading(true)
			if (mode === 'Active') {
				const res = await GetUserInfoActive(id)
				if (res?.data) _setTrades(res?.data)
			} else {
				const res = await GetUserInfoFinished(id)
				if (res?.data) _setTrades(res?.data)}
		}
			setLoading(false)
	}

	useEffect(() => {
		if (!token) return
		setTimeout(() => {
			UserInfoReq()
		}, 200);
	}, [mode])

	if (loading) return <div className='w-full flex justify-center'>
		<img src={Spinner} alt="Spinner" className='w-[120px] h-[80px]' />
	</div>

	return (
		<div className='flex flex-col gap-3'>
			{trades?.map((trade) => (
				<button
					key={trade.id}
					className={`w-full bg-white flex justify-between items-center p-2 text-black px-[17px] rounded-2xl border 
					${trade?.blocked ? 'border-red-500' : mode === 'Active' ? 'border-myColor-150' : 'border-myColor-200'}`}
					style={{ boxShadow: '0 0px 20px rgba(0, 0, 0, 0.2)' }}
				>
					<div className='flex flex-col text-sm gap-1'>
						<p className='font-medium'>{trade?.mem_coin}/{trade?.coin}</p>
						{trade?.blocked && <p className='font-medium text-red-500'>{trade?.blocked}</p>}
					</div>
					<div className='flex flex-col'>
						<p className='font-medium text-right'>${trade?.limit_min} - ${trade?.limit_max}</p>
						<p className='text-center' style={{ color: '#9b9b9b' }}>{formatDate(trade?.create_at)}</p>
					</div>
				</button>
			))}
		</div>
	)
}
