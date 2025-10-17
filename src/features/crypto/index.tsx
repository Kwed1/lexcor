import { motion } from 'framer-motion';
import { useState } from 'react';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import { useCoinStore } from '../../shared/store/CoinsStore';

interface Props {
  setMemCoin: React.Dispatch<React.SetStateAction<string>>;
}

export default function Crypto({ setMemCoin }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All');
  const { coins } = useCoinStore();

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setMemCoin(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="w-[88px] h-[38px] px-3 bg-crypto-bg-secondary rounded-2xl flex flex-col items-start justify-center shadow-crypto border border-crypto-border-primary"
        style={{ zIndex: 10 }}
      >
        <button className="flex items-center cursor-pointer flex-col" onClick={toggleList}>
          <div className="flex flex-col pb-1">
            <div className="flex gap-2 items-center">
              <p className="text-[12px] text-crypto-text-tertiary">Crypto</p>
              <Arrow className={`h-[12px] w-[13px] pt-1 transform ${isOpen ? 'rotate-180' : ''} fill-crypto-text-tertiary`} />
            </div>

            <div className="h-[15px] items-center flex pb-1">
              <p className="text-[14px] w-full text-left text-crypto-text-secondary">{selectedOption}</p>
            </div>
          </div>
        </button>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 right-0 mt-3 overflow-hidden bg-crypto-bg-tertiary rounded-xl shadow-crypto-lg max-h-[120px] overflow-y-scroll border border-crypto-border-primary"
        style={{ zIndex: 20 }}
      >
        <ul className="p-2 text-[11px] flex flex-col gap-1">
          <li
            key="all"
            className={`border-b border-crypto-border-primary pb-1 cursor-pointer hover:text-crypto-brand-primary transition-colors ${selectedOption === 'All' ? 'text-crypto-brand-primary' : 'text-crypto-text-secondary'}`}
            onClick={() => selectOption('All')}
          >
            All
          </li>
          {/* Основные валюты */}
          <li
            key="USDT"
            className={`border-b border-crypto-border-primary pb-1 cursor-pointer hover:text-crypto-brand-primary transition-colors ${selectedOption === 'USDT' ? 'text-crypto-brand-primary' : 'text-crypto-text-secondary'}`}
            onClick={() => selectOption('USDT')}
          >
            USDT
          </li>
          <li
            key="TRX"
            className={`border-b border-crypto-border-primary pb-1 cursor-pointer hover:text-crypto-brand-primary transition-colors ${selectedOption === 'TRX' ? 'text-crypto-brand-primary' : 'text-crypto-text-secondary'}`}
            onClick={() => selectOption('TRX')}
          >
            TRX
          </li>
          {/* Дополнительные монеты */}
          {coins.map((option) => (
            <li
              key={option?.token}
              className={`border-b border-crypto-border-primary pb-1 cursor-pointer hover:text-crypto-brand-primary transition-colors ${selectedOption === option?.name ? 'text-crypto-brand-primary' : 'text-crypto-text-secondary'}`}
              onClick={() => selectOption(option?.name)}
            >
              {option?.name}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
