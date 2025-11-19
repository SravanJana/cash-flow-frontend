import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";
function Menubar() {
	const [openSideMenu, setOpenSideMenu] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const dropDownRef = useRef(null);
	const { user, clearUser } = useContext(AppContext);
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		setShowDropdown(false);
		clearUser();
		navigate("/login");
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropDownRef.current &&
				!dropDownRef.current.contains(event.target)
			) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showDropdown]);

	return (
		<div className="bg-white shadow-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-12 sm:h-16">
					{/* {Left side - menu button and title} */}
					<div className="flex items-center gap-3 sm:gap-5">
						<button
							className="block text-black lg:hidden hover:bg-gray-100 p-1 rounded transition-colors"
							onClick={() => setOpenSideMenu(!openSideMenu)}
						>
							{openSideMenu ? (
								<X size={20} className="sm:text-2xl" />
							) : (
								<Menu size={20} className="sm:text-2xl" />
							)}
						</button>

						<div className="flex items-center gap-1.5 sm:gap-2">
							<img
								src={assets.piggy_bank}
								alt="logo"
								className="w-6 h-6 sm:w-8 sm:h-8"
							/>
							<div>
								<span className="text-base sm:text-xl font-bold text-gray-900">
									Cash Flow
								</span>
								<p className="hidden sm:block text-xs text-gray-500 -mt-1">
									Smart Money Management
								</p>
							</div>
						</div>
					</div>

					{/* Right side  -Avatar photo*/}

					<div className="relative" ref={dropDownRef}>
						<button
							onClick={() => setShowDropdown(!showDropdown)}
							className="flex items-center justify-center w-10 h-10 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:ring-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2"
						>
							{user.profileImageUrl ? (
								<img
									src={user?.profileImageUrl}
									alt="Profile"
									className="w-10 h-10 rounded-full object-cover"
								/>
							) : (
								<User className="text-purple-500 w-6 h-6" />
							)}
						</button>

						{/* Dropdown Menu */}
						{showDropdown && (
							<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
								<div className="px-4 py-3 border-b border-gray-100">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
											{user.profileImageUrl ? (
												<img
													src={user?.profileImageUrl}
													alt="Profile"
													className="w-8 h-8 rounded-full object-cover"
												/>
											) : (
												<User className="text-purple-500 w-6 h-6" />
											)}
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-800 truncate">
												{user.fullName}
											</p>

											<p className="text-xs text-gray-500 truncate">
												{user.email}
											</p>
										</div>
									</div>

									{/* dropdown menu items */}
									<div className="py-1">
										<button
											onClick={handleLogout}
											className="flex items-center gap-3 w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
										>
											<LogOut className="w-4 h-4 text-gray-500 " />
											<span>Logout</span>
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			{/* Mobile side view  */}
			{openSideMenu && (
				<>
					{/* Backdrop overlay */}
					<div
						className="fixed inset-0 bg-black/50 lg:hidden z-40 top-16"
						onClick={() => setOpenSideMenu(false)}
					/>
					{/* Sidebar */}
					<div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-50 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg">
						<Sidebar onMenuClick={() => setOpenSideMenu(false)} />
					</div>
				</>
			)}
		</div>
	);
}
export default Menubar;
