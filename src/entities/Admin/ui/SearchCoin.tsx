import { ReactComponent as Search } from '../../../assets/search.svg'
interface Props {
	setSearch: React.Dispatch<React.SetStateAction<string>>
}
export default function AdminSearchCoin({setSearch}:Props) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<div className='h-[30px] rounded-[15px] items-center flex gap-1 px-2 justify-center bg-white'>
		<Search/>
		<input type="text"
		className='bg-transparent w-1/4 outline-none text-sm'
		placeholder={`Search coin`}
		onChange={handleChange}
		/>
		</div>
	)
}