import { motion } from 'framer-motion'
import { useState } from 'react'
import { ReactComponent as Spinner } from '../../../assets/spinner.svg'
import { PaymentButton } from '../model'

export default function CheckPaymentButton({apiRequest}:PaymentButton){
	const [loading, setLoading] = useState<boolean>(false)

	const handleClick = async () => {
		setLoading(true)
		apiRequest()
	}

	return (
		<motion.button 
			onClick={handleClick} 
			className={`${loading ? 'bg-crypto-text-tertiary cursor-not-allowed' : 'bg-crypto-info hover:bg-crypto-info-hover'} text-center w-[65%] h-[50px] text-white rounded-xl font-bold flex justify-center items-center gap-2 shadow-crypto transition-all`}
			whileHover={!loading ? { scale: 1.03 } : {}}
			whileTap={!loading ? { scale: 0.98 } : {}}
			disabled={loading}
		>
			{loading && <Spinner className={'w-[40px] h-[40px]'}/>}
			{loading ? 'Checking...' : 'Check Payment'}
		</motion.button>
	)
}