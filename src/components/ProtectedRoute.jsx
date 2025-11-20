import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function ProtectedRoute({ children }) {
	const { user } = useContext(AppContext);
	const navigate = useNavigate();
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");

		// If no user and no token, redirect to login
		if (!user && !token) {
			navigate("/login", { replace: true });
		} else {
			setIsChecking(false);
		}
	}, [user, navigate]);

	// Show loading state while checking authentication
	if (isChecking && !user) {
		return null;
	}

	// If no user data after checking, don't render children
	if (!user) {
		return null;
	}

	return children;
}

export default ProtectedRoute;
