"use client"

import { createContext, useContext, useState } from "react";
export const AuthContext = createContext<any>(null);

export const useAuthContext = () => {
	return useContext(AuthContext);
};





export const AuthContextProvider = ({ children }:any) => {
	// const [authUser, setAuthUser] = useState<any>(JSON.parse(localStorage.getItem("chat-user")) || null);
	const [authUser, setAuthUser] = useState<any>( null);

	
	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};

