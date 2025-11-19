import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

function Footer() {
	return (
		<footer className="bg-gray-900 text-white py-8 sm:py-12 mt-12 sm:mt-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
					{/* Brand Section */}
					<div className="col-span-1 md:col-span-2 text-center md:text-left">
						<div className="flex items-center gap-2 mb-3 sm:mb-4 justify-center md:justify-start">
							<img
								src={assets.piggy_bank}
								alt="Cash Flow"
								className="w-7 h-7 sm:w-8 sm:h-8"
							/>
							<span className="text-lg sm:text-xl font-bold">
								Cash Flow
							</span>
						</div>
						<p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 max-w-md mx-auto md:mx-0">
							Your trusted partner in financial management.
							Simplify your budgeting, track expenses, and achieve
							your financial goals with ease.
						</p>
						<div className="flex gap-3 sm:gap-4 justify-center md:justify-start">
							<a
								href="https://twitter.com/sravan9977"
								target="_blank"
								className="text-gray-400 hover:text-white transition-colors"
								aria-label="Twitter"
							>
								<Twitter className="w-5 h-5" />
							</a>
							<a
								target="_blank"
								href="https://www.linkedin.com/in/sravan-kumar-jana/"
								className="text-gray-400 hover:text-white transition-colors"
								aria-label="LinkedIn"
							>
								<Linkedin className="w-5 h-5" />
							</a>
							<a
								target="_blank"
								href="https://github.com/SravanJana"
								className="text-gray-400 hover:text-white transition-colors"
								aria-label="GitHub"
							>
								<Github className="w-5 h-5" />
							</a>
							<a
								target="_blank"
								href="mailto:sravanjana7@gmail.com"
								className="text-gray-400 hover:text-white transition-colors"
								aria-label="Email"
							>
								<Mail className="w-5 h-5" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className="text-center md:text-left">
						<h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
							Quick Links
						</h4>
						<ul className="space-y-2 text-gray-400">
							<li>
								<Link
									to="/"
									className="hover:text-white transition-colors"
								>
									Home
								</Link>
							</li>
							<li>
								<a
									href="#about"
									className="hover:text-white transition-colors"
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href="#features"
									className="hover:text-white transition-colors"
								>
									Features
								</a>
							</li>
							<li>
								<Link
									to="/login"
									className="hover:text-white transition-colors"
								>
									Login
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
