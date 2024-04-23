import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
	return (
		
		<div className='flex h-full w-screen justify-center items-cen msger-chat'>
			<Sidebar />
			<MessageContainer />
		</div>
		
	);
};
export default Home;
