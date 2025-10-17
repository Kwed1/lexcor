import React from 'react';

interface Props {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
}

const InputCoinPrice = ({ value, setValue }: Props) => {
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };
  

  return (
    <div className="flex flex-col mt-4">
      <label htmlFor="coin-price" className="mb-2 text-sm font-medium ml-2 text-crypto-text-secondary">
        Coin price
      </label>
      <input
        id="coin-price"
        type="text"
        className="outline-none p-3 rounded-lg bg-crypto-bg-secondary border border-crypto-border-primary focus:border-crypto-brand-primary text-crypto-text-primary placeholder-crypto-text-tertiary transition-all duration-200 focus:shadow-crypto"
        value={value}
        onChange={handleNumberInput}
        placeholder="Enter coin price"
      />
    </div>
  );
};

export default InputCoinPrice;
