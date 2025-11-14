import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function ProtectedRoute({ children }) {
	const { user } = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");

		// If no user and no token, redirect to login
		if (!user && !token) {
			navigate("/login", { replace: true });
		}
	}, [user, navigate]);

	// If no user data, don't render children
	if (!user) {
		return null;
	}

	return children;
}

export default ProtectedRoute;
