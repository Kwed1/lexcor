import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import CryptoIcon from '../CryptoIcon'

interface Props {
	BalanceAmount: number,
	Limits_min: number,
	Limits_max: number,
	Comissions: number,
	Coin: string,
	Type: number | undefined
	MemCoin: string,
	Value: number,
	MemCoinPrice: number
	PinoUSDT: number,
	PinoTRX: number,
	CoinPrice: string
}

export default function TradeInformation({BalanceAmount, Limits_min, Limits_max, Comissions, CoinPrice, Coin, Type, MemCoin, MemCoinPrice, Value, PinoTRX, PinoUSDT}:Props) {
	const [com, setCom] = useState<number>(0)
	
	const info = [
		{ 
			title: 'Available Balance', 
			amount: `${BalanceAmount.toFixed(5)}`, 
			currency: Type === 1 ? MemCoin : Coin,
			icon: Type === 1 ? MemCoin : Coin,
			color: 'text-crypto-success'
		},
		{ 
			title: 'Trading Limits', 
			amount: `$${Limits_min.toLocaleString()} - $${Limits_max.toLocaleString()}`, 
			currency: '',
			icon: null,
			color: 'text-crypto-info'
		},
		{ 
			title: 'Commission Fee', 
			amount: `${com.toFixed(5)}`, 
			currency: 'PINO',
			icon: 'PINO',
			color: 'text-crypto-warning'
		},
		{ 
			title: 'Current Rate', 
			amount: `$${parseFloat(CoinPrice).toLocaleString()}`, 
			currency: Coin,
			icon: Coin,
			color: 'text-crypto-brand-primary'
		}
	]

	useEffect(() => {
		if (Coin === 'TRX') {
		  const amount = (Value / PinoTRX);
			const fee = amount * 0.025;
			setCom(parseFloat(fee.toFixed(5)))
		} else if (Coin === 'USDT') {
			const amount = (Value / PinoUSDT)
			const fee = amount * 0.025;
			setCom(Math.round(fee));
		}
	}, [Value]);

	return (
		<div className='bg-crypto-bg-secondary rounded-2xl p-6 shadow-crypto border border-crypto-border-primary'>
			<h3 className='text-lg font-semibold text-crypto-text-primary mb-4'>Trade Details</h3>
			<div className='space-y-4'>
				{info.map((inf, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: i * 0.1 }}
						className={`flex items-center justify-between p-3 rounded-xl ${
							i !== info.length - 1 ? 'border-b border-crypto-border-primary' : ''
						}`}
					>
						<div className='flex items-center gap-3'>
							{inf.icon && (
								<div className='w-8 h-8 bg-crypto-bg-tertiary rounded-full flex items-center justify-center'>
									<CryptoIcon token={inf.icon} size="sm" />
								</div>
							)}
							<div>
								<p className='text-sm text-crypto-text-secondary font-medium'>{inf.title}</p>
								{inf.currency && (
									<p className='text-xs text-crypto-text-tertiary'>{inf.currency}</p>
								)}
							</div>
						</div>
						<div className='text-right'>
							<p className={`font-bold text-lg ${inf.color}`}>{inf.amount}</p>
							{inf.currency && inf.currency !== Coin && (
								<p className='text-xs text-crypto-text-tertiary'>{inf.currency}</p>
							)}
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}

