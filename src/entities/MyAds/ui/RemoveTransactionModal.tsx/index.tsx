import { motion } from 'framer-motion';
import { useState } from 'react';
import { Portal } from '../../../../shared/hooks/usePortal';
import GetMyDealsApi from '../../api/GetMyDeals';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
	id: string;
	getMyDealsReq: () => Promise<void>
}


export default function RemoveTransactionModal({ isOpen, closeModal, id, getMyDealsReq }: Props) {
	const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
	const {RemoveMyDeals, GetMyDeals} = GetMyDealsApi()
	
  if (!isOpen) return null;
	const RemoveMyDeal =async(id:string)=>{
		setDeleteLoading(true)
	  await RemoveMyDeals(id)
		setDeleteLoading(false)
		closeModal()
		getMyDealsReq()
	}


  return (
    <Portal>
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
      <motion.div
        className="bg-crypto-bg-tertiary p-8 rounded-2xl shadow-crypto-lg mx-4 border border-crypto-border-primary max-w-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold text-center mb-4 text-crypto-text-primary">Remove Transaction</h2>
          <p className="mb-6 text-center text-crypto-text-secondary">Are you sure you want to remove this transaction? This action cannot be undone.</p>
        </motion.div>
        
        <div className="flex gap-4">
          <motion.button
            onClick={closeModal}
            className="flex-1 bg-crypto-bg-hover hover:bg-crypto-bg-secondary text-crypto-text-primary px-6 py-3 rounded-xl font-semibold transition-all border border-crypto-border-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          <motion.button
					  onClick={() => RemoveMyDeal(id)}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all shadow-crypto ${
              deleteLoading 
                ? 'bg-crypto-text-tertiary cursor-not-allowed' 
                : 'bg-crypto-danger hover:bg-crypto-danger-hover text-white'
            }`}
						disabled={deleteLoading}
            whileHover={!deleteLoading ? { scale: 1.02 } : {}}
            whileTap={!deleteLoading ? { scale: 0.98 } : {}}
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </motion.button>
        </div>
      </motion.div>
      </div>
    </Portal>
  );
}
