import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useApi from '../../api/apiHandler'
import { ReactComponent as BuySVG } from '../../assets/buy.svg'
import { useGetInfoApi } from '../../pages/trades/api/GetTradeInfo'

interface Props {
	inputValue: number
	Coin:string,
	id:string
	MemcoinPrice: number
	Type: number | undefined
	Limits_min: number,
	Limits_max: number,
	isSuggest: boolean,
	sugPrice: number|string
}

export default function BuyButton({inputValue, Coin, id, MemcoinPrice, Type
	, Limits_min, Limits_max, isSuggest, sugPrice
}:Props) {
	const navigate = useNavigate()
	const [red, setRed] = useState<boolean>(true)
	const [loading, setLoading] = useState<boolean>(false)
	const api = useApi()
	const {SuggestTrade} = useGetInfoApi()
	const SuggestPrice = async() => {
		try {
			setLoading(true)
			const res = await SuggestTrade(id, inputValue, sugPrice)
			if (res.status === 200) {
				navigate('/')
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false)
		}
	}
 
	const OrderBuy = async() => {
		setLoading(true)
		try {
			const res = await api<string>({
				url: `/order/buy?order_id=${id}&price=${inputValue}`,
				method: 'POST'
			})
			if (res?.status === 200) {
				setTimeout(() => {
					const start = api({
						url: `/order/start-transaction?transaction_id=${res?.data}`,
						method: 'POST'
					})
						navigate('/success')
				}, 1000);
			}
		}catch(e) {
			console.log(e);
		} finally {
			setLoading(false)
		}
	}

	const handleClick = () => {
		if (isSuggest) {
			SuggestPrice()
		}else {
			OrderBuy()
		}
  };

	useEffect(() => {
		if (inputValue >= Limits_min && inputValue <= Limits_max) {
			setRed(false)
		} else {
			setRed(true)
		}
	}, [inputValue])

	let amount = inputValue / MemcoinPrice
	
	const buttonColor = isSuggest 
		? 'bg-crypto-info hover:bg-crypto-info-hover' 
		: Type === 1 
			? 'bg-crypto-danger hover:bg-crypto-danger-hover' 
			: 'bg-crypto-success hover:bg-crypto-success-hover'
	
	return (
		<motion.button 
			className={`${buttonColor} w-full h-[50px] flex items-center ${
				(red || loading) ? 'opacity-50 cursor-not-allowed' : ''
			} justify-center text-lg rounded-xl text-white font-bold shadow-crypto transition-all gap-2`} 
			onClick={() => handleClick()}
			disabled={red || loading}
			whileHover={!red && !loading ? { scale: 1.03, y: -2 } : {}}
			whileTap={!red && !loading ? { scale: 0.98 } : {}}
		>
			<BuySVG className="w-5 h-5"/>
			<p>{isSuggest ? 'Propose' : Type === 1 ? 'Sell' : 'Buy'}</p>
			<p className={`${red ? 'text-crypto-danger' : 'text-white'} font-bold`}>{amount.toFixed(5)}</p>
			<p>{Coin}</p>
			{loading && (
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
					className="ml-2"
				>
					⏳
				</motion.div>
			)}
		</motion.button>
	)
}