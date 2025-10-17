interface Props {
  valute: string,
	amount: string | number
}

export default function PriceRange({valute, amount}:Props) {
	return (
		<div className='py-3 px-2 bg-crypto-bg-secondary rounded-3xl flex items-center justify-center gap-1 font-bold w-full shadow-crypto border border-crypto-border-primary'>
				<p className='text-crypto-text-primary'>{amount}</p>
				<p className='text-crypto-text-secondary'>{valute}</p>
		</div>
	)
}