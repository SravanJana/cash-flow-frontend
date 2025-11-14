import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
	const [user, setUser] = useState(() => {
		// Initialize user from localStorage if available
		const savedUser = localStorage.getItem("user");
		return savedUser ? JSON.parse(savedUser) : null;
	});

	const updateUser = (userData) => {
		setUser(userData);
		if (userData) {
			localStorage.setItem("user", JSON.stringify(userData));
		} else {
			localStorage.removeItem("user");
		}
	};

	const clearUser = () => {
		setUser(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	};

	const contextValue = {
		user,
		setUser: updateUser,
		clearUser,
	};

	return (
		<AppContext.Provider value={contextValue}>
			{children}
		</AppContext.Provider>
	);
}
