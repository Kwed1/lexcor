import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ReactComponent as Blocked } from '../../assets/blocked.svg'
import UserIcon from '../../assets/user-black.svg'
import UserTrades from '../../entities/UserInfo/ui/UserTrades'
import ToggleActiveFinished from '../../features/MyAds/ui/ToggleActiveFinished'
import Footer from '../../shared/ui/footer'

export default function UserInfopage() {
	const [mode, setMode] = useState<string>('Active')
	const { id } = useParams()
	const {state} = useLocation()
	const {username, image, blocked} = state
	

	return (
		<div className='w-full min-h-screen bg-crypto-bg-primary'>
			<motion.div
				className='max-w-4xl mx-auto px-4 py-6'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
			>
				{/* Header Section */}
				<motion.div 
					className='bg-gradient-to-r from-crypto-brand-primary/20 to-crypto-info/20 rounded-3xl p-6 mb-6 shadow-crypto-lg border border-crypto-border-primary'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
				>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<div className='relative'>
								<img src={image || UserIcon} alt="" className='w-16 h-16 rounded-full shadow-crypto border-2 border-crypto-border-primary' />
								{!blocked && <div className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-crypto-bg-primary'></div>}
							</div>
							<div>
								<h1 className='text-2xl font-bold text-crypto-text-primary'>{username}</h1>
								<p className='text-crypto-text-secondary'>User Profile</p>
							</div>
						</div>
						<div className='hidden md:block'>
							<div className='w-20 h-20 bg-crypto-brand-primary/20 rounded-full flex items-center justify-center'>
								<svg className='w-10 h-10 text-crypto-brand-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Blocked Status */}
				{blocked && (
					<motion.div 
						className='bg-crypto-danger-bg rounded-2xl p-4 mb-6 border border-crypto-danger text-center'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
					>
						<div className='flex items-center justify-center gap-2 text-crypto-danger'>
							<Blocked className="w-5 h-5"/>
							<span className='font-semibold'>Blocked Account</span>
						</div>
					</motion.div>
				)}

				{/* Toggle Section */}
				<motion.div 
					className='flex justify-end w-full mb-6'
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
				>
					<ToggleActiveFinished mode={mode} setMode={setMode}/>
				</motion.div>

				{/* Content Section */}
				<motion.div 
					className='bg-crypto-bg-secondary rounded-3xl shadow-crypto-lg border border-crypto-border-primary overflow-hidden'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<div className='p-6'>
						<h3 className='text-xl font-semibold text-crypto-text-primary mb-4'>
							{mode} Deals
						</h3>
						<UserTrades mode={mode} id={id || ''}/>
					</div>
				</motion.div>

				{/* Footer */}
				<motion.div 
					className='mt-6'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
				>
					<Footer/>
				</motion.div>
			</motion.div>
		</div>
	)
}