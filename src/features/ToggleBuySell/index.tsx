import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
	setOrderType: React.Dispatch<React.SetStateAction<number>>
}

export default function ToggleBuySell({setOrderType}: Props) {
  const [mode, setMode] = useState<boolean>(true);
	const [type, setType] = useState<string>('Sell')
	const [editType, setEditType] = useState<string>('Buy')
	const location = useLocation()
	
	const toggleSwitch = (mode: string) => {
		if (location.pathname === '/createDeal') {
			let type = mode === 'Sell' ? 0 : 1
			setType(mode)
			setMode(mode === 'Sell');
			setOrderType(type)
		}else {
			let type = mode === 'Buy' ? 0 : 1
			setEditType(mode)
			setMode(mode === 'Buy');
			setOrderType(type)
		}
	};

	return (
	   <>
		 {location.pathname === '/createDeal' ? (
			<>
			<div
				className="relative flex items-center text-sm rounded-3xl p-[2px] bg-crypto-bg-secondary shadow-crypto"
			>
				<motion.div
					className={`absolute top-[2px] left-[2px] h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-3xl ${type === 'Sell' ? 'bg-crypto-danger': 'bg-crypto-success'}`}
					initial={false}
					animate={{ x: mode ? '0%' : '100%' }}
					transition={{ type: 'spring', stiffness: 500, damping: 50 }}
				/>

				<button
					onClick={() => toggleSwitch('Sell')}
					className={`relative z-10 px-2 py-2 w-1/2 rounded-3xl font-bold transition-all duration-300 ${mode ? 'text-white' : 'text-crypto-text-secondary'}`}
				>
					SELL
				</button>
				<button
					onClick={() => toggleSwitch('Buy')}
					className={`relative z-10 px-2 py-2 rounded-3xl w-1/2 font-bold transition-all duration-300 ${!mode ? 'text-white' : 'text-crypto-text-secondary'}`}
				>
					BUY
				</button>
			</div>
			</>
		 ) : (
			<>
				<div
				className="relative flex items-center text-sm rounded-[15px] p-[2px] h-[38px] bg-crypto-bg-secondary shadow-crypto"
			>
				<motion.div
					className={`absolute top-[1px] left-[2px] h-[calc(100%-2px)] w-[calc(50%-2px)] rounded-[14px] ${editType === 'Sell' ? 'bg-crypto-danger': 'bg-crypto-success'}`}
					initial={false}
					animate={{ x: mode ? '0%' : '100%' }}
					transition={{ type: 'spring', stiffness: 500, damping: 50 }}
				/>

				<button
					onClick={() => toggleSwitch('Buy')}
					className={`relative z-10 px-4 py-1 rounded-2xl transition-all duration-300 font-semibold ${mode ? 'text-white' : 'text-crypto-text-secondary'}`}
				>
					Buy
				</button>
				<button
					onClick={() => toggleSwitch('Sell')}
					className={`relative z-10 px-4 py-1 rounded-2xl transition-all duration-300 font-semibold ${!mode ? 'text-white' : 'text-crypto-text-secondary'}`}
				>
					Sell
				</button>
			</div>
			</>
		 )}
		</>
	);
}
