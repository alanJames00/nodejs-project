import Users from "./Users";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";



const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Users/>
			<LogoutButton />
		</div>
	);
};
export default Sidebar;