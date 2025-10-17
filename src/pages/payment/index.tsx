import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Spinner from '../../assets/spinner2.svg'
import CopyInput from '../../features/CopyInput'
import QRCodeGeneration from '../../features/QRCodeGeneration'
import useWalletStore from '../../shared/store/WalletStore'
import { TelegramWebApp } from '../../shared/types/Telegram'
import InformationOfPayment from '../../shared/ui/information-payment'

export default function Payment() {
	const {address} = useWalletStore()
 	const test = () => {
		console.log(123);
	}

	const tg: TelegramWebApp | undefined = (window as any).Telegram?.WebApp
  
  const navigate = useNavigate()
	const location = useLocation()
	
  useEffect(() => {
    const handleBackButton = () => {
      navigate(-1)
    }

    if (tg?.BackButton) {
        tg.BackButton.show()
        tg.BackButton.onClick(handleBackButton)

        return () => {
          tg.BackButton?.offClick(handleBackButton)
          tg.BackButton?.hide()
        }
      }
  }, [location.pathname])

	return (
		<div className='w-full min-h-screen bg-crypto-bg-primary'>
			{!address ? (
				<div className='h-screen w-full flex justify-center items-center'>
					<motion.img 
						src={Spinner} 
						alt="" 
						className='w-[120px] h-[80px] opacity-80'
						animate={{ rotate: 360 }}
						transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					/>
				</div>
			): (
				<motion.div 
					className='max-w-2xl mx-auto pb-32'
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
									Payment
								</h1>
								<p className='text-crypto-text-secondary text-lg'>
									Send cryptocurrency to the provided address
								</p>
							</div>
							<div className='hidden md:block'>
								<div className='w-20 h-20 bg-crypto-brand-primary/20 rounded-full flex items-center justify-center'>
									<svg className='w-10 h-10 text-crypto-brand-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
									</svg>
								</div>
							</div>
						</div>
					</motion.div>

					{/* QR Code Section */}
					<motion.div 
						className='bg-crypto-bg-secondary rounded-3xl p-8 mb-6 shadow-crypto-lg border border-crypto-border-primary text-center'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						whileHover={{ scale: 1.02 }}
					>
						<h3 className='text-2xl font-bold text-crypto-text-primary mb-4'>Send COIN to the address</h3>
						<QRCodeGeneration url={address} />
					</motion.div>

					{/* Copy Address Section */}
					<motion.div 
						className='bg-crypto-bg-secondary rounded-2xl p-6 mb-6 shadow-crypto border border-crypto-border-primary'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						<h3 className='text-lg font-semibold text-crypto-text-primary mb-4'>Wallet Address</h3>
						<CopyInput url={address}/>
					</motion.div>

					{/* Information Section */}
					<motion.div 
						className='fixed bottom-6 left-0 w-full px-4'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
					>
						<InformationOfPayment/>
					</motion.div>
				</motion.div>
			)}
		</div>
	)
}