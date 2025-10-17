import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Delete from '../../../assets/closeRed.svg'
import Spinner from '../../../assets/spinner2.svg'
import { useNecessary } from '../../../context/necessary'
import CreateCoinModal from '../../../features/AddNewCoin/ui/CreateCoinModal/CreateCoinModal'
import { useCoinStore } from '../../../shared/store/CoinsStore'
import { useTokenStore } from '../../../shared/store/TokenStore'
import { Coin } from '../../../shared/types/store/CoinStore'
import CryptoIcon from '../../../shared/ui/CryptoIcon'
import GetCoinsApi from '../api/GetCoins'

interface Props {
	search: string
}

export default function CoinsTable({ search }: Props) {
	const { coins, GetDataLoading, setCoins, setGetDataLoading } = useCoinStore()
	const { GetCoins, DeleteCoin } = GetCoinsApi()
	const [debouncedSearch, setDebouncedSearch] = useState<string>(search)
	const {getWallet} = useNecessary()
	const [editInfo, setEditInfo] = useState<Coin>()
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const {token} = useTokenStore()
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search)
		}, 700)

		return () => {
			clearTimeout(handler)
		}
	}, [search])

	const GetCoinRequest = async () => {
		setGetDataLoading(true)
		const res = await GetCoins(debouncedSearch)
		if (res?.data) setCoins(res?.data)
		setGetDataLoading(false)
	}

	const RemoveCoin = async(coin:string) => {
		await DeleteCoin(coin)
		GetCoinRequest()
		getWallet()
	}

	useEffect(() => {
		if (!token) return
		GetCoinRequest()
	}, [debouncedSearch, token])

	if (GetDataLoading) {
		return (
			<div className='w-full flex justify-center items-center'>
				<img src={Spinner} alt="Spinner" className='w-[120px] h-[80px]' />
			</div>
		)
	}

	return (
		<div className="overflow-hidden">
			{/* Table Header */}
			<div className="bg-crypto-bg-tertiary border-b border-crypto-border-primary px-4 sm:px-6 py-3">
				<div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4 text-xs font-medium text-crypto-text-tertiary uppercase tracking-wider">
					<div>Coin</div>
					<div className="hidden sm:block">Symbol</div>
					<div className="hidden sm:block">Price (TRX)</div>
					<div>Price (USDT)</div>
					<div>Actions</div>
				</div>
			</div>
			
			{/* Table Body */}
			<div className="divide-y divide-crypto-border-primary">
				{coins?.map((coin, index) => (
					<motion.button
						className='w-full bg-crypto-bg-secondary hover:bg-crypto-bg-hover flex items-center px-4 sm:px-6 py-4 text-left transition-colors duration-200 group'
						key={coin.token}
						onClick={() => (setEditInfo(coin), setIsEdit(true))}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.05 }}
					>
						<div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4 w-full items-center">
							{/* Coin Name */}
							<div className="flex items-center">
								<CryptoIcon 
									token={coin?.token || ''} 
									size="md" 
									className="mr-2 sm:mr-3"
								/>
								<div className="min-w-0">
									<span className='font-medium text-crypto-text-primary group-hover:text-crypto-text-primary text-sm sm:text-base truncate block'>
										{coin?.name}
									</span>
									<span className="text-xs text-crypto-text-tertiary sm:hidden">
										{coin?.token}
									</span>
								</div>
							</div>
							
							{/* Symbol - Hidden on mobile */}
							<div className="hidden sm:block text-sm text-crypto-text-primary">
								{coin?.token}
							</div>
							
							{/* Price TRX - Hidden on mobile */}
							<div className="hidden sm:block text-sm text-crypto-text-primary">
								{coin?.price_in_trx?.toLocaleString()}
							</div>
							
							{/* Price USDT */}
							<div className="text-sm text-crypto-text-primary">
								${coin?.price_in_usdt?.toLocaleString()}
							</div>
							
							{/* Actions */}
							<div className="flex items-center justify-end">
								<button
									className='p-2 text-crypto-text-tertiary hover:text-crypto-danger hover:bg-crypto-danger-bg rounded-lg transition-all duration-200'
									onClick={(e) => {
										e.stopPropagation();
										RemoveCoin(coin?.name);
									}}
								>
									<img src={Delete} alt="Delete" className="w-4 h-4" />
								</button>
							</div>
						</div>
					</motion.button>
				))}
			</div>
			{isEdit && <CreateCoinModal setOpenModal={setIsEdit} edit={isEdit} coinData={editInfo}/>}
		</div>
	)
}
