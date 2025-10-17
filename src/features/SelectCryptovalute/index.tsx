import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';

interface Props {
	setValute: React.Dispatch<React.SetStateAction<string>>;
	coins: string[]; // Array of coin names
}

export default function SelectCryptovalute({ setValute, coins }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValute, setSelectedValute] = useState<string>('');
	const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
	const selectRef = useRef<HTMLDivElement>(null);

	const toggleList = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (coin: string) => {
		console.log('Selecting coin:', coin);
		setValute(coin);
		setSelectedValute(coin);
		setIsOpen(false);
		console.log('Selected coin set to:', coin);
	};

	useEffect(() => {
		if (isOpen && selectRef.current) {
			const rect = selectRef.current.getBoundingClientRect();
			setPosition({
				top: rect.bottom + window.scrollY,
				left: rect.left + window.scrollX,
				width: rect.width
			});
		}
	}, [isOpen]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			const dropdown = document.querySelector('[data-dropdown="crypto-select"]');
			
			if (selectRef.current && 
				!selectRef.current.contains(target) && 
				!dropdown?.contains(target)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const dropdownContent = isOpen ? (
		<motion.div
			initial={{ height: 0, opacity: 0 }}
			animate={{ height: 'auto', opacity: 1 }}
			exit={{ height: 0, opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="fixed bg-crypto-bg-tertiary rounded-xl shadow-crypto-lg border border-crypto-border-primary overflow-hidden"
			style={{
				top: position.top,
				left: position.left,
				width: position.width,
				zIndex: 9999
			}}
			data-dropdown="crypto-select"
			onClick={(e) => e.stopPropagation()}
		>
			<ul className='p-2 text-[11px] flex flex-col gap-1'>
				{coins.map((coin, index) => (
					<li 
						key={index} 
						className='border-b border-crypto-border-primary pb-1 cursor-pointer hover:text-crypto-brand-primary hover:bg-crypto-bg-hover text-crypto-text-secondary transition-colors px-2 py-1 rounded' 
						onClick={(e) => {
							e.stopPropagation();
							handleSelect(coin);
						}}
					>
						{coin}
					</li>
				))}
			</ul>
		</motion.div>
	) : null;

	return (
		<>
			<div ref={selectRef} className='relative'>
				<div className='py-2 px-2 h-[48px] bg-crypto-bg-secondary rounded-[20px] flex flex-col items-center justify-center shadow-crypto border border-crypto-border-primary'>
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
			</div>
			{isOpen && createPortal(dropdownContent, document.body)}
		</>
	);
}
