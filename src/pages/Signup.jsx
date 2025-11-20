import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import { validateEmail } from "../Util/validation.js";
import axiosConfig from "../Util/axiosConfig.jsx";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../Util/uploadProfileImage.js";
import { API_ENDPOINTS } from "../Util/apiEndpoints.js";
import Navbar from "../components/Navbar.jsx";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { AppContext } from "../context/AppContext.jsx";

function Signup() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [profilePhoto, setProfilePhoto] = useState(null);

	const navigate = useNavigate();
	const { setUser } = useContext(AppContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let profileImageUrl = "";
		if (!fullName.trim()) {
			setError("Full Name is required");
			setLoading(false);
			return;
		}
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
			if (profilePhoto) {
				const imageUrl = await uploadProfileImage(profilePhoto);
				profileImageUrl = imageUrl || "";
			}
			const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
				fullName: fullName,
				email: email,
				password: password,
				profileImageUrl: profileImageUrl,
			});
			if (response.status === 201) {
				toast.success("Profile created successfully!");
				navigate("/login");
			}
		} catch (error) {
			console.error("Something went wrong", error);
			setError(error.message || "Registration failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignupSuccess = async (credentialResponse) => {
		setLoading(true);
		setError("");

		try {
			// Send the Google ID token to your backend
			const response = await axiosConfig.post(API_ENDPOINTS.GOOGLE_AUTH, {
				credential: credentialResponse.credential,
			});

			const { token, user } = response.data;
			if (token) {
				localStorage.setItem("token", token);
				setUser(user);
				toast.success("Successfully signed up with Google!");
				navigate("/dashboard");
			}
		} catch (error) {
			console.error("Google signup error:", error);
			setError(
				error.response?.data?.error ||
					"Google signup failed. Please try again."
			);
			toast.error("Google signup failed");
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignupError = () => {
		setError("Google signup failed. Please try again.");
		toast.error("Google signup failed");
	};

	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<div className="min-h-screen w-full relative">
				{/* Background Image */}
				<img
					src={assets.login_bg}
					alt="Background"
					className="absolute inset-0 w-full h-full object-cover filter blur-xs object-bottom-right"
				/>

				{/* Content Overlay */}
				<div className="relative z-10">
					<Navbar />

					{/* Signup Form Section */}
					<div className="flex items-center justify-center px-4 py-8 sm:py-12 min-h-[calc(100vh-4rem)]">
						<div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-2xl">
							<h3 className="text-xl sm:text-2xl font-semibold text-black text-center mb-2">
								Create An Account
							</h3>
							<p className="text-sm text-slate-700 text-center mb-8">
								Start tracking you spending by joining with us.
							</p>
							<form onSubmit={handleSubmit} className="space-y-4">
								{/* Google Signup Button */}
								<div className="flex justify-center">
									<GoogleLogin
										onSuccess={handleGoogleSignupSuccess}
										onError={handleGoogleSignupError}
										size="large"
										text="signup_with"
										theme="outline"
										shape="rectangular"
										logo_alignment="left"
									/>
								</div>

								{/* Divider */}
								<div className="relative flex items-center justify-center my-6">
									<div className="border-t border-gray-300 flex-grow"></div>
									<span className="px-4 text-sm text-gray-500">
										OR
									</span>
									<div className="border-t border-gray-300 flex-grow"></div>
								</div>

								<div className="flex justify-center mb-6">
									<ProfilePhotoSelector
										image={profilePhoto}
										setImage={setProfilePhoto}
									/>
								</div>
								<div className="grid grid-cols-2 md:grid-cols-2 gap-4">
									<Input
										value={fullName}
										onChange={(e) =>
											setFullName(e.target.value)
										}
										placeholder="Full Name"
										label="Full Name"
										type="text"
									/>
									<Input
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										placeholder="name@example.com"
										label="Email Address"
										type="text"
									/>

									<div className="col-span-2">
										<Input
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											placeholder="********"
											label="Password"
											type="password"
										/>
									</div>
								</div>
								{error && (
									<p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
										{error}
									</p>
								)}
								<button
									className={`btn-primary w-full py-2.5 sm:py-3 text-base sm:text-lg font-medium flex items-center justify-center gap-2 ${
										loading
											? "opacity-50 cursor-not-allowed"
											: ""
									} bg-purple-500 rounded-xl hover:bg-purple-600 transition-colors text-white`}
									type="submit"
									disabled={loading}
								>
									{loading ? (
										<>
											<LoaderCircle className="animate-spin w-5 h-5" />
											SIGNING UP...
										</>
									) : (
										"SIGN UP"
									)}
								</button>

								<p className="text-sm text-slate-800 text-center mt-6">
									Already have an account?
									<Link
										to="/login"
										className="font-medium text-primary underline hover:text-primary-dark transition-colors"
									>
										LogIn
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</GoogleOAuthProvider>
	);
}

export default Signup;
