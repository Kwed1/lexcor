import { ReactComponent as Search } from '../../../assets/search.svg'
interface Props {
	setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function AdminSearchUser({setSearch}:Props) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setSearch(e.target.value);
	};
	return (
		<div className='h-[30px] rounded-[15px] bg-white items-center flex gap-1 px-2'>
		<Search/>
		<input type="text"
		className='w-[100px] bg-transparent outline-none text-sm'
		placeholder='search user'
		onChange={handleChange}
		/>
		</div>
	)
}