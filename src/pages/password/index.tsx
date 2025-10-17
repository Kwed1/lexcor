import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '../../assets/icon.jpg'
import usePasswordApi from './api/usePasswordApi'

const PasswordPage: React.FC = () => {
  const [pinCode, setPinCode] = useState<string[]>(['', '', '', '']);
  const navigate = useNavigate()
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const {setPassword, getPrivatePassword} = usePasswordApi()
  const {state} = useLocation()
  const {status} = state
  
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (value.length <= 1 && !isNaN(Number(value))) {
      const newPinCode = [...pinCode];
      newPinCode[index] = value;
      setPinCode(newPinCode);

      if (value && index < 3) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !pinCode[index]) {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const isPinCodeComplete = pinCode.every((digit) => digit !== '');
  

  const _setPinCode = async() => {
    if (isPinCodeComplete) {
      if (status === 'create') {
      setLoading(true)
      const res=await setPassword(pinCode.join(''))
      if (res.status === 200) {
        navigate('/')
      }
      setLoading(false)
      } else {
        setLoading(true)
        const res = await getPrivatePassword(pinCode.join(''))
        if (res?.status === 200) {
          navigate('/wallet', {state: {modal: true}})
        }
        setLoading(false)
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-crypto-bg-primary flex items-center justify-center">
      <motion.div
        className="max-w-md mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div 
          className='bg-crypto-bg-secondary rounded-3xl p-8 shadow-crypto-lg border border-crypto-border-primary text-center'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          <motion.div 
            className='flex justify-center mb-6'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img src={Icon} alt="" className='w-20 h-20 rounded-full shadow-crypto border-2 border-crypto-border-primary' />
          </motion.div>
          
          <motion.h1 
            className='text-2xl font-bold text-crypto-text-primary mb-8'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Enter your 4-digit Pincode
          </motion.h1>
          
          <div className="flex justify-center gap-4 mb-8">
            {pinCode.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => inputsRef.current[index] = el}
                type="number"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-center text-crypto-brand-primary text-2xl font-bold bg-crypto-bg-tertiary border-2 border-crypto-border-primary focus:outline-none focus:border-crypto-brand-primary rounded-xl transition-all duration-300 ease-in-out shadow-crypto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05, borderColor: '#FCD535' }}
              />
            ))}
          </div>
          
          <motion.button
            className={`w-full text-white text-lg py-4 rounded-xl font-bold shadow-crypto transition-all ${
              loading ? 'bg-crypto-text-tertiary cursor-not-allowed' : 'bg-crypto-brand-primary hover:bg-crypto-brand-secondary'
            }`}
            disabled={loading}
            onClick={() => _setPinCode()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? 'Processing...' : status === 'create' ? 'SET PINCODE' : 'VERIFY PINCODE'}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PasswordPage;
