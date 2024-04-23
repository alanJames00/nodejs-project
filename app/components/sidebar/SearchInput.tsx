"use client"

import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../Zustand/useConversation";
import useGetUsers from "../../hooks/useGetUsers";
import toast from "react-hot-toast";

// const SearchInput = () => {
// 	const [search, setSearch] = useState("");
// 	const { setSelectedConversation }:any = useConversation();
// 	const { conversations } = useGetConversations();

// 	const handleSubmit = (e:any) => {
// 		e.preventDefault();
// 		if (!search) return;
// 		if (search.length < 3) {
// 			return toast.error("Search term must be at least 3 characters long");
// 		}

// 		const conversation = conversations.find((c:any) => c.fullName.toLowerCase().includes(search.toLowerCase()));

// 		if (conversation) {
// 			setSelectedConversation(conversation);
// 			setSearch("");
// 		} else toast.error("No such user found!");
// 	};
// 	return (
// 		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
// 			<input
// 				type='text'
// 				placeholder='Search…'
// 				className='input input-bordered rounded-full'
// 				value={search}
// 				onChange={(e) => setSearch(e.target.value)}
// 			/>
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>
// 	);
// };
// export default SearchInput;
const SearchInput = () => {
	return (
		<form className='flex items-center gap-2'>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full bg-[#ececec]' />
			<button type='submit' className='btn btn-circle bg-[#00C441] text-white hover:opacity-80'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;