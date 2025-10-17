import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTokenStore } from '../../shared/store/TokenStore';

export default function TrxToUsdt() {
	const [currency, setCurrency] = useState<string>('TRX');
	const {setCurrencyCoin} = useTokenStore()

	const toggleCurrency = (selectedCurrency: string) => {
		setCurrency(selectedCurrency);
		setCurrencyCoin(selectedCurrency)
	};
	

	return (
		<div
			className="relative flex items-center text-sm font-semibold rounded-2xl p-[2px] bg-crypto-bg-tertiary shadow-crypto border border-crypto-border-primary"
		>
			<motion.div
				className="absolute top-[5%] bg-crypto-brand-primary rounded-2xl shadow-crypto"
				style={{
					width: '49%',
					height: '89%'
				}}
				initial={false}
				animate={{
					x: currency === 'USDT' ? '100%' : '0%',
				}}
				transition={{ type: 'spring', stiffness: 300, damping: 30 }}
			/>
			<button
				onClick={() => toggleCurrency('TRX')}
				className={`py-[5px] px-5 z-10 w-1/2 text-center transition-all duration-300 ${
					currency === 'TRX' ? 'text-crypto-bg-primary' : 'text-crypto-text-tertiary'
				}`}
			>
				TRX
			</button>
			<button
				onClick={() => toggleCurrency('USDT')}
				className={`py-[5px] px-5 z-10 w-1/2 text-center transition-all duration-300 ${
					currency === 'USDT' ? 'text-crypto-bg-primary' : 'text-crypto-text-tertiary'
				}`}
			>
				USDT
			</button>
		</div>
	);
}
