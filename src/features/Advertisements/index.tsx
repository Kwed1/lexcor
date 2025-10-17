import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CryptoIcon from '../../shared/ui/CryptoIcon'

interface Advertisement {
  id: string
  mem_coin: string
  coin: string
  price: number
  owner: string
  limit_min: number
  limit_max: number
  type: 'buy' | 'sell'
  rating: number
  completed_deals: number
  online: boolean
}

const mockAdvertisements: Advertisement[] = [
  // ARES объявления
  {
    id: 'adv_1',
    mem_coin: 'USDT',
    coin: 'ARES',
    price: 0.024,
    owner: 'CryptoKing',
    limit_min: 100,
    limit_max: 5000,
    type: 'buy',
    rating: 4.9,
    completed_deals: 127,
    online: true
  },
  {
    id: 'adv_2',
    mem_coin: 'TRX',
    coin: 'ARES',
    price: 0.024,
    owner: 'CryptoLegend',
    limit_min: 200,
    limit_max: 10000,
    type: 'sell',
    rating: 4.7,
    completed_deals: 189,
    online: true
  },
  {
    id: 'adv_3',
    mem_coin: 'USDT',
    coin: 'ARES',
    price: 0.024,
    owner: 'BitcoinMaster',
    limit_min: 500,
    limit_max: 25000,
    type: 'buy',
    rating: 4.8,
    completed_deals: 89,
    online: false
  },
  
  // MOONCAT объявления
  {
    id: 'adv_4',
    mem_coin: 'TRX',
    coin: 'MOONCAT',
    price: 0.012,
    owner: 'TraderPro',
    limit_min: 50,
    limit_max: 2000,
    type: 'sell',
    rating: 4.8,
    completed_deals: 89,
    online: true
  },
  {
    id: 'adv_5',
    mem_coin: 'USDT',
    coin: 'MOONCAT',
    price: 0.012,
    owner: 'BlockchainBoss',
    limit_min: 100,
    limit_max: 5000,
    type: 'buy',
    rating: 4.9,
    completed_deals: 312,
    online: true
  },
  {
    id: 'adv_6',
    mem_coin: 'TRX',
    coin: 'MOONCAT',
    price: 0.012,
    owner: 'EthereumKing',
    limit_min: 300,
    limit_max: 15000,
    type: 'sell',
    rating: 4.6,
    completed_deals: 156,
    online: false
  },

  // SUNDOG объявления
  {
    id: 'adv_7',
    mem_coin: 'USDT',
    coin: 'SUNDOG',
    price: 0.04,
    owner: 'BitMaster',
    limit_min: 200,
    limit_max: 10000,
    type: 'buy',
    rating: 4.7,
    completed_deals: 234,
    online: false
  },
  {
    id: 'adv_8',
    mem_coin: 'TRX',
    coin: 'SUNDOG',
    price: 0.04,
    owner: 'DeFiDragon',
    limit_min: 100,
    limit_max: 8000,
    type: 'sell',
    rating: 4.9,
    completed_deals: 267,
    online: true
  },

  // TBULL объявления
  {
    id: 'adv_9',
    mem_coin: 'TRX',
    coin: 'TBULL',
    price: 0.019,
    owner: 'CoinWhale',
    limit_min: 1000,
    limit_max: 50000,
    type: 'sell',
    rating: 4.9,
    completed_deals: 456,
    online: true
  },
  {
    id: 'adv_10',
    mem_coin: 'USDT',
    coin: 'TBULL',
    price: 0.019,
    owner: 'TokenTitan',
    limit_min: 300,
    limit_max: 15000,
    type: 'buy',
    rating: 4.8,
    completed_deals: 98,
    online: false
  },

  // Дополнительные объявления для разнообразия
  {
    id: 'adv_11',
    mem_coin: 'USDT',
    coin: 'ARES',
    price: 0.024,
    owner: 'SatoshiFan',
    limit_min: 150,
    limit_max: 8000,
    type: 'buy',
    rating: 4.6,
    completed_deals: 67,
    online: true
  },
  {
    id: 'adv_12',
    mem_coin: 'TRX',
    coin: 'MOONCAT',
    price: 0.012,
    owner: 'LitecoinPro',
    limit_min: 200,
    limit_max: 12000,
    type: 'sell',
    rating: 4.7,
    completed_deals: 134,
    online: true
  },

  {
    id: 'adv_13',
    mem_coin: 'TRX',
    coin: 'SUNDOG',
    price: 0.04,
    owner: 'DeFiGuru',
    limit_min: 500,
    limit_max: 25000,
    type: 'sell',
    rating: 4.8,
    completed_deals: 156,
    online: false
  },
  {
    id: 'adv_14',
    mem_coin: 'USDT',
    coin: 'TBULL',
    price: 0.019,
    owner: 'ChainlinkMaster',
    limit_min: 100,
    limit_max: 5000,
    type: 'buy',
    rating: 4.9,
    completed_deals: 78,
    online: true
  },

  // Дополнительные объявления для разнообразия
  {
    id: 'adv_15',
    mem_coin: 'USDT',
    coin: 'ARES',
    price: 0.024,
    owner: 'CryptoNinja',
    limit_min: 50,
    limit_max: 3000,
    type: 'buy',
    rating: 4.5,
    completed_deals: 23,
    online: true
  },
  {
    id: 'adv_16',
    mem_coin: 'TRX',
    coin: 'MOONCAT',
    price: 0.012,
    owner: 'DigitalGold',
    limit_min: 100,
    limit_max: 6000,
    type: 'sell',
    rating: 4.8,
    completed_deals: 145,
    online: false
  }
]

