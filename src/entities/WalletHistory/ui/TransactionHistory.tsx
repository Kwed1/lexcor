import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Pino from '../../../assets/pino.jpg'
import Spinner from '../../../assets/spinner2.svg'
import Trx from '../../../assets/valute-icons/trx.svg'
import Usdt from '../../../assets/valute-icons/usdt.svg'
import { useGetWallet } from '../../../shared/services/api/get-wallet/get-wallet'
import { formatDate } from '../../../shared/services/date'
import { useTokenStore } from '../../../shared/store/TokenStore'
import CryptoIcon from '../../../shared/ui/CryptoIcon'
import { WalletHistoryInt } from '../type/HistoryInt'
export default function TransactionHistory() {
	const {getWalletHistory} = useGetWallet()
	const {getToken} = useTokenStore()
	let token = getToken()
	const [walletHistory, setWalletHistory] = useState<WalletHistoryInt[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const firstRender = useRef<boolean>(false)

	const getWallet = async() => {
		setLoading(true)
		const res = await getWalletHistory()
		if (res?.data) setWalletHistory(res?.data)
		setLoading(false)
	 }

	useEffect(() => {
		if (!token) return
		if (!firstRender.current) {
			getWallet()
			firstRender.current = true
		} 
	}, [token])

	if (loading) return (
	<div className='w-full flex justify-center items-center py-10'>
	<motion.img 
		src={Spinner} 
		alt='Spinner' 
		className='w-[120px] h-[80px] opacity-80'
		animate={{ rotate: 360 }}
		transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
	/>
	</div>
	)

  const GetIcon = (icon:string) => {
		switch (icon) {
			case 'TRX':
				return <img src={Trx} className='rounded-full w-[25px]' alt="" />
			case 'USDT':
				return <img src={Usdt} alt="" className='rounded-full w-[25px]' />
			case 'PINO':
				return <img src={Pino} alt="" className='rounded-full w-[25px]' />
			case 'ARES':
			case 'MOONCAT':
			case 'SUNDOG':
			case 'TBULL':
				// Используем CryptoIcon для валют с локальными иконками
				return <CryptoIcon token={icon} size="sm" />
			default:
				return <CryptoIcon token={icon} size="sm" />
		}
	}
	 
	return (
		<>
			<div className="flex flex-col gap-3 pb-[100px] sm:pb-[300px]">
				 {walletHistory?.map((wallet, i) => (
					<motion.div 
						key={i}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3, delay: i * 0.05 }}
						whileHover={{ scale: 1.02, x: 4 }}
						className='w-full bg-crypto-bg-secondary hover:bg-crypto-bg-hover flex justify-between items-center py-4 px-4 rounded-xl shadow-crypto border border-crypto-border-primary transition-all'
					>
					<div className='flex items-center gap-3'>
						{GetIcon(wallet?.coin)}
						<div className='flex flex-col text-[12px]'>
							<p className='font-semibold text-crypto-text-primary'>{wallet?.coin}</p>
							<p className='text-crypto-text-tertiary'>{formatDate(wallet?.datetime)}</p>
						</div>
					</div>
					<div className='flex flex-col items-end'>
						<p className={`${wallet?.type === 'Withdraw' ? 'text-crypto-danger': 'text-crypto-success'} font-bold text-base`}>
							{wallet?.type === 'Withdraw' ? '-' : '+'}{wallet?.amount.toFixed(5)}
						</p>
						<p className='text-[10px] text-crypto-text-tertiary'>{wallet?.type}</p>
					</div>
				</motion.div>
				 ))}
			</div>
		</>
	)
}
