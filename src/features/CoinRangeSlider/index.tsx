import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { useEffect } from 'react'
import useWalletStore from '../../shared/store/WalletStore'

interface Props {
  buyCoin: string;
  ordertype: number;
  minCoins: number;
  maxCoins: number;
  setMinCoins: React.Dispatch<React.SetStateAction<number>>;
  setMaxCoins: React.Dispatch<React.SetStateAction<number>>;
  fiatCoin: string
}

const CoinRangeSlider: React.FC<Props> = ({
  minCoins,
  maxCoins,
  setMinCoins,
  setMaxCoins,
  ordertype,
  buyCoin,
  fiatCoin
}) => {
  const { trx, usdt, mem_coins } = useWalletStore();
  const coin = mem_coins.find(coin => coin.token === buyCoin);
  

  useEffect(() => {
    setMaxCoins(0);
  }, [ordertype]);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinCoins(value[0]);
      setMaxCoins(value[1]);
    }
  };

  const calculatePosition = (value: number) => {
    const maxValue = ordertype === 1 
      ? (fiatCoin === 'TRX' ? Math.round(trx || 0) : Math.round(usdt || 0))
      : Math.round(coin?.price || 0);
    
    if (maxValue === 0) return 0;
    return Math.min(((value / maxValue) * 100), 100);
  };
  
  
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Marker for Min Coins */}
      <div
        className="transition-all duration-300 ease-out"
        style={{
          position: 'absolute',
          top: -45,
          left: `${calculatePosition(minCoins)}%`,
          transform: 'translateX(-50%)',
          backgroundColor: '#FCD535',
          padding: '7px 15px',
          fontSize: 15,
          borderRadius: 20,
          color: '#0B0E11',
          fontWeight: 600,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(252, 213, 53, 0.3)',
        }}
      >
        {minCoins || 0}
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #FCD535',
          }}
        />
      </div>

      {/* Marker for Max Coins */}
      <div
        className="transition-all duration-300 ease-out"
        style={{
          position: 'absolute',
          top: -45,
          left: `${calculatePosition(maxCoins)}%`,
          transform: 'translateX(-50%)',
          backgroundColor: '#FCD535',
          padding: '7px 15px',
          fontSize: 15,
          borderRadius: 20,
          color: '#0B0E11',
          fontWeight: 600,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(252, 213, 53, 0.3)',
        }}
      >
        {maxCoins || 0}
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #FCD535',
          }}
        />
      </div>

      <Slider
        range
        min={0}
        max = {ordertype === 1 
        ? fiatCoin === 'TRX' 
          ? parseFloat(trx.toFixed(4))
          : parseFloat(usdt.toFixed(4))
        : parseFloat((coin?.price || 0).toFixed(4))}
        value={[minCoins, maxCoins]}
        onChange={handleSliderChange}
        railStyle={{ backgroundColor: '#2B3139', height: 10, borderRadius: 5 }}
        trackStyle={[
          { backgroundColor: '#FCD535', height: 10, borderRadius: 5 },
          { backgroundColor: '#FCD535', height: 10, borderRadius: 5 },
        ]}
        handleStyle={[
          {
            border: '4px solid #FCD535',
            height: 26,
            width: 26,
            marginTop: -8,
            backgroundColor: '#0B0E11',
            opacity: 100,
            boxShadow: '0 4px 12px rgba(252, 213, 53, 0.4)',
            cursor: 'pointer',
          },
          {
            border: '4px solid #FCD535',
            height: 26,
            width: 26,
            marginTop: -8,
            backgroundColor: '#0B0E11',
            opacity: 100,
            boxShadow: '0 4px 12px rgba(252, 213, 53, 0.4)',
            cursor: 'pointer',
          },
        ]}
      />
    </div>
  );
};

export default CoinRangeSlider;
