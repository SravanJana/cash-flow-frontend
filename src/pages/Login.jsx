import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import axiosConfig from "../Util/axiosConfig.jsx";
import { AppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import { validateEmail } from "../Util/validation.js";
import { LoaderCircle } from "lucide-react";

function Login() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const { setUser } = useContext(AppContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		// Add login logic here
		if (!validateEmail(email)) {
			setError("Please enter a valid email");
			setLoading(false);
			return;
		}
		if (!password.trim()) {
			setError("Password is required");
			setLoading(false);
			return;
		}
		setError("");

		try {
			const response = await axiosConfig.post("/login", {
				email: email,
				password: password,
			});

			const { token, User } = response.data;
			if (token) {
				localStorage.setItem("token", token);
				setUser(User);
                console.log(`User Data ` +  User)
				navigate("/dashboard");
			}
		} catch (error) {
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				setError(error.response.data.message);
			} else {
				console.error("Something went wrong", error);
				setError(error.message || "Login failed. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
			{/* Background image (place file in src/assets, e.g., background.jpg) */}
			<img
				src={assets.login_bg}
				alt="Background"
				className="absolute inset-0 w-full h-full object-cover  filter blur-xs object-bottom-right"
			/>

			<div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[95vh] overflow-y-auto">
				<h3 className="text-2xl font-semibold text-black text-center mb-2">
					Welcome Back
				</h3>
				<p className="text-sm text-slate-700 text-center mb-8">
					Please enter your credentials to access your account.
				</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="fullname@example.com"
						label="Email Address"
						type="text"
					/>

					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="********"
						label="Password"
						type="password"
					/>
					{error && (
						<p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
							{error}
						</p>
					)}
					<button
						className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						} bg-purple-500 rounded-xl hover:bg-purple-600 transition-colors text-white`}
						type="submit"
						disabled={loading}
					>
						{loading ? (
							<>
								<LoaderCircle className="animate-spin w-5 h-5" />
								LOGGING IN...
							</>
						) : (
							"LOG IN"
						)}
					</button>
					<p className="text-sm text-slate-800 text-center mt-6">
						Don't have an account?
						<Link
							to="/signup"
							className="font-medium text-primary underline hover:text-primary-dark transition-colors"
						>
							Sign Up
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Login;
