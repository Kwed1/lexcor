import React from 'react'
// Импорты локальных иконок
import PINOIcon from '../../../assets/pino.jpg'
import BNBIcon from '../../../assets/valute-icons/bnb.webp'
import BTCIcon from '../../../assets/valute-icons/btc.webp'
import ETHIcon from '../../../assets/valute-icons/eth.webp'
import LINKIcon from '../../../assets/valute-icons/link.webp'
import LTCIcon from '../../../assets/valute-icons/litecoin-logo.png'
import SOLIcon from '../../../assets/valute-icons/Solana_logo.png'
import TRXIcon from '../../../assets/valute-icons/trx.svg'
import USDTIcon from '../../../assets/valute-icons/usdt.svg'

interface Props {
  token: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const CryptoIcon: React.FC<Props> = ({ token, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-6 h-6'
  }

  const getLocalIcon = (token: string) => {
    const localIcons: { [key: string]: string } = {
      USDT: USDTIcon,
      TRX: TRXIcon,
      BNB: BNBIcon,
      BTC: BTCIcon,
      ETH: ETHIcon,
      LINK: LINKIcon,
      LTC: LTCIcon,
      SOL: SOLIcon,
      PINO: PINOIcon
    }
    return localIcons[token] || null
  }

  const getFallbackIcon = (token: string) =>
    `https://ui-avatars.com/api/?name=${token}&background=random&color=fff&size=128`

  const iconSrc = getLocalIcon(token) || getFallbackIcon(token)

  const isLarge = token !== 'TRX' && token !== 'USDT'
  const finalSize = isLarge ? 'lg' : size

  return (
    <img
      src={iconSrc}
      alt={token}
      className={`${sizeClasses[finalSize]} rounded-full ${className}`}
      onError={(e) => {
        const target = e.target as HTMLImageElement
        if (target.src !== getFallbackIcon(token)) {
          target.src = getFallbackIcon(token)
        }
      }}
    />
  )
}

export default CryptoIcon
