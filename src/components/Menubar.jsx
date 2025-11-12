import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets";
import { OwnContext } from "../context/AppContext";

function Menubar() {
	const [openSideMenu, setOpenSideMenu] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const dropDownRef = useRef(null);
	const { user } = useContext(OwnContext);
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] px-4 py-4 sm:px-7 sticky top">
			{/* {Left side - menu button and title} */}

			<div className="flex items-center gap-5">
				<button
					className="block text-black lg:hidden hover:bg-gray-100 p-1 rounded transition-colors"
					onClick={() => setOpenSideMenu(!openSideMenu)}
				>
					{openSideMenu ? (
						<X size={24} className="text-2xl" />
					) : (
						<Menu size={24} className="text-2xl" />
					)}
				</button>

				<div className="flex items-center gap-2">
					<img
						src={assets.piggy_bank}
						alt="logo"
						className="h-10 w-10"
					/>
					<span className="text-lg font-medium text-black truncate">
						Cash Flow
					</span>
				</div>
			</div>

			{/* Right side  -Avatar photo*/}

			<div className="relative" ref={dropDownRef}>
				<button
					onClick={() => setShowDropdown(!showDropdown)}
					className="flex items-center justify-center w-10 h-10 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:ring-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2"
				>
					<User className="text-purple-500 w-6 h-6" />
				</button>

				{/* Dropdown Menu */}
				{showDropdown && (
					<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
						<div className="px-4 py-3 border-b border-gray-100">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
									<User className="text-purple-600 w-4 h-4" />
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
						</div>
					</div>
				)}
			</div>
			{/* Mobile side view  */}
			<span>Menubar Mobile Side</span>
		</div>
	);
}
export default Menubar;
