import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Landing() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
				<div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
				<div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
			</div>

			<Navbar />

			{/* Hero Section */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative">
				{/* Decorative background elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
					<div className="absolute top-0 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
					<div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
				</div>
				<div className="text-center max-w-4xl mx-auto fade-in relative z-10">
					{/* <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight px-2"> */}
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold  mb-4 sm:mb-6 leading-tight px-2">
						Take Control of Your Finances
					</h1>
					<p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2">
						Your foundation for secure, intelligent financial
						management. Effortlessly track your income and expenses
						to achieve your financial goals.
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
						<Link
							to="/signup"
							className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors shadow-lg hover:shadow-xl text-center"
						>
							Start Tracking for Free
						</Link>
					</div>
				</div>
			</section>

			{/* Dashboard Preview Section */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 fade-in-delay-1">
				<div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl overflow-hidden border border-purple-50">
					<img
						src={assets.home_image}
						alt="Dashboard Preview"
						className="w-full h-auto object-cover"
					/>
				</div>
			</section>

			{/* Features Section */}
			<section
				id="features"
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 fade-in-delay-2"
			>
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
					Key Features
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
					<div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-50 hover:border-purple-100 hover:-translate-y-1">
						<div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg
								className="w-8 h-8 text-purple-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							Track Expenses
						</h3>
						<p className="text-gray-600">
							Monitor your spending habits and stay within budget
							effortlessly
						</p>
					</div>

					<div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-50 hover:border-green-100 hover:-translate-y-1">
						<div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg
								className="w-8 h-8 text-green-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							Manage Income
						</h3>
						<p className="text-gray-600">
							Keep track of all your income sources in one place
						</p>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section
				id="about"
				className="bg-gradient-to-br from-white via-purple-50 to-blue-50 py-12 sm:py-16 md:py-20 fade-in-delay-3"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
						<div>
							<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
								About Cash Flow
							</h2>
							<p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">
								Cash Flow is a modern financial management
								platform designed to help individuals take
								control of their money. We believe that everyone
								deserves access to powerful financial tools,
								regardless of their background.
							</p>
							<p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
								Our mission is to simplify personal finance by
								providing intuitive tools that make tracking
								income, expenses, and budgets effortless. With
								beautiful visualizations and actionable
								insights, you'll always know where your money is
								going.
							</p>
						</div>
						<div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-white mt-8 md:mt-0">
							<h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
								Why Choose Cash Flow?
							</h3>
							<ul className="space-y-4">
								<li className="flex items-start gap-3">
									<span className="text-2xl">✓</span>
									<div>
										<h4 className="font-semibold mb-1">
											Simple & Intuitive
										</h4>
										<p className="text-purple-100">
											Easy to use interface designed for
											everyone
										</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-2xl">✓</span>
									<div>
										<h4 className="font-semibold mb-1">
											Secure & Private
										</h4>
										<p className="text-purple-100">
											Your financial data is encrypted and
											protected
										</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-2xl">✓</span>
									<div>
										<h4 className="font-semibold mb-1">
											Real-time Insights
										</h4>
										<p className="text-purple-100">
											Get instant updates on your
											financial health
										</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-2xl">✓</span>
									<div>
										<h4 className="font-semibold mb-1">
											Free to Start
										</h4>
										<p className="text-purple-100">
											No credit card required, start
											tracking today
										</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 relative overflow-hidden">
				{/* Decorative elements */}
				<div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none"></div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
						Ready to Take Control of Your Finances?
					</h2>
					<p className="text-base sm:text-lg md:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
						Join users who are managing their money smarter with
						Cash Flow.
					</p>
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
						<Link
							to="/signup"
							className="bg-white text-purple-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
						>
							Get Started Free
						</Link>
						<Link
							to="/login"
							className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-500 transition-colors text-center"
						>
							Sign In
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

export default Landing;
