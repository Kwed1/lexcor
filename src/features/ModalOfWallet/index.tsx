import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Portal } from '../../shared/hooks/usePortal'
import useWalletStore from '../../shared/store/WalletStore'

export default function ModalOfWallet() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [privateKeyVisible, setPrivateKeyVisible] = useState<boolean>(false)
  const {address, privateKey} = useWalletStore()
  const navigate = useNavigate()
  const {state} = useLocation()

  useEffect(() => {
    if (state && state.modal) {
      setPrivateKeyVisible(true)
      setIsOpen(true)
    }
  },[])
  
  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const togglePrivateKeyVisibility = () => {
    if (!privateKeyVisible) {
    navigate('/set-password', {state: {status: 'exam'}})
    } else {
      setPrivateKeyVisible(false)
    }
  }

  return (
    <div>
      <motion.button 
        onClick={toggleModal}
        className="px-6 py-3 bg-gradient-to-r from-crypto-info to-crypto-info-hover text-white rounded-xl shadow-crypto font-semibold transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        My Wallet
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
            <motion.div 
              className="bg-crypto-bg-tertiary p-8 rounded-2xl shadow-crypto-lg w-96 max-w-sm border border-crypto-border-primary"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-crypto-text-primary">Your Wallet Info</h2>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-crypto-bg-secondary p-4 rounded-xl border border-crypto-border-primary"
                >
                  <strong className="text-sm text-crypto-text-secondary">Wallet Address:</strong>
                  <p className="text-crypto-text-primary break-all text-sm mt-2 font-mono">{address}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-crypto-bg-secondary p-4 rounded-xl border border-crypto-border-primary"
                >
                  <strong className="text-sm text-crypto-text-secondary">Private Key:</strong>
                  <p className="text-crypto-text-primary break-all text-sm mt-2 font-mono">
                    {privateKeyVisible ? privateKey : '••••••••••••••••••••••••••••••••'}
                  </p>
                  <motion.button
                    onClick={togglePrivateKeyVisibility}
                    className="text-crypto-info hover:text-crypto-info-hover mt-3 text-sm font-semibold transition-colors"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {privateKeyVisible ? '👁️ Hide Private Key' : '👁️‍🗨️ Show Private Key'}
                  </motion.button>
                </motion.div>
              </div>

              <motion.button 
                onClick={toggleModal}
                className="mt-6 w-full py-3 bg-crypto-bg-hover hover:bg-crypto-bg-secondary text-crypto-text-primary rounded-xl shadow-crypto font-semibold transition-all border border-crypto-border-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  )
}
