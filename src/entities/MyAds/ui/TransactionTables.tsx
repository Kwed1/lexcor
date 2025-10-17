import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Delete from '../../../assets/closeRed.svg'
import Spinner from '../../../assets/spinner2.svg'
import { formatDate } from '../../../shared/services/date'
import { useTokenStore } from '../../../shared/store/TokenStore'
import GetMyDealsApi from '../api/GetMyDeals'
import { MyDealsInt } from '../type/MyDealsInt'
import RemoveTransactionModal from './RemoveTransactionModal.tsx'

interface Props {
  mode: string;
}

export interface finishedDeals {
  coin: string;
  mem_coin: string;
  username: string;
  price: number;
  transaction_date: string;
  buyer_name: string;
  status: string;
}

export default function TransactionTable({ mode }: Props) {
  const { GetMyDeals } = GetMyDealsApi();
  const { getToken } = useTokenStore();
  let token = getToken();
  const [myDeals, setMyDeals] = useState<MyDealsInt[]>([]);
  const [finishedDeals, setFinishedDeals] = useState<finishedDeals[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getCurrency } = useTokenStore();
  const coin = getCurrency();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>('');

  const getMyDealsReq = async () => {
    if (!token) return;
    setLoading(true);
    const status = mode === 'Active';
    const res = await GetMyDeals(status, coin);
    if (res?.data && Array.isArray(res.data)) {
      if (status) {
        setMyDeals(res.data as MyDealsInt[]);
      } else {
        setFinishedDeals(res.data as finishedDeals[]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getMyDealsReq();
  }, [mode, coin, token]);

  if (loading) return (
    <div className='w-full justify-center flex py-10'>
      <img src={Spinner} alt="Spinner" className='w-[120px] h-[80px] opacity-80' />
    </div>
  );

  if (mode === 'Active' && myDeals.length === 0) {
    return (
      <p className="text-center mt-10 text-2xl font-semibold text-crypto-text-tertiary">
        You have no active trades.
      </p>
    );
  }

  if (mode === 'Finished' && finishedDeals.length === 0) {
    return (
      <p className="text-center mt-10 text-2xl font-semibold text-crypto-text-tertiary">
        You have no finished trades.
      </p>
    );
  }

  return (
    mode === 'Active' ? (
      <div className='flex flex-col gap-3'>
        {myDeals.map((deal, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-crypto-bg-secondary hover:bg-crypto-bg-hover flex justify-between items-center px-[20px] relative py-3 border ${!deal?.blocked ? 'border-crypto-info' : 'border-crypto-danger'} rounded-2xl shadow-crypto transition-all`}
            onClick={() => {
              setIsOpen(true);
              setId(deal?.id);
            }}
          >
            <motion.button 
              className='rounded-full absolute top-[-5px] right-[-5px]'
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={Delete} alt="" />
            </motion.button>
            <div className='flex flex-col text-sm gap-1'>
              <p className='font-bold text-crypto-text-primary'>{deal?.mem_coin}/{deal?.coin}</p>
              {deal?.blocked && <p className='text-crypto-danger'>Blocked</p>}
            </div>
            <div className='flex flex-col'>
              <p className='font-bold text-right text-crypto-brand-primary'>{deal?.coin} {deal?.limit_min} - {deal?.coin} {deal?.limit_max}</p>
              <p className='text-center text-sm text-crypto-text-tertiary'>
                {formatDate(deal?.create_at)}
              </p>
            </div>
          </motion.button>
        ))}
        {isOpen && <RemoveTransactionModal isOpen={isOpen} closeModal={() => setIsOpen(false)} id={id} getMyDealsReq={getMyDealsReq} />}
      </div>
    ) : (
      <div className='flex flex-col gap-3'>
        {finishedDeals.map((deal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className={`w-full bg-crypto-bg-secondary flex flex-col justify-between items-center py-3 px-[20px] border ${mode === 'Active' ? 'border-crypto-info' : 'border-crypto-success'} rounded-2xl shadow-crypto`}
          >
            <div className='flex justify-between items-center text-sm w-full border-b border-crypto-border-primary pb-2'>
              <p className='font-bold text-crypto-text-primary'>{deal?.mem_coin}/{deal?.coin}</p>
              <p className='font-bold text-right text-crypto-brand-primary'>{deal?.price ? deal.price.toFixed(5) : '0.00000'}</p>
            </div>
            <div className='flex justify-between items-center text-sm w-full pt-2'>
              <p className='text-center text-sm font-[300] text-crypto-text-secondary'>{deal?.status === '0' ? 'Buyer' : 'Seller'} name: {deal?.buyer_name}</p>
              <p className='text-center text-sm text-crypto-text-tertiary'>{formatDate(deal?.transaction_date)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    )
  );
}
