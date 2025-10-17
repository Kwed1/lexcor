import React from 'react'
// Импорты локальных иконок
import PINOIcon from '../../../assets/pino.jpg'
import AresIcon from '../../../assets/valute-icons/ares.jpg'
import MooncatIcon from '../../../assets/valute-icons/mooncat.jpg'
import SundogIcon from '../../../assets/valute-icons/sundog.jpg'
import TbullIcon from '../../../assets/valute-icons/tbull.jpg'
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
      ARES: AresIcon,
      MOONCAT: MooncatIcon,
      SUNDOG: SundogIcon,
      TBULL: TbullIcon,
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
