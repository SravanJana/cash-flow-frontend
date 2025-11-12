import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const OwnContext  = createContext();

export default function AppContextProvider({children}) {

    const [user, setUser] = useState(() => {
        // Load user from localStorage on initial render
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

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
