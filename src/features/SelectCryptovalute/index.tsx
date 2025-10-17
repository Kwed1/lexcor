import { motion } from 'framer-motion';
import { useState } from 'react';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';

interface Props {
	setValute: React.Dispatch<React.SetStateAction<string>>;
	coins: string[]; // Array of coin names
}

export default function SelectCryptovalute({ setValute, coins }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValute, setSelectedValute] = useState<string>('');

	const toggleList = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (coin: string) => {
		setValute(coin);
		setSelectedValute(coin);
		setIsOpen(false)
	};

	return (
		<div className='relative'>
			<div className='py-2 px-2 h-[48px] bg-crypto-bg-secondary rounded-[20px] flex flex-col items-center justify-center shadow-crypto border border-crypto-border-primary' style={{ zIndex: 10 }}>
				<button 
					className='flex items-center justify-center cursor-pointer w-full'
					onClick={toggleList}
				>
					<div className="flex items-center justify-between w-full">
						<p className="text-[16px] font-semibold text-center flex-1 text-crypto-text-primary">
							{selectedValute || 'Select'}
						</p>
						<Arrow className="h-[10px] w-[13px] fill-crypto-text-tertiary" />
					</div>
				</button>
			</div>
			<motion.div
				initial={{ height: 0, opacity: 0 }}
				animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
				transition={{ duration: 0.3 }}
				className="absolute left-0 right-0 mt-3 overflow-hidden bg-crypto-bg-tertiary rounded-xl shadow-crypto-lg border border-crypto-border-primary"
				style={{ zIndex: 20 }} 
			>
				<ul className='p-2 text-[11px] flex flex-col gap-1'>
					{coins.map((coin, index) => (
						<li 
							key={index} 
							className='border-b border-crypto-border-primary pb-1 cursor-pointer hover:text-crypto-brand-primary hover:bg-crypto-bg-hover text-crypto-text-secondary transition-colors px-2 py-1 rounded' 
							onClick={() => handleSelect(coin)}
						>
							{coin}
						</li>
					))}
				</ul>
			</motion.div>
		</div>
	);
}
