import { motion } from 'framer-motion'
import { useState } from 'react'
import TransactionTable from '../../entities/MyAds/ui/TransactionTables'
import ToggleActiveFinished from '../../features/MyAds/ui/ToggleActiveFinished'


export default function Myads() {
	const [mode, setMode] = useState<string>('Active')
	
	return (
		<div className='w-full min-h-screen bg-crypto-bg-primary'>
			<motion.div
				className='max-w-4xl mx-auto py-6'
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
						<div>
							<h1 className='text-4xl font-bold text-crypto-text-primary mb-2'>
								My Deals
							</h1>
							<p className='text-crypto-text-secondary text-lg'>
								Manage your active and completed trading deals
							</p>
						</div>
						<div className='hidden md:block'>
							<div className='w-20 h-20 bg-crypto-brand-primary/20 rounded-full flex items-center justify-center'>
								<svg className='w-10 h-10 text-crypto-brand-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
								</svg>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Toggle Section */}
				<motion.div 
					className='flex justify-end w-full mb-6'
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
				>
					<ToggleActiveFinished mode={mode} setMode={setMode}/>
				</motion.div>

				{/* Content Section */}
				<motion.div 
					className='bg-crypto-bg-secondary rounded-3xl shadow-crypto-lg border border-crypto-border-primary overflow-hidden'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<div className='p-6'>
						<h3 className='text-xl font-semibold text-crypto-text-primary mb-4'>
							{mode} Deals
						</h3>
						<TransactionTable mode={mode}/>
					</div>
				</motion.div>
			</motion.div>
		</div>
	)
}