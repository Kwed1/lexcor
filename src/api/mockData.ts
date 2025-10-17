// Mock data для приложения P2P крипто-биржи

import { UsersInt } from '../entities/Admin/type/UsersInt'
import { TradesInt } from '../entities/AvailableTransaction/type/TradesInt'
import { MyDealsInt } from '../entities/MyAds/type/MyDealsInt'
import { WalletHistoryInt } from '../entities/WalletHistory/type/HistoryInt'
import { GetTradeInt } from '../pages/trades/type/GetTradeInt'
import { Coin } from '../shared/types/store/CoinStore'

// Mock пользователи
export const mockUsers: UsersInt[] = [
	{
		username: 'CryptoKing',
		active_deals: 5,
		finished_deals: 127,
		id: 'user_1',
		blocked: false,
		image: 'https://i.pravatar.cc/150?img=1'
	},
	{
		username: 'TraderPro',
		active_deals: 3,
		finished_deals: 89,
		id: 'user_2',
		blocked: false,
		image: 'https://i.pravatar.cc/150?img=2'
	},
	{
		username: 'BitMaster',
		active_deals: 8,
		finished_deals: 234,
		id: 'user_3',
		blocked: false,
		image: 'https://i.pravatar.cc/150?img=3'
	},
	{
		username: 'CoinWhale',
		active_deals: 12,
		finished_deals: 456,
		id: 'user_4',
		blocked: false,
		image: 'https://i.pravatar.cc/150?img=4'
	},
	{
		username: 'SatoshiFan',
		active_deals: 2,
		finished_deals: 67,
		id: 'user_5',
		blocked: false,
		image: 'https://i.pravatar.cc/150?img=5'
	}
]

// Mock монеты (только валюты с иконками в папке valute-icons)
export const mockCoins: Coin[] = [
	{
		name: 'Bitcoin',
		token: 'BTC',
		price_in_trx: 4250000,
		price_in_usdt: 67500,
		name_id: 'bitcoin',
		id: 'coin_1'
	},
	{
		name: 'Ethereum',
		token: 'ETH',
		price_in_trx: 165000,
		price_in_usdt: 2450,
		name_id: 'ethereum',
		id: 'coin_2'
	},
	{
		name: 'Binance Coin',
		token: 'BNB',
		price_in_trx: 3750,
		price_in_usdt: 600,
		name_id: 'binancecoin',
		id: 'coin_3'
	},
	{
		name: 'Chainlink',
		token: 'LINK',
		price_in_trx: 8.2,
		price_in_usdt: 1.3,
		name_id: 'chainlink',
		id: 'coin_4'
	},
	{
		name: 'Litecoin',
		token: 'LTC',
		price_in_trx: 1800,
		price_in_usdt: 285,
		name_id: 'litecoin',
		id: 'coin_5'
	},
	{
		name: 'Solana',
		token: 'SOL',
		price_in_trx: 180,
		price_in_usdt: 28.5,
		name_id: 'solana',
		id: 'coin_6'
	}
]

// Mock сделки (ордера)
export const mockTrades: TradesInt[] = [
	{
		mem_coin: 'USDT',
		limit_min: 100,
		limit_max: 5000,
		owner: 'CryptoKing',
		coin: 'BTC',
		coin_price: '67500.00',
		id: 'trade_1'
	},
	{
		mem_coin: 'TRX',
		limit_min: 50,
		limit_max: 3000,
		owner: 'TraderPro',
		coin: 'ETH',
		coin_price: '2450.00',
		id: 'trade_2'
	},
	{
		mem_coin: 'USDT',
		limit_min: 200,
		limit_max: 10000,
		owner: 'BitMaster',
		coin: 'BTC',
		coin_price: '67450.00',
		id: 'trade_3'
	},
	{
		mem_coin: 'USDT',
		limit_min: 75,
		limit_max: 2500,
		owner: 'CoinWhale',
		coin: 'ETH',
		coin_price: '2460.00',
		id: 'trade_4'
	},
	{
		mem_coin: 'TRX',
		limit_min: 100,
		limit_max: 5000,
		owner: 'SatoshiFan',
		coin: 'BNB',
		coin_price: '600.00',
		id: 'trade_5'
	},
	{
		mem_coin: 'USDT',
		limit_min: 150,
		limit_max: 7500,
		owner: 'CryptoKing',
		coin: 'ETH',
		coin_price: '2445.00',
		id: 'trade_6'
	},
	{
		mem_coin: 'USDT',
		limit_min: 50,
		limit_max: 2000,
		owner: 'TraderPro',
		coin: 'BNB',
		coin_price: '598.50',
		id: 'trade_7'
	},
	{
		mem_coin: 'TRX',
		limit_min: 1000,
		limit_max: 50000,
		owner: 'BitMaster',
		coin: 'USDT',
		coin_price: '1.00',
		id: 'trade_8'
	}
]

// Mock мои сделки
export const mockMyDeals: MyDealsInt[] = [
	{
		mem_coin: 'USDT',
		coin: 'BTC',
		limit_max: 5000,
		id: 'mydeal_1',
		type: 0, // 0 - buy, 1 - sell
		owner_id: 'current_user',
		limit_min: 100,
		blocked: false,
		create_at: '2025-10-10T14:30:00Z'
	},
	{
		mem_coin: 'USDT',
		coin: 'ETH',
		limit_max: 3000,
		id: 'mydeal_2',
		type: 1,
		owner_id: 'current_user',
		limit_min: 200,
		blocked: false,
		create_at: '2025-10-09T10:15:00Z'
	},
	{
		mem_coin: 'TRX',
		coin: 'BNB',
		limit_max: 2000,
		id: 'mydeal_3',
		type: 0,
		owner_id: 'current_user',
		limit_min: 50,
		blocked: false,
		create_at: '2025-10-08T16:45:00Z'
	}
]

// Mock информация о сделке
export const mockTradeInfo: GetTradeInt = {
	image: 'https://i.pravatar.cc/150?img=1',
	balance: 1250.50,
	commission_percent: 0.5,
	mem_coin: 'USDT',
	type: 0,
	coin: 'BTC',
	limit_min: 100,
	limit_max: 5000,
	mem_coin_price: 67500,
	pino_usdt: 15.25,
	pino_trx: 95.5
}

// Mock история кошелька
export const mockWalletHistory: WalletHistoryInt[] = [
	{
		type: 'Deposit',
		datetime: '2025-10-11T10:30:00Z',
		amount: 500,
		coin: 'USDT'
	},
	{
		type: 'Withdraw',
		datetime: '2025-10-10T15:45:00Z',
		amount: 200,
		coin: 'USDT'
	},
	{
		type: 'Trade',
		datetime: '2025-10-10T12:20:00Z',
		amount: 0.005,
		coin: 'BTC'
	},
	{
		type: 'Deposit',
		datetime: '2025-10-09T09:15:00Z',
		amount: 1000,
		coin: 'TRX'
	},
	{
		type: 'Trade',
		datetime: '2025-10-08T18:30:00Z',
		amount: 0.5,
		coin: 'ETH'
	},
	{
		type: 'Withdraw',
		datetime: '2025-10-07T14:10:00Z',
		amount: 300,
		coin: 'USDT'
	}
]

// Mock баланс кошелька
export const mockWalletBalance = {
	USDT: 2450.75,
	TRX: 15620.30,
	BTC: 0.0234,
	ETH: 1.456,
	BNB: 3.25
}

// Mock адрес кошелька
export const mockWalletAddress = 'TXz8K9J5aY9FqJXH2p3L4m5N6o7P8q9R0s1T2u3V4w'



