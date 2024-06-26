import Users from "./Users";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";



const Sidebar = ({ activeUsers }) => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<h2 className=" text-4xl">Active Users</h2>
			<Users activeUsers={activeUsers}/>
			<LogoutButton />
		</div>
	);
};
export default Sidebar;