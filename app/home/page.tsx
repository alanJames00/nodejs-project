'use client'
import { log } from "console";
import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";
import { useState, useEffect, use } from 'react';

const Home = () => {

	const [ws, setWs] = useState<any>(null);
	const [myUsername, setMyUsername] = useState<any>(null);
	const [activeUsers, setActiveUsers] = useState<any>([]);
	const [messages, setMessages] = useState<any>([]);
	const [fileMessages, setFileMessages] = useState<any>([]);

	// check if the user has the token
	
	useEffect(() => {
		const token = localStorage.getItem("chat-user-token");
		if (!token) {
			window.location.href = "/login";
		}
		console.log("token", token);

		// get the username from local storage
		const username = localStorage.getItem("chat-user");
		setMyUsername(username);
		// connect to the websocket server
		const socket = new WebSocket(`ws://localhost:8080?token=${token}`);
		socket.onopen = () => {
			console.log("connected to the server");
		};

		

		socket.onmessage = (message: any) => {
			
			// parse the message
			console.log("message", message.data);
			const parsedMessage = JSON.parse(message.data);
			
			// handle various message types
			if(parsedMessage.type === "active_users"){
				console.log("recieved active users", parsedMessage.users);
				setActiveUsers(parsedMessage.users);
			}

			else if(parsedMessage.type === "message"){
				setMessages((prevMessages: any) => [...prevMessages, parsedMessage]);
			}

			else if(parsedMessage.type === "file"){
				// setFileMessages((prevFileMessages: any) => [...prevFileMessages, parsedMessage]);
				setMessages((prevMessages: any) => [...prevMessages, parsedMessage]);
			}
			
		};
		

		// set the state
		setWs(socket);
	}, []);
	
	console.log("ws state", ws);

	console.log("active users", activeUsers);

	console.log("username fetched from local storage", myUsername);

	console.log("messages", messages);

	return (
		
		<div className='flex h-full w-screen justify-center items-cen msger-chat'>
			<Sidebar activeUsers={activeUsers} />
			<MessageContainer ws={ws} myUsername={myUsername} messageArray={messages} fileMessages={fileMessages}/>


		</div>
		
	);
};
export default Home;