interface Props {
  orderType: number
  memCoin: string
}

export default function Advertisements({ orderType, memCoin }: Props) {
  const navigate = useNavigate()
  const [filteredAds, setFilteredAds] = useState<Advertisement[]>(mockAdvertisements)

  // Фильтрация объявлений по типу и валюте
  const filteredAdvertisements = filteredAds.filter(ad => {
    const matchesType = orderType === 0 ? ad.type === 'buy' : ad.type === 'sell'
    const matchesCoin = memCoin === 'All' || 
                       ad.mem_coin === memCoin || 
                       ad.coin === memCoin ||
                       (memCoin === 'Ares Protocol' && ad.coin === 'ARES') ||
                       (memCoin === 'Mooncat' && ad.coin === 'MOONCAT') ||
                       (memCoin === 'Sundog' && ad.coin === 'SUNDOG') ||
                       (memCoin === 'Tbull' && ad.coin === 'TBULL')
    return matchesType && matchesCoin
  })

  const handleClick = (ad: Advertisement) => {
    navigate(`/trades/${ad.id}`, {
      state: {
        username: ad.owner,
        coinPrice: ad.price.toString(),
        coin: ad.coin
      }
    })
  }

  const getTypeColor = (type: string) => {
    return type === 'buy' 
      ? 'bg-crypto-success-bg text-crypto-success border-crypto-success' 
      : 'bg-crypto-info-bg text-crypto-info border-crypto-info'
  }

  const getTypeText = (type: string) => {
    return type === 'buy' ? 'Buy' : 'Sell'
  }

  return (
    <div className='flex flex-col gap-4'>
      {filteredAdvertisements.map((ad, index) => (
        <motion.button
          key={ad.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className='w-full bg-crypto-bg-secondary hover:bg-crypto-bg-hover rounded-2xl shadow-crypto border border-crypto-border-primary transition-all duration-200 overflow-hidden group'
          onClick={() => handleClick(ad)}
        >
          {/* Header with type badge and online status */}
          <div className='flex justify-between items-center p-4 pb-2'>
            <div className='flex items-center gap-3'>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(ad.type)}`}>
                {getTypeText(ad.type)}
              </span>
              <div className='flex items-center gap-1'>
                <div className={`w-2 h-2 rounded-full ${ad.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className='text-xs text-crypto-text-tertiary'>
                  {ad.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <svg className='w-4 h-4 text-yellow-500' fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className='text-sm font-medium text-crypto-text-primary'>{ad.rating}</span>
            </div>
          </div>

          {/* Main content */}
          <div className='px-4 pb-4'>
            {/* Currency pair and price */}
            <div className='flex justify-between items-center mb-3'>
              <div className='flex items-center gap-2'>
                <CryptoIcon token={ad.mem_coin} size="sm" />
                <span className='text-lg font-bold text-crypto-text-primary'>/</span>
                <CryptoIcon token={ad.coin} size="sm" />
                <span className='text-lg font-bold text-crypto-text-primary'>
                  {ad.mem_coin}/{ad.coin}
                </span>
              </div>
              <div className='text-right'>
                <p className='text-xl font-bold text-crypto-brand-primary'>
                  ${ad.price.toLocaleString()}
                </p>
                <p className='text-xs text-crypto-text-tertiary'>Price</p>
              </div>
            </div>

            {/* Limits */}
            <div className='bg-crypto-bg-tertiary rounded-xl p-3 mb-3'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-sm text-crypto-text-secondary'>Limits</p>
                  <p className='text-lg font-semibold text-crypto-text-primary'>
                    ${ad.limit_min.toLocaleString()} - ${ad.limit_max.toLocaleString()}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-crypto-text-secondary'>Completed</p>
                  <p className='text-lg font-semibold text-crypto-text-primary'>
                    {ad.completed_deals}
                  </p>
                </div>
              </div>
            </div>

            {/* Owner info */}
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-crypto-brand-primary/20 rounded-full flex items-center justify-center'>
                  <span className='text-sm font-bold text-crypto-brand-primary'>
                    {ad.owner.charAt(0)}
                  </span>
                </div>
                <span className='font-medium text-crypto-text-primary'>{ad.owner}</span>
              </div>
              <div className='flex items-center gap-1 text-crypto-text-tertiary'>
                <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}
