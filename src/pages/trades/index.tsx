import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../assets/spinner2.svg'
import UserIcon from '../../assets/user-black.svg'
import BuyButton from '../../features/trades/buy-button'
import InputTrx from '../../features/trades/input-trx'
import { TelegramWebApp } from '../../shared/types/Telegram'
import CryptoIcon from '../../shared/ui/CryptoIcon'
import TradeInformation from '../../shared/ui/trades/trade-information'
import { useGetInfoApi } from './api/GetTradeInfo'
import { GetTradeInt } from './type/GetTradeInt'
import SuggestInput from './ui/suggest'

const TradePage = () => {
    const tg: TelegramWebApp | undefined = (window as any).Telegram?.WebApp
    const location = useLocation()
    const {state} = useLocation()
    const {username, coinPrice} = state || ''
    const navigate = useNavigate()
    const {id} = useParams()
    const {GetTradeInfo} = useGetInfoApi()
    const render = useRef(false)
    const [tradeInfo, setTradeInfo] = useState<GetTradeInt>()
    const [loading, setLoading] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<number>(0)
    const [isSuggest, setIsSuggest] = useState<boolean>(false)
    const [sug,setSug] = useState<number|string>(0)
    const asyncGetTradeInfo = async () => {
      if (id) {
        setLoading(true)
        const res = await GetTradeInfo(id)        
        if (res?.data) {
          setTradeInfo(res?.data)
        }
        setLoading(false)
      }else {
        navigate('/')
        setLoading(false)
      }
    }

    useEffect(() => {
      if (!render.current) {
        asyncGetTradeInfo()
        render.current = true
      }
    }, [])
    

    useEffect(() => {
      const handleBackButton = () => {
        navigate(-1)
      }
        if (tg?.BackButton) {
          tg.BackButton.show()
          tg.BackButton.onClick(handleBackButton)
  
          return () => {
            tg.BackButton?.offClick(handleBackButton)
            tg.BackButton?.hide()
          }
        }
    }, [location.pathname])

    return (
        <>
        {loading ? (
          <div className='w-full flex justify-center items-center h-screen'>
            <motion.img 
              src={Spinner} 
              alt="Spinner" 
              className='w-[120px] h-[80px] opacity-80'
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <div className='w-full min-h-screen bg-crypto-bg-primary'>
            <motion.div
              className='max-w-2xl mx-auto '
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header Section */}
              <motion.div 
                className='bg-gradient-to-r from-crypto-brand-primary/20 to-crypto-info/20 rounded-3xl p-6 mb-6 shadow-crypto-lg border border-crypto-border-primary'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <div className='relative'>
                      <img 
                        src={tradeInfo?.image || UserIcon} 
                        alt={username} 
                        className='w-16 h-16 rounded-full shadow-crypto border-2 border-crypto-border-primary' 
                      />
                      <div className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-crypto-bg-primary'></div>
                    </div>
                    <div>
                      <h1 className='text-2xl font-bold text-crypto-text-primary'>{username}</h1>
                      <p className='text-crypto-text-secondary'>Verified Trader</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='flex items-center gap-2 mb-1'>
                      <CryptoIcon token={tradeInfo?.mem_coin || ''} size="sm" />
                      <span className='text-lg font-semibold text-crypto-text-primary'>/</span>
                      <CryptoIcon token={tradeInfo?.coin || ''} size="sm" />
                    </div>
                    <p className='text-sm text-crypto-text-tertiary'>
                      {tradeInfo?.mem_coin}/{tradeInfo?.coin}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Price Section */}
              <motion.div 
                className='bg-crypto-bg-secondary rounded-2xl p-6 mb-6 shadow-crypto border border-crypto-border-primary'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className='text-center'>
                  <p className='text-sm text-crypto-text-secondary mb-2'>Current Price</p>
                  <p className='text-4xl font-bold text-crypto-brand-primary mb-2'>
                    ${(parseFloat(coinPrice ?? '0')).toLocaleString()}
                  </p>
                  <div className='flex items-center justify-center gap-2'>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tradeInfo?.type === 0 
                        ? 'bg-crypto-success-bg text-crypto-success border border-crypto-success' 
                        : 'bg-crypto-info-bg text-crypto-info border border-crypto-info'
                    }`}>
                      {tradeInfo?.type === 0 ? 'Buy Order' : 'Sell Order'}
                    </span>
                    <span className='text-xs text-crypto-text-tertiary'>•</span>
                    <span className='text-xs text-crypto-text-tertiary'>Live</span>
                  </div>
                </div>
              </motion.div>

              {/* Trade Information */}
              <motion.div 
                className='mb-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <TradeInformation 
                  CoinPrice={(parseFloat(coinPrice ?? '0').toFixed(5))}
                  Value={inputValue || 0}
                  MemCoin={tradeInfo?.mem_coin || ''}
                  Type={tradeInfo?.type}
                  BalanceAmount={tradeInfo?.balance || 0}
                  Limits_min={tradeInfo?.limit_min || 0}
                  Limits_max={tradeInfo?.limit_max || 0}
                  Coin={tradeInfo?.coin || ''}
                  MemCoinPrice={tradeInfo?.mem_coin_price || 0}
                  Comissions={tradeInfo?.commission_percent || 0}
                  PinoUSDT={tradeInfo?.pino_usdt || 0}
                  PinoTRX={tradeInfo?.pino_trx || 0}
                />
              </motion.div>

              {/* Input Section */}
              <motion.div 
                className='bg-crypto-bg-secondary rounded-2xl p-6 mb-6 shadow-crypto border border-crypto-border-primary'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className='text-lg font-semibold text-crypto-text-primary mb-4'>Amount</h3>
                <InputTrx 
                  Coin={tradeInfo?.coin || ''}
                  setInputValue={setInputValue}
                />
              </motion.div>

              {/* Suggest Price Section */}
              <motion.div 
                className='bg-crypto-bg-secondary rounded-2xl p-6 mb-6 shadow-crypto border border-crypto-border-primary'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <input
                  type="checkbox"
                  id="suggest-checkbox"
                  className="hidden"
                  checked={isSuggest}
                  onChange={(e) => setIsSuggest(e.target.checked)}
                />
                <motion.label
                  htmlFor="suggest-checkbox"
                  className="flex items-center cursor-pointer space-x-3"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className={`w-6 h-6 rounded-full border-2 border-crypto-info flex items-center justify-center transition-all duration-300 ease-in-out ${
                      isSuggest ? 'bg-crypto-info scale-110' : 'bg-crypto-bg-tertiary'
                    }`}
                  >
                    {isSuggest && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-white"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </span>
                  <div>
                    <span className="text-base font-semibold text-crypto-text-primary">Suggest your price</span>
                    <p className="text-sm text-crypto-text-secondary">Negotiate a better rate</p>
                  </div>
                </motion.label>

                {isSuggest && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className='mt-4'
                  >
                    <SuggestInput setSug={setSug} sug={sug}/>
                  </motion.div>
                )}
              </motion.div>
          
              {/* Action Button */}
              <motion.div 
                className='flex justify-center pb-10'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <BuyButton 
                  sugPrice={sug}
                  inputValue={inputValue || 0}
                  isSuggest={isSuggest}
                  Coin={tradeInfo?.mem_coin || ''} 
                  MemcoinPrice={tradeInfo?.mem_coin_price || 0} 
                  id={id || ''} 
                  Type={tradeInfo?.type}
                  Limits_min={tradeInfo?.limit_min || 0}
                  Limits_max={tradeInfo?.limit_max || 0}
                />
              </motion.div>
            </motion.div>
          </div>
        )}
        </>
    );
}
export default TradePage;
