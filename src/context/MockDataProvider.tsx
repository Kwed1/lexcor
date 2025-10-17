import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { mockCoins, mockMyDeals, mockTrades, mockUsers, mockWalletAddress, mockWalletBalance, mockWalletHistory } from '../api/mockData'
import { useCoinStore } from '../shared/store/CoinsStore'
import { useTokenStore } from '../shared/store/TokenStore'
import useWalletStore from '../shared/store/WalletStore'
import { createDemoData } from '../utils/mockDataGenerator'

interface MockDataContextType {
  isInitialized: boolean
  initializeMockData: () => void
  resetMockData: () => void
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined)

interface MockDataProviderProps {
  children: ReactNode
}

export const MockDataProvider: React.FC<MockDataProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  
  const { setCoins } = useCoinStore()
  const { setTrx, setUsdt, setMemCoins, setComission, setAddress, setPino } = useWalletStore()
  const { setToken, setRole } = useTokenStore()

  const initializeMockData = async () => {
    if (isInitialized || isInitializing) return
    
    setIsInitializing(true)
    console.log('🚀 Initializing comprehensive mock data...')

    try {
      // Генерация дополнительных данных
      const demoData = createDemoData()
      
      // Объединение базовых и дополнительных данных
      const allCoins = [...mockCoins, ...demoData.additionalCoins]
      const allUsers = [...mockUsers, ...demoData.additionalUsers]
      const allTrades = [...mockTrades, ...demoData.additionalTrades]
      const allMyDeals = [...mockMyDeals, ...demoData.additionalMyDeals]
      const allWalletHistory = [...mockWalletHistory, ...demoData.additionalWalletHistory]

      // Инициализация токена и роли админа
      setToken('mock_token_' + Date.now())
      setRole('admin')

      // Инициализация монет (включая дополнительные)
      setCoins(allCoins)

      // Инициализация баланса кошелька
      setTrx(mockWalletBalance.TRX)
      setUsdt(mockWalletBalance.USDT)
      setPino(15.25)

      // Инициализация адреса кошелька
      setAddress(mockWalletAddress)

      // Инициализация mem_coins для слайдера (только валюты с иконками)
      const memCoins = [
        // Основные валюты
        { token: 'USDT', price: mockWalletBalance.USDT },
        { token: 'TRX', price: mockWalletBalance.TRX },
        // Дополнительные монеты из allCoins (только с иконками)
        ...allCoins.map(coin => ({
          token: coin.token,
          price: coin.token === 'BTC' ? mockWalletBalance.BTC :
            coin.token === 'ETH' ? mockWalletBalance.ETH :
              coin.token === 'BNB' ? mockWalletBalance.BNB :
                coin.token === 'LINK' ? 1.3 :
                  coin.token === 'LTC' ? 285 :
                    coin.token === 'SOL' ? 28.5 : 0
        }))
      ]
      setMemCoins(memCoins)

      // Инициализация комиссий (включая основные валюты и новые монеты)
      const commissions = [
        // Основные валюты
        { name: 'USDT', commission_in_trx: 6.25, commission_in_usdt: 1 },
        { name: 'TRX', commission_in_trx: 1, commission_in_usdt: 0.16 },
        // Дополнительные монеты из allCoins
        ...allCoins.map(coin => ({
          name: coin.token,
          commission_in_trx: coin.price_in_trx,
          commission_in_usdt: coin.price_in_usdt
        }))
      ]
      setComission(commissions)

      // Симуляция задержки для более реалистичной инициализации
      await new Promise(resolve => setTimeout(resolve, 800))

      setIsInitialized(true)
      setIsInitializing(false)
      
      console.log('✅ Mock data initialized successfully!')
      console.log('📊 Initialized data summary:', {
        coins: allCoins.length,
        users: allUsers.length,
        trades: allTrades.length,
        myDeals: allMyDeals.length,
        walletHistory: allWalletHistory.length,
        walletBalance: mockWalletBalance,
        address: mockWalletAddress
      })
      
      // Сохраняем расширенные данные в localStorage для использования в API
      localStorage.setItem('mockData', JSON.stringify({
        coins: allCoins,
        users: allUsers,
        trades: allTrades,
        myDeals: allMyDeals,
        walletHistory: allWalletHistory
      }))
      
    } catch (error) {
      console.error('❌ Error initializing mock data:', error)
      setIsInitializing(false)
    }
  }

  const resetMockData = () => {
    setIsInitialized(false)
    setIsInitializing(false)
    console.log('🔄 Mock data reset')
  }

  // Автоматическая инициализация при монтировании
  useEffect(() => {
    initializeMockData()
  }, [])

  const value: MockDataContextType = {
    isInitialized,
    initializeMockData,
    resetMockData
  }

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  )
}

export const useMockData = (): MockDataContextType => {
  const context = useContext(MockDataContext)
  if (context === undefined) {
    throw new Error('useMockData must be used within a MockDataProvider')
  }
  return context
}
