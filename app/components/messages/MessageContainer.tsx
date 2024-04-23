"use client"

import { useEffect } from "react";
import useConversation from "../../Zustand/useConversation";

import { useAuthContext } from "../../context/AuthContext";
import { MdOutlineFileUpload } from "react-icons/md";





const MessageContainer = () => {
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
		  <div className="msg left-msg">
			<div
			  className="msg-img"
			  style={{
				backgroundImage:
				  "url(https://robohash.org/b4b0d284f9f15c440e14ec6677834450?set=set4&bgset=&size=400x400)",
			  }}
			></div>
  
			<div className="msg-bubble">
			  <div className="msg-info">
				<div className="msg-info-name">user</div>
				<div className="msg-info-time">12:45</div>
			  </div>
  
			  <div className="msg-text">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, obcaecati.. 😄
			  </div>
			</div>
		  </div>
  
		  <div className="msg right-msg">
			<div
			  className="msg-img"
			  style={{
				backgroundImage:
				  "url(https://image.flaticon.com/icons/svg/145/145867.svg)",
			  }}
			></div>
  
			<div className="msg-bubble">
			  <div className="msg-info">
				<div className="msg-info-name">ME</div>
				<div className="msg-info-time">12:46</div>
			  </div>
  
			  <div className="msg-text">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, sunt.
			  </div>
			</div>
		  </div>
		</main>
  
		<form className="msger-inputarea">
		  <input
			type="text"
			className="msger-input focus:outline-none relative"
			placeholder="Enter your message..."
		  />
		  <button className="  flex items-center justify-center"><MdOutlineFileUpload className="h-10 w-10"/></button>
		  


		  <button type="submit" className="msger-send-btn rounded-lg">
			Send
		  </button>
		
		</form>
	  </section>
	);
};
export default MessageContainer;

