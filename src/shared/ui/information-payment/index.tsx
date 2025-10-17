import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function InformationOfPayment () {
	return (
		<motion.p 
			className='text-center text-[15px] h-xs:text-[12px] px-4 text-crypto-text-tertiary leading-relaxed'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.6 }}
		>
			Within five minutes, PINO will be credited to your account. In case of waiting for more than 20 minutes - write to tech support: <Link to={'https://youtube.com'} className='text-crypto-info hover:text-crypto-info-hover underline transition-colors'>tech support</Link>
		</motion.p>
	)
}