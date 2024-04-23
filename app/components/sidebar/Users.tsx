"use client"
import { AnyCnameRecord } from "dns";
import useGetUsers from "../../hooks/useGetUsers";
import { getRandomEmoji } from "../../utils/emoji";
import User from "./User";

// const Conversations = () => {
// 	const { loading, conversations } = useGetConversations();
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			{conversations.map((conversation:any, idx:any) => (
// 				<Conversation
// 					key={conversation._id}
// 					conversation={conversation}
// 					emoji={getRandomEmoji()}
// 					lastIdx={idx === conversations.length - 1}
// 				/>
// 			))}


// 			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
// 		</div>
// 	);
// };
// export default Conversations;


const Users = ({ activeUsers }: any) => {
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{activeUsers.map((user: any) => (
				<User key={user} username={user} />
			))}
		</div>
	);
};
export default Users;
