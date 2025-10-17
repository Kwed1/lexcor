import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Spinner from '../../../assets/spinner2.svg'
import { formatDate } from '../../../shared/services/date'
import { useTokenStore } from '../../../shared/store/TokenStore'
import GetErrorTransApi from '../api/GetErrorTrans'
import { ErrorTransInt } from '../type/ErrorTrans'
import ErrorModal from './ErrorModal'

export default function ErrorTransTable() {
	const {getToken} = useTokenStore()
	let token = getToken()
	const [loading, setLoading] = useState<boolean>(false)
	const {GetTransaction, postTransactionRead} = GetErrorTransApi()
	const [skip, setSkip] = useState<number>(0)
	const [trans, setTrans] = useState<ErrorTransInt[]>([])
	const [modal, setModal] = useState<boolean>(false)
	const [modalInfo, setModalInfo] = useState<ErrorTransInt>()

	const getTrans = async () => {
		const res = await GetTransaction(skip)
		if (res?.data) setTrans(res?.data)
	}

	const toggleReadStatus = (id: string) => {
		setTrans((prevTrans) =>
				prevTrans.map((transaction) =>
						transaction.id === id ? { ...transaction, read: true } : transaction
				)
		);
	};

	const changeRead = async(id:string) => {
		const res = await postTransactionRead(id)
		if (res?.status === 200) {
			toggleReadStatus(id)
		}
	}

	const handleOpen = (modalInfo: ErrorTransInt) => {
		setModalInfo(modalInfo)
		changeRead(modalInfo?.id)
		setModal(true)
	}
	 
	useEffect(() => {
		if (!token) return
		getTrans()
	}, [token])

	if (loading) return (
		<div className='w-full justify-center flex'>
			<img src={Spinner} alt="Spinner" className='w-[120px] h-[80px]' />
		</div>
	)

	else {
		return (
			<div className="overflow-hidden">
				{trans?.length === 0 ? (
					<motion.div 
						className="text-center py-12"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<div className="w-16 h-16 bg-crypto-success-bg rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-crypto-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-crypto-text-primary mb-2">No Failed Transactions</h3>
						<p className="text-crypto-text-secondary">All transactions are processing successfully</p>
					</motion.div>
				) : (
					<>
						{/* Table Header */}
						<div className="bg-crypto-bg-tertiary border-b border-crypto-border-primary px-4 sm:px-6 py-3">
							<div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4 text-xs font-medium text-crypto-text-tertiary uppercase tracking-wider">
								<div>Status</div>
								<div className="hidden sm:block">Coin</div>
								<div>Type</div>
								<div className="hidden sm:block">Price</div>
								<div>Date</div>
							</div>
						</div>
						
						{/* Table Body */}
						<div className="divide-y divide-crypto-border-primary">
							{trans?.map((transaction, i) => (
								<motion.button 
									key={transaction.id}
									className={`w-full bg-crypto-bg-secondary hover:bg-crypto-bg-hover flex items-center px-4 sm:px-6 py-4 text-left transition-colors duration-200 group ${
										!transaction?.read ? 'bg-crypto-danger-bg hover:bg-crypto-danger-bg/80' : ''
									}`}
									onClick={() => handleOpen(transaction)}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.05 }}
								>
									<div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4 w-full items-center">
										{/* Status */}
										<div className="flex items-center">
											{!transaction?.read ? (
												<div className="w-2 h-2 bg-red-500 rounded-full mr-2 sm:mr-3"></div>
											) : (
												<div className="w-2 h-2 bg-gray-300 rounded-full mr-2 sm:mr-3"></div>
											)}
											<span className="text-sm text-crypto-text-primary">
												{!transaction?.read ? 'Unread' : 'Read'}
											</span>
										</div>
										
										{/* Coin - Hidden on mobile */}
										<div className="hidden sm:block text-sm text-crypto-text-primary">
											{transaction?.coins}
										</div>
										
										{/* Type */}
										<div>
											<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
												transaction?.type === 'Buy' 
													? 'bg-crypto-success-bg text-crypto-success' 
													: 'bg-crypto-info-bg text-crypto-info'
											}`}>
												{transaction?.type}
											</span>
										</div>
										
										{/* Price - Hidden on mobile */}
										<div className="hidden sm:block text-sm text-crypto-text-primary">
											${transaction?.price}
										</div>
										
										{/* Date */}
										<div className="text-sm text-crypto-text-secondary">
											{formatDate(transaction?.date)}
										</div>
									</div>
								</motion.button>
							))}
						</div>
					</>
				)}
				{modal && <ErrorModal message={modalInfo} onClose={() => setModal(false)}/>}
			</div>
		)
	}
}
