import { useTokenStore } from '../../shared/store/TokenStore';

interface Props {
   setPriceTo: React.Dispatch<React.SetStateAction<number>>
}

export default function Amount({setPriceTo}:Props) {
    const {getCurrency} = useTokenStore()
    const coin = getCurrency()
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeout(() => {
            setPriceTo(Number(e.target.value))
        }, 500);
    };
    

	return (
		<div className='w-[95px] h-[38px] py-[3px] px-3 bg-crypto-bg-secondary rounded-2xl flex flex-col justify-center shadow-crypto border border-crypto-border-primary'>
        <p className='text-[12px] m-0 leading-none pb-[3px] text-crypto-text-tertiary'>Amount</p>
        <div className='flex items-center gap-1'>
            <div className='h-[14px] flex items-center'>
                <input
                    type="number"
                    className='w-[36px] h-[14px] outline-none rounded text-[16px] text-left pb-[2px] bg-transparent border-none text-crypto-text-secondary'
                    onChange={(e) => handleChangeInput(e)}
                />
                <p className='text-[16px] m-0 leading-none pb-[2px] text-crypto-text-secondary'>{coin}</p>
            </div>
            
        </div>
</div>


	)
}