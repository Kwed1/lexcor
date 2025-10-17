import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Close from '../../../../assets/close.svg'
import Spinner from '../../../../assets/spinner2.svg'
import { useNecessary } from '../../../../context/necessary'
import GetCoinsApi from '../../../../entities/Admin/api/GetCoins'
import { Portal } from '../../../../shared/hooks/usePortal'
import { useCoinStore } from '../../../../shared/store/CoinsStore'
import { Coin } from '../../../../shared/types/store/CoinStore'
import NewCoinApi from '../../api/PostNewCoin'

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  edit?: boolean;
  coinData?: Coin;
}

export default function CreateCoinModal({ setOpenModal, edit, coinData }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [address, setAddress] = useState<string>(coinData?.token || "");
  const [name, setName] = useState<string>(coinData?.name || "");
  const [priceUSD, setPriceUSD] = useState<string>(
    coinData?.price_in_usdt?.toString() || ""
  );
  const [priceTRX, setPriceTRX] = useState<string>(
    coinData?.price_in_trx?.toString() || ""
  );
  const [coinGeckoId, setCoinGeckoId] = useState<string>(
    coinData?.name_id || ""
  );

  const { PostNewCoin, EditCoin } = NewCoinApi();
  const [loading, setLoading] = useState<boolean>(false);
  const { GetCoins } = GetCoinsApi();
  const { setCoins, setGetDataLoading } = useCoinStore();
  const { getWallet } = useNecessary();

  const GetCoinRequest = async () => {
    setGetDataLoading(true);
    const res = await GetCoins("");
    if (res?.data) setCoins(res?.data);
    setGetDataLoading(false);
  };

  const handleSave = async () => {
    const parsedPriceUSD = Number(priceUSD);
    const parsedPriceTRX = Number(priceTRX);
    
    setLoading(true);
    if (edit) {
      if (coinData) {
        await EditCoin(
          name,
          address,
          parsedPriceUSD,
          parsedPriceTRX,
          coinData?.id,
          coinGeckoId,
        );
      }
    } else {
      await PostNewCoin(name, address, parsedPriceUSD, parsedPriceTRX, coinGeckoId);
    }
    getWallet();
    GetCoinRequest();
    setLoading(false);
    handleClose();
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setOpenModal(false);
  };

  const isFormValid =
    name.trim() !== "" &&
    address.trim() !== "" &&
    coinGeckoId.trim() !== ""/*  &&
    !isNaN(parseInt(priceUSD, 10)) &&
    !isNaN(parseInt(priceTRX, 10)); */

  return (
    <Portal>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 px-5 backdrop-blur-sm">
      <motion.div
        className="bg-crypto-bg-tertiary py-6 px-6 rounded-2xl shadow-crypto-lg w-full border border-crypto-border-primary"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="w-full flex justify-center relative mt-1">
          <p className="text-center text-2xl font-bold text-crypto-text-primary">{edit ? "Edit coin" : "Create coin"}</p>
          <motion.button
            className="rounded-full flex justify-center items-center absolute right-0 hover:bg-crypto-bg-hover p-2 transition-colors"
            onClick={handleClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={Close} alt="" className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm font-medium text-crypto-text-secondary mb-2">Name</p>
            <input
              type="text"
              className="w-full px-4 py-3 outline-none bg-crypto-bg-secondary rounded-lg border border-crypto-border-primary focus:border-crypto-brand-primary text-crypto-text-primary placeholder-crypto-text-tertiary transition-all duration-200"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter coin name"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-crypto-text-secondary mb-2">CoinGecko ID</p>
            <input
              type="text"
              className="w-full px-4 py-3 outline-none bg-crypto-bg-secondary rounded-lg border border-crypto-border-primary focus:border-crypto-brand-primary text-crypto-text-primary placeholder-crypto-text-tertiary transition-all duration-200"
              onChange={(e) => setCoinGeckoId(e.target.value)}
              value={coinGeckoId}
              placeholder="Enter CoinGecko ID"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-crypto-text-secondary mb-2">Address</p>
            <input
              type="text"
              className="w-full px-4 py-3 outline-none bg-crypto-bg-secondary rounded-lg border border-crypto-border-primary focus:border-crypto-brand-primary text-crypto-text-primary placeholder-crypto-text-tertiary transition-all duration-200"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Enter coin address"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-crypto-text-secondary mb-2">Price in USD</p>
            <input
              type="number"
              className="w-full px-4 py-3 outline-none bg-crypto-bg-secondary rounded-lg border border-crypto-border-primary focus:border-crypto-brand-primary text-crypto-text-primary placeholder-crypto-text-tertiary transition-all duration-200"
              onChange={(e) => setPriceUSD(e.target.value)}
              value={priceUSD}
              placeholder="0.00"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-crypto-text-secondary mb-2">Price in TRX</p>
            <input
              type="number"
              className="w-full px-4 py-3 outline-none bg-crypto-bg-secondary rounded-lg border border-crypto-border-primary focus:border-crypto-brand-primary text-crypto-text-primary placeholder-crypto-text-tertiary transition-all duration-200"
              onChange={(e) => setPriceTRX(e.target.value)}
              value={priceTRX}
              placeholder="0.00"
            />
          </div>
        </div>

        <button
          className={`bg-crypto-brand-primary rounded-lg mt-6 font-semibold text-crypto-text-primary w-full px-5 h-[50px] flex justify-center items-center gap-2 transition-all duration-200 ${
            loading || !isFormValid ? "opacity-50 cursor-not-allowed" : "hover:bg-crypto-brand-primary/90"
          }`}
          disabled={loading || !isFormValid}
          onClick={handleSave}
        >
          {loading && (
            <img src={Spinner} alt="Spinner" className="w-5 h-5" />
          )}
          {edit ? "Save changes" : "Create coin"}
        </button>
      </motion.div>
      </div>
    </Portal>
  );
}
