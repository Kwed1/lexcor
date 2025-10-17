import { useState } from 'react'
import Pino from '../../assets/pino.jpg'
import Deposit from '../../features/Deposit'
import useWalletStore from '../../shared/store/WalletStore'
import ModalOfWithdraw from './components/ui/ModalOfWithdraw'

export default function WalletHeader() {
	const [withdrawModal, setWithdrawModal] = useState<boolean>(false)
	function formatLargeNumber(number:number) {
    if (number >= 1e12) {
        return (number / 1e12).toFixed(1) + "T";
    } else if (number >= 1e9) {
        return (number / 1e9).toFixed(1) + "B";
    } else {
        return number.toFixed(3);
    }
	}
	const {pino} = useWalletStore()
	let formatted_balance = formatLargeNumber(pino)
	return (
		<>
		<div className='bg-crypto-bg-secondary flex flex-col gap-3 p-5 rounded-3xl shadow-crypto-lg border border-crypto-border-primary'>
		<div className='flex items-center justify-center relative'>
			<div className='flex items-center gap-2'>
				<img src={Pino} className='w-[34px] rounded-full shadow-crypto' />
				<p className='text-[20px] font-bold text-crypto-text-primary'>PINO</p>
			</div>
			<button 
				className='absolute right-0 bg-crypto-danger hover:bg-crypto-danger-hover text-[14px] text-white py-2 px-4 font-semibold rounded-xl transition-all shadow-crypto hover:scale-105'
				onClick={() => setWithdrawModal(true)}
			>
				Withdraw
			</button>
		</div>
		<p className='text-center text-[35px] font-bold text-crypto-brand-primary'>
			{formatted_balance}
		</p>
		<Deposit />
	</div>
	{withdrawModal && <ModalOfWithdraw setWithdrawModal={setWithdrawModal}/>}
	</>
	)
}