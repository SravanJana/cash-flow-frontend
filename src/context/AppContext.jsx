import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const OwnContext = createContext();

export default function AppContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const contextValue = {
		user,
		setUser,
	};

	return (
		<OwnContext.Provider value={contextValue}>
			{children}
		</OwnContext.Provider>
	);
}
