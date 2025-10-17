import { motion } from 'framer-motion'
import TRX from '../../assets/valute-icons/trx.svg'
import USDT from '../../assets/valute-icons/usdt.svg'
import TransactionHistory from '../../entities/WalletHistory/ui/TransactionHistory'
import ModalOfWallet from '../../features/ModalOfWallet'
import useWalletStore from '../../shared/store/WalletStore'
import FrameValute from '../../shared/ui/frame-valute'
import WalletHeader from '../../widgets/WalletHeader'

const Walletpage = () => {
	const {trx, usdt, mem_coins} = useWalletStore()
	return (
		<div className='w-full min-h-screen bg-crypto-bg-primary'>
			<motion.div
				className='max-w-4xl mx-auto'
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
								Wallet
							</h1>
							<p className='text-crypto-text-secondary text-lg'>
								Manage your cryptocurrency balances and transactions
							</p>
						</div>
						<div className='hidden md:block'>
							<div className='w-20 h-20 bg-crypto-brand-primary/20 rounded-full flex items-center justify-center'>
								<svg className='w-10 h-10 text-crypto-brand-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
								</svg>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Wallet Header */}
				<motion.div 
					className='w-full mb-6'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<WalletHeader/>
				</motion.div>

				{/* Wallet Actions */}
				<motion.div 
					className='flex justify-end mb-6'
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
				>
					<ModalOfWallet/>
				</motion.div>

				{/* Balance Cards */}
				<motion.div 
					className='bg-crypto-bg-secondary rounded-3xl p-6 mb-6 shadow-crypto-lg border border-crypto-border-primary'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className='text-xl font-semibold text-crypto-text-primary mb-4'>Your Balances</h3>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						<div className='bg-crypto-bg-tertiary rounded-2xl p-4 border border-crypto-border-primary'>
							<FrameValute amount={usdt} Image={USDT} valute='USDT'/>
						</div>
						<div className='bg-crypto-bg-tertiary rounded-2xl p-4 border border-crypto-border-primary'>
							<FrameValute amount={trx} Image={TRX} valute='TRX'/>
						</div>
						{mem_coins?.map((mem) => (
							mem?.price > 0 && mem?.token !== 'USDT' && mem?.token !== 'TRX' ? (
								<div className='bg-crypto-bg-tertiary rounded-2xl p-4 border border-crypto-border-primary' key={mem?.token}>
									<FrameValute amount={mem?.price.toFixed(5)} Image={''} valute={mem?.token}/>
								</div>
							) : null
						))}
					</div>
				</motion.div>

				{/* Transaction History */}
				<motion.div 
					className='bg-crypto-bg-secondary rounded-3xl shadow-crypto-lg border border-crypto-border-primary overflow-hidden'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
				>
					<div className='p-6'>
						<h3 className='text-xl font-semibold text-crypto-text-primary mb-4'>Transaction History</h3>
						<TransactionHistory/>
					</div>
				</motion.div>
			</motion.div>
		</div>
	)
}

export default Walletpage