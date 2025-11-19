import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

function NotFound() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4">
			<div className="text-center">
				<div className="mb-8">
					<h1 className="text-9xl font-bold text-purple-600">404</h1>
					<div className="relative">
						<div className="absolute inset-0 flex items-center justify-center">
							<Search className="w-32 h-32 text-purple-200 animate-pulse" />
						</div>
					</div>
				</div>

				<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
					Page Not Found
				</h2>
				<p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
					Oops! The page you're looking for doesn't exist. It might
					have been moved or deleted.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						to="/"
						className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
					>
						<Home className="w-5 h-5" />
						Back to Home
					</Link>
					<Link
						to="/dashboard"
						className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors border-2 border-gray-300"
					>
						Go to Dashboard
					</Link>
				</div>

				<div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
					<Link
						to="/"
						className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
					>
						<p className="text-sm font-medium text-gray-600">
							Home
						</p>
					</Link>
					<Link
						to="/login"
						className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
					>
						<p className="text-sm font-medium text-gray-600">
							Login
						</p>
					</Link>
					<Link
						to="/signup"
						className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
					>
						<p className="text-sm font-medium text-gray-600">
							Sign Up
						</p>
					</Link>
					<Link
						to="/dashboard"
						className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
					>
						<p className="text-sm font-medium text-gray-600">
							Dashboard
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
