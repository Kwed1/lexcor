import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { ReactComponent as Arrow } from '../../assets/arrow.svg'
import { ReactComponent as DoubleArrow } from '../../assets/doubleArrow.svg'

export default function Deposit() {
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedRight: () => {
      setConfirmed(true);

      setTimeout(() => {
        setConfirmed(false);
        navigate('/payment');
      }, 200);
    },
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="relative h-[45px] bg-gradient-to-r from-crypto-success to-crypto-success-hover rounded-full flex items-center cursor-pointer transition-all duration-300 hover:shadow-crypto group overflow-hidden"
    >
      <div
        className={`absolute w-9 h-9 left-1 bg-white rounded-full flex items-center justify-center transition-transform duration-300 shadow-crypto ${
          confirmed ? 'translate-x-[340px]' : 'translate-x-0'
        }`}
      >
        <p className="text-crypto-success text-xl">
          <Arrow className="-rotate-90 w-[16px] h-[16px]" />
        </p>
      </div>
      
      <p className="absolute w-full text-center transition-opacity duration-300 text-white font-bold text-[15px] tracking-wide">
        DEPOSIT
      </p>

      <div className="absolute right-0 pr-3 group-hover:pr-2 transition-all">
        <DoubleArrow className="w-6 h-6 text-white opacity-80" />
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
    </div>
  );
}
