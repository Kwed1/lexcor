import { motion } from 'framer-motion'
import { useState } from 'react'
import Close from '../../../../assets/close.svg'
import { Portal } from '../../../../shared/hooks/usePortal'
import { useGetWallet } from '../../../../shared/services/api/get-wallet/get-wallet'
import useWalletStore from '../../../../shared/store/WalletStore'
import useWithdrawApi from '../api/useWithdrawApi'
import SelectCoinForWithdraw from './SelectCoinForWithdraw'

interface Props {
  setWithdrawModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalOfWithdraw({ setWithdrawModal }: Props) {
  const [selectedCoin, setSelectedCoin] = useState<string>('TRX')
  const [address, setAddress] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  const { trx, usdt, pino, mem_coins, withdrawMemCom, withdrawTRXCom, withdrawUSDTCom } = useWalletStore()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { WithdrawAmount } = useWithdrawApi()
  const { getWallet } = useGetWallet()

  const coinPrice = (() => {
    switch (selectedCoin) {
      case 'TRX':
        return trx
      case 'USDT':
        return usdt
      case 'PINO':
        return pino
      default:
        const coin = mem_coins.find(coin => coin.token === selectedCoin)
        return coin ? coin.price : null
    }
  })()

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^[0-9,.]*$/.test(value)) {
      setAmount(value)
    }
  }

  const isAmountEmptyOrZero = amount === '' || Number(amount) === 0
  const isAmountInvalid = Number(amount) > Number(coinPrice) && Number(amount) > 0
  const isAddressEmpty = address === ''

  const isWithdrawDisabled = isAmountEmptyOrZero || isAmountInvalid || isAddressEmpty

  const WithdrawValute = async () => {
    const res = await WithdrawAmount(selectedCoin, address, Number(amount))
    if (res.status === 200) {
      getWallet()
      setWithdrawModal(false)
    }
  }

  // Determine the commission based on selected coin
  const getTransactionCommission = () => {
    switch (selectedCoin) {
      case 'TRX':
        return withdrawTRXCom
      case 'USDT':
        return withdrawUSDTCom
      case 'PINO':
        return withdrawMemCom
      default:
        return withdrawMemCom
    }
  }

  return (
    <Portal>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 px-5">
        <motion.div
          className="bg-crypto-bg-tertiary py-6 px-6 min-h-[60vh] rounded-2xl shadow-crypto-lg w-full max-w-md border border-crypto-border-primary"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
        >
        <div className="w-full flex justify-center relative mt-1">
          <p className="text-center text-2xl font-bold text-crypto-text-primary">Withdraw</p>
          <motion.button
            className="rounded-full flex justify-center items-center absolute right-0 hover:bg-crypto-bg-hover p-2 transition-colors"
            onClick={() => setWithdrawModal(false)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={Close} alt="" className="w-6 h-6" />
          </motion.button>
        </div>
        <div className="mt-6">
          <SelectCoinForWithdraw
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            coinPrice={coinPrice}
            setSelectedCoin={setSelectedCoin}
            selectedCoin={selectedCoin}
          />
        </div>

        <p className={`text-sm ml-1 font-medium text-crypto-text-secondary ${isOpen ? 'mt-[120px]' : 'mt-6'}`}>Address</p>
        <input
          type="text"
          className="mt-2 w-full px-4 py-3 outline-none bg-crypto-bg-secondary rounded-lg h-[50px] border border-crypto-border-primary focus:border-crypto-brand-primary text-crypto-text-primary placeholder-crypto-text-tertiary transition-all duration-200"
          placeholder="Enter the wallet address"
          value={address}
          onChange={handleAddressChange}
        />

        <p className="text-sm ml-1 mt-6 font-medium text-crypto-text-secondary">Amount</p>
        <input
          type="text"
          className={`mt-2 w-full px-4 py-3 outline-none bg-crypto-bg-secondary rounded-lg h-[50px] border transition-all duration-200 text-crypto-text-primary placeholder-crypto-text-tertiary ${
            isAmountInvalid ? 'border-crypto-danger focus:border-crypto-danger' : 'border-crypto-border-primary focus:border-crypto-brand-primary'
          }`}
          placeholder="Enter the amount"
          value={amount}
          onChange={handleAmountChange}
        />

        <p className="text-[13px] ml-1 mt-2 text-crypto-text-tertiary">
          Transaction Commission: <span className="text-crypto-brand-primary font-semibold">{getTransactionCommission()} TRX</span>
        </p>

        <div className="flex w-full items-center gap-4 mt-8 text-white">
          <motion.button 
            className="w-1/2 h-[44px] bg-crypto-bg-hover hover:bg-crypto-bg-secondary rounded-xl font-semibold transition-all border border-crypto-border-primary" 
            onClick={() => setWithdrawModal(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          <motion.button
            className={`w-1/2 h-[44px] rounded-xl font-semibold transition-all shadow-crypto ${
              isWithdrawDisabled 
                ? 'bg-crypto-text-tertiary cursor-not-allowed' 
                : 'bg-crypto-danger hover:bg-crypto-danger-hover'
            }`}
            disabled={isWithdrawDisabled}
            onClick={WithdrawValute}
            whileHover={!isWithdrawDisabled ? { scale: 1.02 } : {}}
            whileTap={!isWithdrawDisabled ? { scale: 0.98 } : {}}
          >
            Withdraw
          </motion.button>
        </div>
      </motion.div>
      </div>
    </Portal>
  )
}
