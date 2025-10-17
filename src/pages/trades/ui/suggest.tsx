import { motion } from 'framer-motion';

interface Props {
	setSug: React.Dispatch<React.SetStateAction<string | number>>;
	sug: string | number;
}

export default function SuggestInput({
	setSug,
	sug,
}: Props) {
	const handleNumberInput = (
		e: React.ChangeEvent<HTMLInputElement>,
		setValue: React.Dispatch<React.SetStateAction<string | number>>
	) => {
		const value = e.target.value;
		if (/^\d*\.?\d*$/.test(value)) {
			setValue(value);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: 'auto' }}
			exit={{ opacity: 0, height: 0 }}
			transition={{ duration: 0.3 }}
			className='mt-4'
		>
			<p className="text-sm ml-1 font-medium text-crypto-text-secondary">Suggest my price:</p>
			<input
				type="text"
				value={sug}
				onChange={(e) => handleNumberInput(e, setSug)}
				className="mt-2 w-full px-4 py-3 outline-none bg-crypto-bg-secondary rounded-xl border border-crypto-border-primary focus:border-crypto-brand-primary text-crypto-text-primary placeholder-crypto-text-tertiary transition-all duration-200 shadow-crypto"
				placeholder="Enter your price..."
			/>
		</motion.div>
	);
}
