"use client"

import { useEffect, useState } from "react";
import useConversation from "../../Zustand/useConversation";

import { useAuthContext } from "../../context/AuthContext";
import { MdOutlineFileUpload } from "react-icons/md";

import ChatFileUploader from "../../home/fileUploader";


const MessageContainer = ({ ws, myUsername, messageArray  }: any) => {

	const [messageText, setMessageText] = useState('');

	const handleSubmit = (e: any) => {
		e.preventDefault();

		// Don't send empty messages
		if (!messageText.trim()) {
			return;
		}

		// Construct the message object
		const message = {
			type: 'message',
			message: messageText,
		};

		ws.send(JSON.stringify(message));

		// Clear the message input field
		setMessageText('');
	};

	console.log("messageArray", messageArray);

	return (
		<section className="msger">
			<header className="msger-header">
				<div className="msger-header-title">
					<i className="fas fa-comment-alt"></i> SimpleChat
				</div>
				<div className="msger-header-options">
					<span>
						<i className="fas fa-cog"></i>
					</span>
				</div>
			</header>

			<main className="msger-chat">


				{messageArray.map((message: any, idx: any) => (
					<div key={idx} className={`msg ${message.sender === myUsername ? 'right-msg' : 'left-msg'}`}>
						<div
							className="msg-img"
							style={{
								backgroundImage: `url(https://robohash.org/${message.sender}?set=set4&bgset=&size=400x400)`,
							}}
						></div>
						<div className="msg-bubble">
							<div className="msg-info">
								<div className="msg-info-name">{message.sender}</div>
								<div className="msg-info-time">{message.time}</div>
							</div>
							{message.type === 'file' ? (
								<div className="msg-text">
									{/* Render file download link */}
									<a href={message.downloadUrl} target="_blank" rel="noopener noreferrer">{message.filename}</a>
								</div>
							) : (
								<div className="msg-text">{message.message}</div>
							)}
						</div>
					</div>
				))}


				
			</main>

			<form className="msger-inputarea">
				<input
					value={messageText}
					onChange={(e) => setMessageText(e.target.value)}
					type="text"
					className="msger-input focus:outline-none relative"
					placeholder="Enter your message..."
				/>
				<button className="  flex items-center justify-center"><MdOutlineFileUpload className="h-10 w-10" /></button>

				<ChatFileUploader ws={ws} />

				<button type="submit"
					onClick={handleSubmit}
					className="msger-send-btn rounded-lg">
					Send
				</button>

			</form>
		</section>
	);
};
export default MessageContainer;

