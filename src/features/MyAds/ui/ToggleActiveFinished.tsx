import { motion } from 'framer-motion';

interface Props {
	mode: string,
	setMode: React.Dispatch<React.SetStateAction<string>>
}

export default function ToggleActiveFinished({mode, setMode}:Props) {
	const toggleSwitch = (newMode: string) => {
		setMode(newMode);
	};

	return (
		<div
			className="relative flex items-center text-sm rounded-[14px] bg-crypto-bg-secondary shadow-crypto border border-crypto-border-primary"
		>
			<motion.div
				className={`absolute top-[3px] left-[3px] h-[calc(100%-6.5px)] w-[calc(50%-3px)] rounded-[14px]  ${mode === 'Active' ? 'bg-crypto-info': 'bg-crypto-success'} `}
				initial={false}
				animate={{ x: mode === 'Active' ? '0%' : '100%' }}
				transition={{ type: 'spring', stiffness: 500, damping: 50 }}
			/>

			<motion.button
				onClick={() => toggleSwitch('Active')}
				className={`relative z-10 px-4 py-2 h-[38px] rounded-[14px] transition-all duration-300 font-semibold ${
					mode === 'Active' ? 'text-white' : 'text-crypto-text-secondary'
				}`}
			>
			  <p className='pl-[3px] text-[16px]'>Active</p>
			</motion.button>
			<motion.button
				onClick={() => toggleSwitch('Finished')}
				className={`relative z-10 px-3 py-2 h-[38px] rounded-[14px] transition-all duration-300 text-[16px] font-semibold ${
					mode === 'Finished' ? 'text-white' : 'text-crypto-text-secondary'
				}`}
			>
				Finished
			</motion.button>
		</div>
	);
}
