// Mock API Handler для замены реального API

import { useError } from '../context/errorContext'
import {
	mockCoins,
	mockMyDeals,
	mockTradeInfo,
	mockTrades,
	mockUsers,
	mockWalletAddress,
	mockWalletBalance,
	mockWalletHistory
} from './mockData'

// Функция для получения расширенных данных из localStorage
const getExtendedMockData = () => {
	try {
		const stored = localStorage.getItem('mockData')
		if (stored) {
			const parsed = JSON.parse(stored)
			return {
				coins: parsed.coins || mockCoins,
				users: parsed.users || mockUsers,
				trades: parsed.trades || mockTrades,
				myDeals: parsed.myDeals || mockMyDeals,
				walletHistory: parsed.walletHistory || mockWalletHistory
			}
		}
	} catch (error) {
		console.warn('Failed to parse stored mock data:', error)
	}

	// Fallback к базовым данным
	return {
		coins: mockCoins,
		users: mockUsers,
		trades: mockTrades,
		myDeals: mockMyDeals,
		walletHistory: mockWalletHistory
	}
}

interface MockRequestConfig {
	url: string
	method: string
	data?: any
}

// Симуляция задержки сети
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms))

const useMockApi = () => {
	const { setError } = useError()

	const request = async <T>(config: MockRequestConfig): Promise<{ data: T | null; status: number }> => {
		try {
			// Симуляция задержки сети
			await delay(300)

			const { url, method, data } = config

			// Парсинг URL и query параметров
			const [path, queryString] = url.split('?')
			const params = new URLSearchParams(queryString || '')

			// Получение расширенных данных
			const extendedData = getExtendedMockData()

			// Обработка различных эндпоинтов

			// AUTH
			if (path.includes('/auth/sign-in')) {
				return {
					data: {
						token: 'mock_token_' + Date.now(),
						has_password: true
					} as T,
					status: 200
				}
			}

			// ORDERS/TRADES
			if (path.includes('/order/') && method === 'GET') {
				if (path.includes('/user-deals')) {
					// Мои сделки
					const coin = params.get('coin') || ''
					const active = params.get('active') === 'true'

					let filtered = [...extendedData.myDeals]
					if (coin && coin !== 'All') {
						filtered = filtered.filter(deal => deal.coin === coin)
					}

					return { data: filtered as T, status: 200 }
				} else if (path.includes('{id}')) {
					// Информация о конкретной сделке
					return { data: mockTradeInfo as T, status: 200 }
				} else {
					// Список доступных сделок
					const coin = params.get('coin') || ''
					const orderType = params.get('order_type')
					const priceFrom = parseFloat(params.get('price_from') || '0')
					const priceTo = parseFloat(params.get('price_to') || '999999999')
					const memCoin = params.get('mem_coin') || ''

					let filtered = [...extendedData.trades]

					if (coin && coin !== 'All') {
						filtered = filtered.filter(trade => trade.coin === coin)
					}

					if (memCoin && memCoin !== 'All') {
						filtered = filtered.filter(trade => trade.mem_coin === memCoin)
					}

					if (priceTo > 0) {
						filtered = filtered.filter(trade =>
							trade.limit_min >= priceFrom && trade.limit_max <= priceTo
						)
					}

					return { data: filtered as T, status: 200 }
				}
			}

			// CREATE ORDER
			if (path.includes('/order/') && method === 'POST') {
				if (path.includes('propose-price')) {
					// Предложение цены
					return {
						data: { success: true, message: 'Price proposal sent' } as T,
						status: 200
					}
				} else {
					// Создание нового ордера
					const newOrder = {
						...data,
						id: 'order_' + Date.now(),
						owner_id: 'current_user',
						blocked: false,
						create_at: new Date().toISOString()
					}
					// Обновляем данные в localStorage
					const currentData = getExtendedMockData()
					currentData.myDeals.push(newOrder)
					localStorage.setItem('mockData', JSON.stringify(currentData))

					return { data: newOrder as T, status: 201 }
				}
			}

			// DELETE ORDER
			if (path.includes('/order/') && method === 'DELETE') {
				const orderId = params.get('order_id')
				const currentData = getExtendedMockData()
				const index = currentData.myDeals.findIndex((deal: any) => deal.id === orderId)
				if (index > -1) {
					currentData.myDeals.splice(index, 1)
					localStorage.setItem('mockData', JSON.stringify(currentData))
					return { data: { success: true } as T, status: 200 }
				}
				return { data: null, status: 404 }
			}

			// COINS
			if (path.includes('/coin/')) {
				if (path.includes('price')) {
					// Цена монеты
					const coin = params.get('coin') || ''
					const coinData = extendedData.coins.find((c: any) => c.token === coin || c.name === coin)
					return {
						data: {
							in_trx: coinData?.price_in_trx || 0,
							in_usdt: coinData?.price_in_usdt || 0
						} as T,
						status: 200
					}
				} else if (method === 'GET') {
					// Список монет
					const name = params.get('name') || ''
					let filtered = [...extendedData.coins]
					if (name) {
						filtered = filtered.filter(coin =>
							coin.name.toLowerCase().includes(name.toLowerCase()) ||
							coin.token.toLowerCase().includes(name.toLowerCase())
						)
					}
					return { data: filtered as T, status: 200 }
				} else if (method === 'DELETE') {
					// Удаление монеты
					const coin = params.get('coin')
					const currentData = getExtendedMockData()
					const index = currentData.coins.findIndex((c: any) => c.token === coin)
					if (index > -1) {
						currentData.coins.splice(index, 1)
						localStorage.setItem('mockData', JSON.stringify(currentData))
						return { data: { success: true } as T, status: 200 }
					}
					return { data: null, status: 404 }
				} else if (method === 'POST') {
					// Добавление новой монеты
					const newCoin = {
						...data,
						id: 'coin_' + Date.now()
					}
					const currentData = getExtendedMockData()
					currentData.coins.push(newCoin)
					localStorage.setItem('mockData', JSON.stringify(currentData))
					return { data: newCoin as T, status: 201 }
				}
			}

			// USERS
			if (path.includes('/user/') && method === 'GET') {
				const username = params.get('username') || ''
				let filtered = [...extendedData.users]
				if (username) {
					filtered = filtered.filter(user =>
						user.username.toLowerCase().includes(username.toLowerCase())
					)
				}
				return { data: filtered as T, status: 200 }
			}

			// WALLET
			if (path.includes('/wallet/')) {
				if (path.includes('get-address')) {
					// Получение адреса кошелька
					return { data: mockWalletAddress as T, status: 200 }
				} else if (path.includes('withdraw')) {
					// Вывод средств
					const coin = params.get('coin') || ''
					const amount = parseFloat(params.get('amount') || '0')

					if (mockWalletBalance[coin as keyof typeof mockWalletBalance] >= amount) {
						return {
							data: {
								success: true,
								message: 'Withdrawal processed',
								txHash: 'mock_tx_' + Date.now()
							} as T,
							status: 200
						}
					} else {
						setError('Insufficient balance')
						return { data: null, status: 400 }
					}
				} else if (path.includes('history')) {
					// История кошелька
					return { data: extendedData.walletHistory as T, status: 200 }
				} else if (path.includes('balance')) {
					// Баланс кошелька
					return { data: mockWalletBalance as T, status: 200 }
				} else if (path === '/wallet/' && method === 'GET') {
					// Полная информация о кошельке
					const walletData = {
						pino: 15.25,
						trx: mockWalletBalance.TRX,
						usdt: mockWalletBalance.USDT,
						withdraw_commission_trx: 1,
						withdraw_commission_usdt: 1,
						withdraw_commission_mem_coins: 0.5,
						mem_coins: extendedData.coins.map((coin: any) => ({
							token: coin.token,
							price: mockWalletBalance[coin.token as keyof typeof mockWalletBalance] || 0
						})),
						commission: extendedData.coins.map((coin: any) => ({
							name: coin.token,
							commission_in_trx: coin.price_in_trx,
							commission_in_usdt: coin.price_in_usdt
						}))
					}
					return { data: walletData as T, status: 200 }
				}
			}

			// ERROR TRANSACTIONS
			if (path.includes('/order/get-transactions')) {
				// Mock данные для failed transactions
				const mockErrorTrans = [
					{
						id: 'error_1',
						date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
						buyer: 'CryptoTrader',
						seller: 'BitMaster',
						coins: 'ARES',
						read: false,
						price: '0.024',
						buyer_commission_paid: true,
						seller_commission_paid: false,
						buyer_coin_transferred_to_bot: true,
						seller_coin_transferred_to_bot: false,
						bot_send_money_to_seller: false,
						bot_send_money_to_buyer: false,
						error_message: 'Seller did not transfer coins to bot within time limit',
						type: 'Buy',
						buyer_link: 'https://t.me/cryptotrader',
						seller_link: 'https://t.me/bitmaster'
					},
					{
						id: 'error_2',
						date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
						buyer: 'CoinWhale',
						seller: 'SatoshiFan',
						coins: 'MOONCAT',
						read: true,
						price: '0.012',
						buyer_commission_paid: false,
						seller_commission_paid: true,
						buyer_coin_transferred_to_bot: false,
						seller_coin_transferred_to_bot: true,
						bot_send_money_to_seller: true,
						bot_send_money_to_buyer: false,
						error_message: 'Buyer did not pay commission',
						type: 'Sell',
						buyer_link: 'https://t.me/coinwhale',
						seller_link: 'https://t.me/satoshifan'
					}
				]
				return { data: mockErrorTrans as T, status: 200 }
			}

			// READ TRANSACTION
			if (path.includes('/order/read')) {
				return {
					data: { success: true, message: 'Transaction marked as read' } as T,
					status: 200
				}
			}

			// PASSWORD
			if (path.includes('/password')) {
				return {
					data: { success: true, message: 'Password updated' } as T,
					status: 200
				}
			}

			// Default fallback
			console.warn(`Mock API: Unhandled endpoint ${path}`)
			return { data: null, status: 404 }

		} catch (error: any) {
			const message = 'Mock API Error: ' + (error.message || 'Something went wrong')
			setError(message)
			setTimeout(() => setError(''), 2000)
			return { data: null, status: 500 }
		}
	}

	return request
}

export default useMockApi

