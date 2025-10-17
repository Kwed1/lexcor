import { motion } from 'framer-motion'
import { ReactComponent as Arrow } from '../../../../assets/arrow-down.svg'
import Pino from '../../../../assets/pino.jpg'
import TrxIcon from '../../../../assets/valute-icons/trx.svg'
import UsdtIcon from '../../../../assets/valute-icons/usdt.svg'
import { useCoinStore } from '../../../../shared/store/CoinsStore'
import CryptoIcon from '../../../../shared/ui/CryptoIcon'
interface Props {
	setSelectedCoin: React.Dispatch<React.SetStateAction<string>>
	selectedCoin: string;
	coinPrice:number | null
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	isOpen:boolean
}
export default function SelectCoinForWithdraw({selectedCoin, setIsOpen, isOpen, setSelectedCoin, coinPrice}:Props) {
	const { coins } = useCoinStore();
	const GetCoinIcon = (token:string) => {
		switch (token) {
			case 'PINO': 
				return (
					<img src={Pino} className='w-6 h-6 rounded-full' alt="" />
				)
			case 'USDT': 
			return (
				<img src={UsdtIcon} className='w-6 h-6 rounded-full' alt="" />
			)
			case 'TRX': 
			return (
				<img src={TrxIcon} className='w-6 h-6 rounded-full' alt="" />
			)
			case 'BTC':
			case 'ETH':
			case 'BNB':
			case 'LINK':
			case 'LTC':
			case 'SOL':
				return <CryptoIcon token={token} size="md" className="w-6 h-6" />
			default: 
			return <CryptoIcon token={token} size="md" className="w-6 h-6" />
		}
	}

	const GetCoinName = (token: string) => {
		switch (token) {
			case 'PINO': return 'PINO'
			case 'USDT': return 'USDT'
			case 'TRX': return 'TRX'
			case 'BTC': return 'Bitcoin'
			case 'ETH': return 'Ethereum'
			case 'BNB': return 'Binance Coin'
			case 'LINK': return 'Chainlink'
			case 'LTC': return 'Litecoin'
			case 'SOL': return 'Solana'
			default: 
				const coin = coins.find(c => c.token === token)
				return coin?.name || token
		}
	}
	const toggleList = () => {
    setIsOpen(!isOpen);
  };

	const selectOption = (option: string) => {
		setSelectedCoin(option);
		setIsOpen(false);
	};

	return (
	 <div className="relative">
				 <div
					 className="w-full h-[59px] px-4 bg-crypto-bg-secondary rounded-xl flex flex-col items-start justify-center shadow-crypto border border-crypto-border-primary"
				 >
					 <button className="flex w-full items-center cursor-pointer justify-between" onClick={toggleList}>
								<div className='flex items-center gap-3'>
								{GetCoinIcon(selectedCoin)}
								<p className="text-[16px] font-semibold w-full text-left text-crypto-text-primary"> {coinPrice?.toFixed(5)} <span className="text-crypto-text-secondary">{GetCoinName(selectedCoin)}</span></p>
								</div>
								 <Arrow className={`h-[24px] w-[24px] transform transition-transform duration-300 fill-crypto-text-tertiary ${isOpen ? 'rotate-180' : ''}`} />
					 </button>
				 </div>
	 
				 <motion.div
					 initial={{ height: 0, opacity: 0 }}
					 animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
					 transition={{ duration: 0.3 }}
					 className="absolute left-0 right-0 mt-2 overflow-hidden bg-crypto-bg-tertiary rounded-xl max-h-[105px] overflow-y-scroll shadow-crypto-lg border border-crypto-border-primary"
					 style={{ zIndex: 20 }}
				 >
					 <ul className="p-2 text-[14px] px-3 flex flex-col gap-1">
							 <li
								 key={0}
								 className={`py-3 cursor-pointer hover:text-crypto-brand-primary transition-colors font-semibold flex items-center gap-3 ${selectedCoin === 'USDT' ? 'text-crypto-brand-primary' : 'text-crypto-text-secondary'}`}
								 onClick={() => selectOption('USDT')}
							 >
								 {GetCoinIcon('USDT')}
								 USDT
							 </li>
							 <li
								 key={1}
								 className={`py-3 cursor-pointer hover:text-crypto-brand-primary transition-colors font-semibold flex items-center gap-3 ${selectedCoin === 'PINO' ? 'text-crypto-brand-primary' : 'text-crypto-text-secondary'}`}
								 onClick={() => selectOption('PINO')}
							 >
								 {GetCoinIcon('PINO')}
								 PINO
							 </li>
							 <li
								 key={3}
								 className={`py-3 cursor-pointer hover:text-crypto-brand-primary transition-colors font-semibold flex items-center gap-3 ${selectedCoin === 'TRX' ? 'text-crypto-brand-primary' : 'text-crypto-text-secondary'}`}
								 onClick={() => selectOption('TRX')}
							 >
								 {GetCoinIcon('TRX')}
								 TRX
							 </li>
						 {coins.map((option) => (
							 option.token !== 'PINO' && option.token !== 'USDT' && option.token !== 'TRX' && (
								<li
								key={option?.token}
								className={`py-3 cursor-pointer hover:text-crypto-brand-primary transition-colors font-semibold flex items-center gap-3 ${selectedCoin === option?.token ? 'text-crypto-brand-primary' : 'text-crypto-text-secondary'}`}
								onClick={() => selectOption(option?.token)}
							>
								{GetCoinIcon(option?.token)}
								{option?.name}
							</li>
							 )
						 ))}
					 </ul>
				 </motion.div>
			 </div>
	)
}