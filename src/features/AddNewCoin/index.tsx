import { useState } from 'react'
import { ReactComponent as Add } from '../../assets/add.svg'
import CreateCoinModal from './ui/CreateCoinModal/CreateCoinModal'

export default function AddNewCoin() {
	const [openModal, setOpenModal] = useState<boolean>(false)

	return (
		<>
			<button className='bg-myColor-650 w-[118px] h-[30px] rounded-[20px] text-white flex justify-center items-center gap-[2px]'
			onClick={() => setOpenModal(true)}>
				<Add/>
				Add new
			</button>
			{openModal && (
				<CreateCoinModal setOpenModal={setOpenModal}/>
			)}
		</>
	)
}