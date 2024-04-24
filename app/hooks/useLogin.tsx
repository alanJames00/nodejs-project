import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { redirect } from 'next/navigation'


const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username:any, roomName:any) => {
		const success = handleInputErrors(username, roomName);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch(`https://c-api.linkzip.co/chat/createChat`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, roomName }),
			});

			const data = await res.json();
			console.log(data);
			if (data.error) {
				alert(data.err);
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user-token", data.token);
			localStorage.setItem("chat-user", username);

			// redirect to the home page
			window.location.href = "/home";
			setAuthUser(data);
		} catch (error:any) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(username:any, password:any) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}
