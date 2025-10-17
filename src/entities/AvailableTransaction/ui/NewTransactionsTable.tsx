import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../../assets/spinner2.svg'
import { useTokenStore } from '../../../shared/store/TokenStore'
import useGetTrade from '../api/GetTrades'
import { TradesInt } from '../type/TradesInt'
interface Props {
	orderType: number,
	priceTo: number,
	memCoin: string
}

export default function NewTransactionTable({orderType, priceTo, memCoin}:Props) {
	 const {GetTrades} = useGetTrade()
	 const {getToken} = useTokenStore()
	 const token = getToken()
	 const [orders, setOrders] = useState<TradesInt[]>([])
	 const [loading, setLoading] = useState<boolean>(false)
	 const {getCurrency} = useTokenStore()
	 const coin = getCurrency()

	 const asyncGet = async () => {
		  setLoading(true)
			const res = await GetTrades(coin, orderType, priceTo, memCoin)
			if (res?.data) {
				setOrders(res?.data)
				setLoading(false)
			}
	 }
	 
	 useEffect(() => {
		if (!token) return 
		asyncGet()
	 }, [token, orderType, priceTo, memCoin, coin])
	 

	 const navigate = useNavigate()

	 const handleClick = (id: string, username:string, coinPrice:string) => {
    navigate(`/trades/${id}`, {state:{username: username, coinPrice: coinPrice, coin:coin }});
  };

	return (
		<div className='flex flex-col gap-3'>
		{loading ? (
			<div className='w-full flex justify-center items-center py-10'>
				<motion.img 
					src={Spinner} 
					alt="Spinner" 
					className='w-[120px] h-[80px] opacity-80'
					animate={{ rotate: 360 }}
					transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
				/>
			</div>
		) : 
		orders.map((order, index) => (
			<motion.button 
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: index * 0.05 }}
				whileHover={{ scale: 1.02, y: -2 }}
				whileTap={{ scale: 0.98 }}
				className='w-full bg-crypto-bg-secondary hover:bg-crypto-bg-hover flex flex-col justify-center p-4 rounded-xl shadow-crypto border border-crypto-border-primary transition-all duration-200' 
				key={order.id} 
				onClick={() => handleClick(order.id, order?.owner, order?.coin_price)}
			>

				<div className='flex w-full justify-between items-center text-sm gap-1 border-b border-crypto-border-primary pb-2'>
					<p className='font-semibold text-crypto-text-primary'>{order.mem_coin}/{order.coin}</p>
					<p className='font-semibold text-right text-crypto-brand-primary'>
					{(parseFloat(order?.coin_price ?? '0').toFixed(5))} {coin}
					</p>
				</div>

				<div className='flex justify-between items-center w-full pt-2 font-[300]'>
					<p className='text-[12px] text-crypto-text-secondary'>{order?.owner}</p>
					<p className='text-center text-[12px] text-crypto-text-tertiary'>Coin price</p>
				</div>

			</motion.button>
		))
		}
		
		</div>
	)
}