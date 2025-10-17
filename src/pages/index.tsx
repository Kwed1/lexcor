import { useState } from 'react'
import Advertisements from '../features/Advertisements'
import Amount from '../features/amount'
import Crypto from '../features/crypto'
import ToggleBuySell from '../features/ToggleBuySell'

export default function Home() {
  const [orderType, setOrderType] = useState<number>(0)
  const [priceTo, setPriceTo] = useState<number>(1000) // Default value
  const [memCoin, setMemCoin] = useState<string>('All') // Default value
  
	return (
		<>
    <div className='w-full'>
      {/* Header Section */}
		  <div className='flex justify-between items-center mt-5 mb-6'>
        <ToggleBuySell setOrderType={setOrderType}/>
        <div className='flex gap-3 items-center'>
          <Amount setPriceTo={setPriceTo}/>
          <Crypto setMemCoin={setMemCoin}/>
        </div>
      </div>

      {/* Market Stats */}
      <div className='bg-gradient-to-r from-crypto-brand-primary/10 to-crypto-info/10 rounded-2xl p-4 mb-6 border border-crypto-border-primary'>
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='text-lg font-bold text-crypto-text-primary mb-1'>Live Market</h3>
            <p className='text-sm text-crypto-text-secondary'>
              {orderType === 0 ? 'Buy' : 'Sell'} orders • {memCoin === 'All' ? 'All currencies' : memCoin}
            </p>
          </div>
          <div className='text-right'>
            <p className='text-2xl font-bold text-crypto-brand-primary'>16</p>
            <p className='text-xs text-crypto-text-tertiary'>Active Orders</p>
          </div>
        </div>
      </div>

      {/* Advertisements */}
      <div className='mt-6'>
        <Advertisements 
          orderType={orderType}
          memCoin={memCoin} 
        />
      </div>
    </div>
		</>
	)
}