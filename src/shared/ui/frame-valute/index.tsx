
import CryptoIcon from '../CryptoIcon'

interface Props {
	Image?: string,
	valute: string,
	amount: number | string
}

export default function FrameValute({Image, valute, amount}:Props) {
	return (
		<>
		<div className='bg-crypto-bg-secondary p-3 rounded-xl flex flex-col gap-2 shadow-crypto border border-crypto-border-primary hover:bg-crypto-bg-hover transition-colors'>
			<div className='flex gap-2 items-center'>
			{Image ? (
				<img src={Image} alt="" className='w-6 h-6 rounded-full' />
			) : (
				<CryptoIcon token={valute} size="sm" />
			)}
			<p className='text-lg font-medium text-crypto-text-secondary'>{valute}</p>
			</div>
			<p className='text-xl font-bold ml-1 text-crypto-brand-primary'>{amount}</p>
		</div>
		</>
	)
}