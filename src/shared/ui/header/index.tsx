import { useNavigate } from 'react-router-dom'
import { ReactComponent as Arrow } from '../../../assets/arrow-right.svg'
import TrxToUsdt from '../../../features/TrxToUsdt'
import useWalletStore from '../../store/WalletStore'

export default function Header() {
	const navigate = useNavigate()
	const {trx, usdt} = useWalletStore()
	return (
		<>
			<header className='w-full h-auto flex justify-center items-center'>
				<div className='bg-crypto-bg-secondary h-full w-full p-3 rounded-3xl flex flex-col shadow-crypto-lg border border-crypto-border-primary'>
					<div className='flex w-full justify-between items-center border-b border-crypto-border-primary pb-2'>
						<div className='flex items-center gap-2'>
						<div className='inset-0 bg-crypto-brand-primary rounded w-[14px] h-[14px]'/>
						<p className='font-bold text-crypto-text-primary'>Coin</p>
						</div>

						<button className='bg-crypto-info bg-opacity-20 hover:bg-opacity-30 rounded-lg px-3 py-1 flex gap-[3px] items-center justify-center transition-all' onClick={() => navigate('/createDeal')}>
							<p className='text-[11px] text-crypto-info font-semibold'>create deal</p>
							<Arrow className='fill-crypto-info'/>
						</button>
					</div>

					<div className='mt-3'>
						<div className='flex w-full justify-between items-center'>
							<div>
								<p className='font-bold text-2xl text-crypto-text-primary'>${usdt}</p>
								<p className='font-medium text-crypto-text-tertiary'>{trx} TRX</p>
							</div>
							<div>
								<TrxToUsdt/>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}