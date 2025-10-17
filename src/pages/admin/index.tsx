import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CoinsTable from '../../entities/Admin/ui/CoinsTable'
import ErrorTransTable from '../../entities/Admin/ui/ErrorTransTable'
import AdminSearchUser from '../../entities/Admin/ui/SearchUser'
import AdminUsersTable from '../../entities/Admin/ui/UsersTable'
import AddNewCoin from '../../features/AddNewCoin'
import CoinsButton from '../../features/AdminButtons/coins-button'
import TransButton from '../../features/AdminButtons/trans-button'
import UsersButton from '../../features/AdminButtons/users-button'
import { useTokenStore } from '../../shared/store/TokenStore'

export default function Admin() {
	const [statusButton, setStatusButton] = useState<string>('Users')
	const [searchUser, setSearchUser] = useState<string>('')
	const [searchCoin, setSearchCoin] = useState<string>('')
	const {role} = useTokenStore()
	const navigate = useNavigate()
	
	useEffect(() => {
		if (role !== 'admin') {
			navigate('/')
		}
	}, [role, navigate])
	
	useEffect(() => {
		setSearchUser('')
		setSearchCoin('')
	}, [statusButton])

	const renderContent = () => {
		switch (statusButton) {
			case 'Users':
				return <AdminUsersTable search={searchUser} />
			case 'Coins':
				return <CoinsTable search={searchCoin} />
			default:
				return <ErrorTransTable/>
		}
	}
	
	if (role !== 'admin') {
		return <></>
	}
	
	return (
		<div className='min-h-screen bg-crypto-bg-primary'>
			<motion.div 
				className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4 }}
			>
				{/* Modern Header with Gradient */}
				<motion.div
					className='relative overflow-hidden bg-gradient-to-r from-crypto-brand-primary/20 via-crypto-brand-primary/10 to-crypto-info/20 rounded-3xl p-6 mb-6 shadow-crypto-lg border border-crypto-border-primary'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
				>
					<div className='relative z-10'>
						<div className='flex items-center justify-between'>
							<div>
								<h1 className='text-4xl font-bold text-crypto-text-primary mb-2'>
									Admin Dashboard
								</h1>
								<p className='text-crypto-text-secondary text-lg'>
									{statusButton === 'Users' ? 'Manage users and monitor activity' :
									 statusButton === 'Coins' ? 'Configure cryptocurrency settings' :
									 'Monitor failed transactions and system health'}
								</p>
							</div>
							<div className='hidden md:block'>
								<div className='w-20 h-20 bg-crypto-brand-primary/20 rounded-full flex items-center justify-center'>
									<svg className='w-10 h-10 text-crypto-brand-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
									</svg>
								</div>
							</div>
						</div>
					</div>
					{/* Background decoration */}
					<div className='absolute top-0 right-0 w-32 h-32 bg-crypto-brand-primary/10 rounded-full -translate-y-16 translate-x-16'></div>
					<div className='absolute bottom-0 left-0 w-24 h-24 bg-crypto-info/10 rounded-full translate-y-12 -translate-x-12'></div>
				</motion.div>

				{/* Modern Navigation Cards */}
				<motion.div 
					className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
				>
					<UsersButton status={statusButton} setStatus={setStatusButton} />
					<CoinsButton status={statusButton} setStatus={setStatusButton} />
					<TransButton status={statusButton} setStatus={setStatusButton} />
				</motion.div>

				{/* Search/Add Section */}
				<motion.div 
					className='w-full flex justify-center mb-6'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
				>
					{statusButton === 'Users' ? (
						<AdminSearchUser setSearch={setSearchUser} />
					) : statusButton === 'Coins' && (
						<AddNewCoin />
					)}
				</motion.div>

				{/* Modern Content Section */}
				<motion.div 
					className='bg-crypto-bg-secondary rounded-3xl shadow-crypto-lg border border-crypto-border-primary overflow-hidden'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					{renderContent()}
				</motion.div>
			</motion.div>
		</div>
	)
}
