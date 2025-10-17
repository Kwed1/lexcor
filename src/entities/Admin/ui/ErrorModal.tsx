import { initUtils } from '@tma.js/sdk';
import { motion } from 'framer-motion';
import { Portal } from '../../../shared/hooks/usePortal';
import { ErrorTransInt } from '../type/ErrorTrans';
interface ErrorModalProps {
  message: ErrorTransInt | undefined;
  onClose: () => void;
}

export default function ErrorModal({ message, onClose }: ErrorModalProps) {
	if (!message) return null
  const OpenMessage = (link:string) => {
    const utils = initUtils()
    utils.openTelegramLink(link)
  }
  return (
    <Portal>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
      <motion.div 
        className="bg-crypto-bg-tertiary rounded-2xl p-6 w-full max-w-md shadow-crypto-lg relative border border-crypto-border-primary"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-bold mb-4 text-crypto-danger">⚠️ Transaction Error</h2>
        <div className="bg-crypto-danger-bg border border-crypto-danger rounded-xl p-4 mb-4">
          <p className="text-sm text-crypto-text-primary font-semibold mb-1">Error Message:</p>
          <p className="text-sm text-crypto-danger">{message.error_message}</p>
        </div>
        <div className="bg-crypto-bg-secondary rounded-xl p-4 border border-crypto-border-primary">
          <ul className="text-sm text-crypto-text-secondary space-y-2">
            <li className="flex justify-between">
              <strong>Buyer Commission Paid:</strong> 
              <span className={message.buyer_commission_paid ? 'text-crypto-success' : 'text-crypto-danger'}>
                {message.buyer_commission_paid ? '✓ Yes' : '✗ No'}
              </span>
            </li>
            <li className="flex justify-between">
              <strong>Seller Commission Paid:</strong> 
              <span className={message.seller_commission_paid ? 'text-crypto-success' : 'text-crypto-danger'}>
                {message.seller_commission_paid ? '✓ Yes' : '✗ No'}
              </span>
            </li>
            <li className="flex justify-between">
              <strong>Buyer Coin to Bot:</strong> 
              <span className={message.buyer_coin_transferred_to_bot ? 'text-crypto-success' : 'text-crypto-danger'}>
                {message.buyer_coin_transferred_to_bot ? '✓ Yes' : '✗ No'}
              </span>
            </li>
            <li className="flex justify-between">
              <strong>Seller Coin to Bot:</strong> 
              <span className={message.seller_coin_transferred_to_bot ? 'text-crypto-success' : 'text-crypto-danger'}>
                {message.seller_coin_transferred_to_bot ? '✓ Yes' : '✗ No'}
              </span>
            </li>
            <li className="flex justify-between">
              <strong>Bot → Seller:</strong> 
              <span className={message.bot_send_money_to_seller ? 'text-crypto-success' : 'text-crypto-danger'}>
                {message.bot_send_money_to_seller ? '✓ Yes' : '✗ No'}
              </span>
            </li>
            <li className="flex justify-between">
              <strong>Bot → Buyer:</strong> 
              <span className={message.bot_send_money_to_buyer ? 'text-crypto-success' : 'text-crypto-danger'}>
                {message.bot_send_money_to_buyer ? '✓ Yes' : '✗ No'}
              </span>
            </li>
          </ul>
          <div className="mt-4 space-y-2">
            <motion.button 
              className='w-full py-2 px-4 rounded-lg bg-crypto-info hover:bg-crypto-info-hover text-white font-semibold transition-all shadow-crypto'
              onClick={() => OpenMessage(message?.buyer_link)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              👤 Open Buyer Link
            </motion.button>
            <motion.button 
              className='w-full py-2 px-4 rounded-lg bg-crypto-info hover:bg-crypto-info-hover text-white font-semibold transition-all shadow-crypto'
              onClick={() => OpenMessage(message?.seller_link)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🏪 Open Seller Link
            </motion.button>
          </div>
        </div>
        <motion.button
          onClick={onClose}
          className="absolute top-3 right-3 text-crypto-text-tertiary hover:text-crypto-text-primary text-2xl font-bold w-8 h-8 flex items-center justify-center hover:bg-crypto-bg-hover rounded-full transition-all"
          aria-label="Close"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>
      </motion.div>
      </div>
    </Portal>
  );
}
