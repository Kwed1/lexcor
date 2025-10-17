import { motion } from 'framer-motion'
import { ReactComponent as Galochka } from '../../assets/galochka.svg'

interface Props {
	status: string
	setStatus: React.Dispatch<React.SetStateAction<string>>
}

export default function TransButton({status, setStatus}:Props) {
	const isActive = status === 'Trans'
	
	return (
		<motion.div
			className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
				isActive 
					? 'bg-gradient-to-br from-crypto-brand-primary to-crypto-brand-primary/80 shadow-crypto-lg border-2 border-crypto-brand-primary' 
					: 'bg-crypto-bg-secondary hover:bg-crypto-bg-hover shadow-crypto border border-crypto-border-primary hover:border-crypto-brand-primary/50'
			}`}
			onClick={() => setStatus('Trans')}
			whileHover={{ scale: 1.02, y: -2 }}
			whileTap={{ scale: 0.98 }}
		>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
						isActive ? 'bg-white/20' : 'bg-crypto-brand-primary/20'
					}`}>
						<svg className={`w-6 h-6 ${isActive ? 'text-white' : 'text-crypto-brand-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
						</svg>
					</div>
					<div>
						<h3 className={`font-semibold text-lg ${isActive ? 'text-white' : 'text-crypto-text-primary'}`}>
							Transactions
						</h3>
						<p className={`text-sm ${isActive ? 'text-white/80' : 'text-crypto-text-secondary'}`}>
							Monitor errors
						</p>
					</div>
				</div>
				{isActive && (
					<motion.div
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
					>
						<Galochka className="w-5 h-5 text-white" />
					</motion.div>
				)}
			</div>
			{/* Background decoration */}
			{isActive && (
				<div className='absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10'></div>
			)}
		</motion.div>
	)
}