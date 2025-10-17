import React from 'react'
import { useMockData } from '../context/MockDataProvider'
import { useCoinStore } from '../shared/store/CoinsStore'
import { useTokenStore } from '../shared/store/TokenStore'
import useWalletStore from '../shared/store/WalletStore'

const MockDataStatus: React.FC = () => {
  const { isInitialized } = useMockData()
  const { coins } = useCoinStore()
  const { token, role } = useTokenStore()
  const { trx, usdt, mem_coins, commission } = useWalletStore()

  if (!isInitialized) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-medium text-yellow-800">System Status: Initializing</h3>
        <p className="text-yellow-700 text-sm">Setting up comprehensive mock data...</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="font-medium text-green-800 mb-2">System Status: Ready</h3>
      <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
        <div>Coins: {coins.length}</div>
        <div>Role: {role}</div>
        <div>TRX: {trx}</div>
        <div>USDT: {usdt}</div>
        <div>Mem Coins: {mem_coins.length}</div>
        <div>Commissions: {commission.length}</div>
      </div>
      <div className="mt-2 text-xs text-green-600">
        Token: {token ? `${token.substring(0, 20)}...` : 'Not set'}
      </div>
    </div>
  )
}

export default MockDataStatus
