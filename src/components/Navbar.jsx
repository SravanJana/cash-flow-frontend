import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

function Navbar() {
	return (
		<nav className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link to="/" className="flex items-center gap-2">
						<img
							src={assets.piggy_bank}
							alt="Cash Flow Logo"
							className="w-7 h-7 sm:w-8 sm:h-8"
						/>
						<div>
							<span className="text-lg sm:text-xl font-bold text-gray-900">
								Cash Flow
							</span>
							<p className="text-[10px] sm:text-xs text-gray-500 -mt-1 hidden sm:block">Smart Money Management</p>
						</div>
					</Link>
					{/* Navigation Links */}
					<div className="hidden md:flex items-center gap-8">
						<Link
							to="/"
							className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
						>
							Home
						</Link>
						<a
							href="#features"
							className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
						>
							Features
						</a>
						<a
							href="#about"
							className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
						>
							About
						</a>
					</div>{" "}
					{/* Auth Buttons */}
					<div className="flex items-center gap-2 sm:gap-4">
						<Link
							to="/login"
							className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm sm:text-base"
						>
							Login
						</Link>
						<Link
							to="/signup"
							className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
						>
							Get Started
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
