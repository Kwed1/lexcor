import Spinner from '../../assets/spinner.svg'
interface Props {
	handleClick: () => void
	loading: boolean
}

export default function CreateDealButton({handleClick, loading}:Props) {
	return (
		<button className={`w-full h-[44px] text-white gap-1 flex items-center justify-center ${loading ? 'bg-crypto-text-tertiary cursor-not-allowed' : 'bg-crypto-brand-primary hover:bg-crypto-brand-secondary'} text-lg font-semibold rounded-[30px] shadow-crypto transition-all`} onClick={() => handleClick()} disabled={loading}>
			{loading && <img src={Spinner} alt='spinner' className={'w-[40px] h-[40px]'}/>}
			Create Deal
		</button>
	)
}