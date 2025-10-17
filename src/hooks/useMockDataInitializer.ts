// Hook для инициализации mock данных в store при загрузке приложения
import { useEffect, useState } from 'react'
import { mockCoins, mockWalletAddress, mockWalletBalance } from '../api/mockData'
import { useCoinStore } from '../shared/store/CoinsStore'
import { useTokenStore } from '../shared/store/TokenStore'
import useWalletStore from '../shared/store/WalletStore'

export const useMockDataInitializer = () => {
	const { setCoins } = useCoinStore()
	const { setTrx, setUsdt, setMemCoins, setComission, setAddress, setPino } = useWalletStore()
	const { setToken, setRole } = useTokenStore()
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		// Проверяем, не инициализированы ли уже данные
		if (isInitialized) return

		console.log('🚀 Initializing mock data...')

		// Инициализация токена и роли админа
		setToken('mock_token_' + Date.now())
		setRole('admin')

		// Инициализация монет
		setCoins(mockCoins)

		// Инициализация баланса кошелька
		setTrx(mockWalletBalance.TRX)
		setUsdt(mockWalletBalance.USDT)
		setPino(15.25) // Mock pino balance

		// Инициализация адреса кошелька
		setAddress(mockWalletAddress)

		// Инициализация mem_coins для слайдера
		const memCoins = mockCoins.map(coin => ({
			token: coin.token,
			price: coin.token === 'BTC' ? mockWalletBalance.BTC :
				coin.token === 'ETH' ? mockWalletBalance.ETH :
					coin.token === 'BNB' ? mockWalletBalance.BNB :
						coin.token === 'USDT' ? mockWalletBalance.USDT :
							coin.token === 'TRX' ? mockWalletBalance.TRX : 0
		}))
		setMemCoins(memCoins)

		// Инициализация комиссий
		const commissions = mockCoins.map(coin => ({
			name: coin.token,
			commission_in_trx: coin.price_in_trx,
			commission_in_usdt: coin.price_in_usdt
		}))
		setComission(commissions)

		setIsInitialized(true)
		console.log('✅ Mock data initialized successfully!')
		console.log('📊 Initialized data:', {
			coins: mockCoins.length,
			walletBalance: mockWalletBalance,
			address: mockWalletAddress
		})
	}, [isInitialized])

	return { isInitialized }
}



