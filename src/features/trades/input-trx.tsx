import React, { useEffect, useRef } from 'react';

interface Props {
  Coin: string;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function InputTrx({ Coin, setInputValue }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <div className="flex w-full justify-center items-center gap-3 bg-crypto-bg-secondary p-6 rounded-2xl shadow-crypto border border-crypto-border-primary">
        <input
          ref={inputRef}
          type="number"
          placeholder="0"
          className="w-2/5 text-4xl font-bold outline-none bg-transparent text-center text-crypto-brand-primary placeholder-crypto-text-tertiary"
          onChange={(e) => setInputValue(parseInt(e.target.value))}
        />
        <p className="text-crypto-text-secondary text-2xl font-semibold">{Coin}</p>
      </div>
    </div>
  );
}
