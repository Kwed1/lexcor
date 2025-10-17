import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../../assets/spinner2.svg'
import { useTokenStore } from '../../../shared/store/TokenStore'
import GetUsersApi from '../api/GetUsers'
import { UsersInt } from '../type/UsersInt'

interface Props {
	search: string
}

export default function AdminUsersTable({ search }: Props) {
	const navigate = useNavigate()
	const { GetUsers } = GetUsersApi()
	const {getToken} = useTokenStore()
	let token = getToken()
	const [Reqloading, setReqLoading] = useState<boolean>(true)
	const [users, setUsers] = useState<UsersInt[]>([])
	const [debouncedSearch, setDebouncedSearch] = useState<string>(search)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search)
		}, 500)

		return () => {
			clearTimeout(handler)
		}
	}, [search])

	const GetUsersReq = async () => {
		setReqLoading(true)
		const res = await GetUsers(debouncedSearch)
		if (res?.data) setUsers(res?.data)
		setReqLoading(false)
	}

	useEffect(() => {
		if (!token) return
			GetUsersReq()
	}, [debouncedSearch, token])

	if (Reqloading) {
		return (
			<div className="w-full flex justify-center items-center">
				<img src={Spinner} alt="Spinner" className="w-[120px] h-[80px]" />
			</div>
		)
	}

	return (
		<div className="overflow-hidden">
			{/* Table Header */}
			<div className="bg-crypto-bg-tertiary border-b border-crypto-border-primary px-4 sm:px-6 py-3">
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs font-medium text-crypto-text-tertiary uppercase tracking-wider">
					<div>User</div>
					<div className="hidden sm:block">Status</div>
					<div>Active</div>
					<div>Completed</div>
				</div>
			</div>
			
			{/* Table Body */}
			<div className="divide-y divide-crypto-border-primary">
				{users?.map((user, index) => (
					<motion.button
						className="w-full bg-crypto-bg-secondary hover:bg-crypto-bg-hover flex items-center px-4 sm:px-6 py-4 text-left transition-colors duration-200 group"
						onClick={() =>
							navigate(`/userInfo/${user?.id}`, {
								state: { username: user?.username, image: user?.image, blocked: user?.blocked},
							})
						}
						key={user?.id}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.05 }}
					>
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 w-full items-center">
							{/* User Info */}
							<div className="flex items-center">
								<div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden mr-2 sm:mr-3 flex-shrink-0">
									<img 
										src={user?.image || 'https://i.pravatar.cc/150?img=1'} 
										alt={user?.username}
										className="w-full h-full object-cover"
									/>
								</div>
								<span className="font-medium text-crypto-text-primary group-hover:text-crypto-text-primary text-sm sm:text-base truncate">
									{user?.username}
								</span>
							</div>
							
							{/* Status - Hidden on mobile */}
							<div className="hidden sm:block">
								{user?.blocked ? (
									<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
										Blocked
									</span>
								) : (
									<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
										Active
									</span>
								)}
							</div>
							
							{/* Active Deals */}
							<div className="text-sm text-crypto-text-primary">
								{user?.active_deals}
							</div>
							
							{/* Completed Deals */}
							<div className="text-sm text-crypto-text-primary">
								{user?.finished_deals}
							</div>
						</div>
					</motion.button>
				))}
			</div>
		</div>
	)
}
