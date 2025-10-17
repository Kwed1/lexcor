// Утилита для автоматической генерации дополнительных mock данных

import { UsersInt } from '../entities/Admin/type/UsersInt'
import { TradesInt } from '../entities/AvailableTransaction/type/TradesInt'
import { MyDealsInt } from '../entities/MyAds/type/MyDealsInt'
import { WalletHistoryInt } from '../entities/WalletHistory/type/HistoryInt'
import { Coin } from '../shared/types/store/CoinStore'

// Генератор случайных имен пользователей
const userNames = [
	'CryptoTrader', 'BitcoinMaster', 'EthereumKing', 'DeFiWhale', 'NFTCollector',
	'BlockchainPro', 'CryptoNinja', 'DigitalGold', 'MoonRocket', 'DiamondHands',
	'CryptoWizard', 'TokenHunter', 'ChainMaster', 'DeFiGuru', 'CryptoBeast',
	'BlockchainBoss', 'CryptoLegend', 'TokenTitan', 'DeFiDragon', 'CryptoPhoenix'
]

// Генератор случайных аватаров
const generateAvatar = (index: number) => `https://i.pravatar.cc/150?img=${(index % 70) + 1}`

// Генератор дополнительных монет (только валюты с иконками)
export const generateAdditionalCoins = (): Coin[] => {
	// Возвращаем пустой массив, так как все доступные валюты уже есть в mockCoins
	return []
}

// Генератор дополнительных пользователей
export const generateAdditionalUsers = (count: number = 10): UsersInt[] => {
	return Array.from({ length: count }, (_, index) => ({
		username: userNames[index % userNames.length] + (index > userNames.length - 1 ? `_${Math.floor(index / userNames.length) + 1}` : ''),
		active_deals: Math.floor(Math.random() * 15) + 1,
		finished_deals: Math.floor(Math.random() * 200) + 10,
		id: `user_${Date.now()}_${index}`,
		blocked: Math.random() < 0.1, // 10% chance of being blocked
		image: generateAvatar(index)
	}))
}

// Генератор дополнительных сделок
export const generateAdditionalTrades = (count: number = 15): TradesInt[] => {
	const coins = ['BTC', 'ETH', 'BNB', 'USDT', 'TRX', 'ADA', 'SOL', 'DOT', 'LINK', 'LTC']
	const memCoins = ['USDT', 'TRX']
	const owners = userNames.slice(0, 10)

	return Array.from({ length: count }, (_, index) => ({
		mem_coin: memCoins[Math.floor(Math.random() * memCoins.length)],
		limit_min: Math.floor(Math.random() * 100) + 10,
		limit_max: Math.floor(Math.random() * 10000) + 100,
		owner: owners[Math.floor(Math.random() * owners.length)],
		coin: coins[Math.floor(Math.random() * coins.length)],
		coin_price: (Math.random() * 100000 + 1000).toFixed(2),
		id: `trade_${Date.now()}_${index}`
	}))
}

// Генератор дополнительных моих сделок
export const generateAdditionalMyDeals = (count: number = 5): MyDealsInt[] => {
	const coins = ['BTC', 'ETH', 'BNB', 'USDT', 'TRX', 'ADA', 'SOL', 'DOT', 'LINK', 'LTC']
	const memCoins = ['USDT', 'TRX']

	return Array.from({ length: count }, (_, index) => ({
		mem_coin: memCoins[Math.floor(Math.random() * memCoins.length)],
		coin: coins[Math.floor(Math.random() * coins.length)],
		limit_max: Math.floor(Math.random() * 5000) + 100,
		id: `mydeal_${Date.now()}_${index}`,
		type: Math.floor(Math.random() * 2), // 0 - buy, 1 - sell
		owner_id: 'current_user',
		limit_min: Math.floor(Math.random() * 50) + 10,
		blocked: Math.random() < 0.05, // 5% chance of being blocked
		create_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // Random date within last 30 days
	}))
}

// Генератор дополнительной истории кошелька
export const generateAdditionalWalletHistory = (count: number = 20): WalletHistoryInt[] => {
	const types = ['Deposit', 'Withdraw', 'Trade', 'Reward', 'Commission']
	const coins = ['BTC', 'ETH', 'BNB', 'USDT', 'TRX', 'ADA', 'SOL', 'DOT', 'LINK', 'LTC']

	return Array.from({ length: count }, (_, index) => ({
		type: types[Math.floor(Math.random() * types.length)] as any,
		datetime: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 60 days
		amount: Math.random() * 1000 + 1,
		coin: coins[Math.floor(Math.random() * coins.length)]
	}))
}

// Функция для обновления цен монет (симуляция рыночных колебаний)
export const updateCoinPrices = (coins: Coin[]): Coin[] => {
	return coins.map(coin => {
		const priceChange = (Math.random() - 0.5) * 0.1 // ±5% изменение
		const newTrxPrice = coin.price_in_trx * (1 + priceChange)
		const newUsdtPrice = coin.price_in_usdt * (1 + priceChange)

		return {
			...coin,
			price_in_trx: Math.max(0.001, newTrxPrice), // Минимальная цена
			price_in_usdt: Math.max(0.001, newUsdtPrice)
		}
	})
}

// Функция для генерации случайных уведомлений
export const generateNotifications = () => {
	const notifications = [
		'New trade available for BTC/USDT',
		'Your ETH order has been completed',
		'Price alert: BNB reached target price',
		'New user registered: CryptoTrader123',
		'System maintenance scheduled for tonight',
		'New coin added: Cardano (ADA)',
		'Your withdrawal has been processed',
		'Trade dispute resolved in your favor'
	]

	return notifications[Math.floor(Math.random() * notifications.length)]
}

// Функция для создания демо-данных
export const createDemoData = () => {
	console.log('🎯 Creating comprehensive demo data...')

	const additionalCoins = generateAdditionalCoins()
	const additionalUsers = generateAdditionalUsers(15)
	const additionalTrades = generateAdditionalTrades(25)
	const additionalMyDeals = generateAdditionalMyDeals(8)
	const additionalWalletHistory = generateAdditionalWalletHistory(30)

	return {
		additionalCoins,
		additionalUsers,
		additionalTrades,
		additionalMyDeals,
		additionalWalletHistory
	}
}
