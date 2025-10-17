import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CoinRangeSlider from '../../features/CoinRangeSlider'
import CreateDealButton from '../../features/CreateDealButton'
import SelectCryptovalute from '../../features/SelectCryptovalute'
import ToggleBuySell from '../../features/ToggleBuySell'
import { useTelegram } from '../../shared/hooks/useTelegram'
import useWalletStore from '../../shared/store/WalletStore'
import PriceRange from '../../shared/ui/price-range'
import useCreateDealApi from './api/createDeal'
import ModalOfSuggest from './ui/ModalOfSuggest'
import InputCoinPrice from './ui/input-coinprice'


export default function CreateDeal() {
	const navigate = useNavigate()
	const [buyCoin, setBuyCoin] = useState<string>('')
	const [fiatCoin, setFiatCoin] = useState<string>('')
	const [minCoins, setMinCoins] = useState<number>(0)
	const [maxCoins, setMaxCoins] = useState<number>(200)
	const [sellMin, setSellMin] = useState<number>(0)
	const [sellMax, setSellMax] = useState<number>(0)
	const [orderType, setOrderType] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)
	const {mem_coins, commission} = useWalletStore()
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
	const [minSug, setMinSug] = useState<number | string>(0)
	const [maxSug, setMaxSug] = useState<number | string>(0)
	const coins = mem_coins?.map(coin => coin?.token)
	const coin = commission.find(coin => coin.name === buyCoin);
	const fiatCommission = commission.find(item => item.name === buyCoin);
	const {tg} = useTelegram()
	const [priceForCoin, setPriceForCoin] = useState<string | number>('')


	useEffect(() => {
		if (orderType === 0) {
			if (fiatCoin === 'TRX' && coin?.commission_in_trx) {
				setSellMin(Math.round((coin?.commission_in_trx || 0) * (minCoins || 0)))
				setSellMax(Math.round((coin?.commission_in_trx || 0) * (maxCoins || 0)))
			} else if (fiatCoin === 'USDT' && coin?.commission_in_usdt) {
				setSellMin(Math.round((coin?.commission_in_usdt || 0) * (minCoins || 0)))
				setSellMax(Math.round((coin?.commission_in_usdt || 0) * (maxCoins || 0)))
			}
		}
	}, [orderType, minCoins, maxCoins, fiatCoin])

	useEffect(() => {
		setMinCoins(0)
		setMaxCoins(0)
		setSellMin(0)
		setSellMax(0)
	}, [buyCoin, fiatCoin])

	
	const coinsFiat = ['TRX', 'USDT'];

	const {postCreateDeal} = useCreateDealApi()

	const handleClick = () => {
		const PostApiRequest = async() => {
			setLoading(true)
			setLoading(false)
			await postCreateDeal(fiatCoin, buyCoin, orderType == 1 ? minCoins : sellMin, orderType == 1 ? maxCoins : sellMax, orderType, minSug, maxSug, priceForCoin)
			navigate('/myads')
		}
		PostApiRequest()
	}

	useEffect(() => {
    const handleBackButton = () => {
      navigate(-1);
    };

    if (tg?.BackButton) {
      tg.BackButton.show();
      tg.BackButton.onClick(handleBackButton);

      return () => {
        if (tg.BackButton) {
          tg.BackButton.offClick(handleBackButton);
          tg.BackButton.hide();
        }
      };
    }
  }, [tg?.BackButton]);

	useEffect(() => {
		if (!modalIsOpen) {
			setMaxSug(0)
			setMinSug(0)
		}
	},[modalIsOpen])


	useEffect(() => {
    if (fiatCommission) {
      if (fiatCoin === 'TRX') {
        setPriceForCoin((fiatCommission.commission_in_trx || 0).toFixed(5));
      } else if (fiatCoin === 'USDT') {
        setPriceForCoin((fiatCommission.commission_in_usdt || 0).toFixed(5));
      }
    }
  }, [fiatCoin, buyCoin]);

	return (
		<div className='w-full min-h-screen bg-crypto-bg-primary'>
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
								Create Deal
							</h1>
							<p className='text-crypto-text-secondary text-lg'>
								Post your trading offer to the marketplace
							</p>
						</div>
						<div className='hidden md:block'>
							<div className='w-20 h-20 bg-crypto-brand-primary/20 rounded-full flex items-center justify-center'>
								<svg className='w-10 h-10 text-crypto-brand-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
								</svg>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Toggle Section */}
				<motion.div 
					className='mb-6'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<ToggleBuySell setOrderType={setOrderType} />
				</motion.div>

				{/* Currency Selection */}
				<motion.div 
					className='bg-crypto-bg-secondary rounded-2xl p-6 mb-6 shadow-crypto border border-crypto-border-primary'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<h3 className='text-lg font-semibold text-crypto-text-primary mb-4'>Currency Selection</h3>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<p className='text-sm font-medium mb-2 text-crypto-text-secondary'>{orderType === 1 ? 'Buy' : 'Sell'}</p>
							<SelectCryptovalute setValute={setBuyCoin} coins={coins}/>
						</div>
						<div>
							<p className='text-sm font-medium mb-2 text-crypto-text-secondary'>Fiat</p>
							<SelectCryptovalute setValute={setFiatCoin} coins={coinsFiat}/>
						</div>
					</div>
				</motion.div>

				{/* Range Slider */}
				<motion.div 
					className='bg-crypto-bg-secondary rounded-2xl p-6 mb-6 shadow-crypto border border-crypto-border-primary'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className='text-lg font-semibold text-crypto-text-primary mb-4'>Amount Range</h3>
					<CoinRangeSlider 
						ordertype={orderType} 
						setMinCoins={setMinCoins} 
						setMaxCoins={setMaxCoins}
						buyCoin={buyCoin}
						fiatCoin={fiatCoin}
						minCoins={minCoins} 
						maxCoins={maxCoins}
					/>
				</motion.div>

				{/* Price Range Display */}
				<motion.div 
					className='bg-crypto-bg-secondary rounded-2xl p-6 mb-6 shadow-crypto border border-crypto-border-primary'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
				>
					<h3 className='text-lg font-semibold text-crypto-text-primary mb-4'>Price Range</h3>
					{orderType === 1 ? (
						<div className='flex justify-between w-full items-center gap-4'>
							<PriceRange amount={minCoins} valute={fiatCoin}/>
							<p className='text-3xl text-crypto-text-primary'>-</p>
							<PriceRange amount={maxCoins} valute={fiatCoin}/>
						</div>
					) : (
						<div className='flex justify-between w-full items-center gap-4'>
							<PriceRange amount={minCoins} valute={buyCoin}/>
							<p className='text-3xl text-crypto-text-primary'>-</p>
							<PriceRange amount={maxCoins} valute={buyCoin}/>
						</div>
					)}
					{fiatCommission && (
						<div className='mt-4 p-3 bg-crypto-bg-tertiary rounded-xl border border-crypto-border-primary'>
							{fiatCoin === 'TRX' ? (
								<div className='flex w-full justify-between items-center text-crypto-text-secondary'>
									<p>Price in TRX:</p>
									<p className='text-crypto-brand-primary font-semibold'>{`${fiatCommission.commission_in_trx.toFixed(5)}`}</p>
								</div>
							) : fiatCoin === 'USDT' ? (
								<div className='flex w-full justify-between items-center text-crypto-text-secondary'>
									<p>Price in USDT:</p>
									<p className='text-crypto-brand-primary font-semibold'>{`${fiatCommission.commission_in_usdt.toFixed(5)}`}</p>
								</div>
							) : null}
						</div>
					)}
				</motion.div>

				{/* Price Input */}
				<motion.div 
					className='bg-crypto-bg-secondary rounded-2xl p-6 mb-6 shadow-crypto border border-crypto-border-primary'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
				>
					<h3 className='text-lg font-semibold text-crypto-text-primary mb-4'>Coin Price</h3>
					<InputCoinPrice 
						value={priceForCoin}
						setValue={setPriceForCoin}
					/>
				</motion.div>

				{/* Suggest Price */}
				<motion.div 
					className='bg-crypto-bg-secondary rounded-2xl p-6 mb-6 shadow-crypto border border-crypto-border-primary'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7 }}
				>
					<input
						type="checkbox"
						id="suggest-checkbox"
						className="hidden"
						checked={modalIsOpen}
						onChange={(e) => setModalIsOpen(e.target.checked)}
					/>
					<motion.label
						htmlFor="suggest-checkbox"
						className="flex items-center cursor-pointer space-x-3"
						whileHover={{ x: 4 }}
						whileTap={{ scale: 0.95 }}
					>
						<span
							className={`w-6 h-6 rounded-full border-2 border-crypto-info flex items-center justify-center transition-all duration-300 ease-in-out ${
								modalIsOpen ? 'bg-crypto-info scale-110' : 'bg-crypto-bg-tertiary'
							}`}
						>
							{modalIsOpen && (
								<motion.svg
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", stiffness: 500, damping: 30 }}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-4 h-4 text-white"
								>
									<path d="M5 13l4 4L19 7" />
								</motion.svg>
							)}
						</span>
						<div>
							<span className="text-base font-semibold text-crypto-text-primary">Suggest price</span>
							<p className="text-sm text-crypto-text-secondary">Allow price negotiation</p>
						</div>
					</motion.label>

					{modalIsOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className='mt-4'
						>
							<ModalOfSuggest 
								setMinSug={setMinSug} 
								setMaxSug={setMaxSug}
								minSug={minSug}
								maxSug={maxSug}
							/>
						</motion.div>
					)}
				</motion.div>

				{/* Exchange Info */}
				{orderType === 0 && fiatCoin && (
					<motion.div 
						className='bg-crypto-info-bg rounded-2xl p-4 mb-6 border border-crypto-info'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8 }}
					>
						<p className='text-center text-crypto-info font-medium'>
							After the exchange you will receive<br/>
							<span className='font-bold'>{fiatCoin}: {sellMin} - {sellMax}</span>
						</p>
					</motion.div>
				)}

				{/* Create Button */}
				<motion.div 
					className='fixed bottom-6 left-0 w-full px-4'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.9 }}
				>
					<CreateDealButton handleClick={handleClick} loading={loading}/>
				</motion.div>
			</motion.div>
		</div>
	)
}