import { motion } from 'framer-motion';

interface Props {
	setMinSug: React.Dispatch<React.SetStateAction<string | number>>;
	minSug: string | number;
	maxSug: string | number;
	setMaxSug: React.Dispatch<React.SetStateAction<string | number>>;
}

export default function ModalOfSuggest({
	setMinSug,
	setMaxSug,
	minSug,
	maxSug,
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
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className='bg-crypto-bg-tertiary p-4 rounded-xl border border-crypto-border-primary shadow-crypto-lg mt-4'
		>
			<p className="text-sm ml-1 text-crypto-text-secondary font-medium">Minimum price of coin:</p>
			<input
				type="text"
				value={minSug}
				onChange={(e) => handleNumberInput(e, setMinSug)}
				className="mt-2 w-full px-3 py-2 outline-none bg-crypto-bg-secondary rounded-lg border border-crypto-border-primary focus:border-crypto-brand-primary text-crypto-text-primary placeholder-crypto-text-tertiary transition-all duration-200"
				placeholder="Min price"
			/>
			<p className="mt-4 text-sm ml-1 text-crypto-text-secondary font-medium">Maximum price of coin:</p>
			<input
				type="text"
				value={maxSug}
				onChange={(e) => handleNumberInput(e, setMaxSug)}
				className="mt-2 w-full px-3 py-2 outline-none bg-crypto-bg-secondary rounded-lg border border-crypto-border-primary focus:border-crypto-brand-primary text-crypto-text-primary placeholder-crypto-text-tertiary transition-all duration-200"
				placeholder="Max price"
			/>
		</motion.div>
	);
}
