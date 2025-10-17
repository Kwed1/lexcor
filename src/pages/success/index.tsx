import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SuccessPage() {
	const navigate = useNavigate()
	useEffect(() => {
		setTimeout(() => {
		  navigate('/')
		}, 5000);
	}, [])
	return (
		<div className="w-full min-h-screen bg-crypto-bg-primary flex items-center justify-center">
			<motion.div 
				className="text-center p-10 bg-crypto-bg-secondary shadow-crypto-lg rounded-3xl border border-crypto-border-primary max-w-md mx-4"
				initial={{ opacity: 0, scale: 0.8, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				transition={{ duration: 0.5, type: "spring" }}
			>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
				>
					<div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-crypto-success to-green-400 rounded-full flex items-center justify-center shadow-crypto-lg'>
						<motion.svg
							className="w-14 h-14 text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
								clipRule="evenodd"
							/>
						</motion.svg>
					</div>
				</motion.div>
				<motion.h1 
					className="text-4xl font-bold text-crypto-success mb-4"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					Transaction in Progress!
				</motion.h1>
				<motion.p 
					className="mt-4 text-crypto-text-secondary text-lg leading-relaxed"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
				>
					The transaction is currently in progress, and you will receive a notification once it is successfully completed.
				</motion.p>
				<motion.div
					className='mt-8 flex items-center justify-center gap-3 text-crypto-text-tertiary'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7 }}
				>
					<motion.div
						className="w-6 h-6 border-2 border-crypto-brand-primary border-t-transparent rounded-full"
						animate={{ rotate: 360 }}
						transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					/>
					<span className="text-base font-medium">Redirecting to home...</span>
				</motion.div>
			</motion.div>
		</div>
	);
}
