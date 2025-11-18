import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function Sidebar({ activeMenu }) {
	const { user } = useContext(AppContext);
	const navigate = useNavigate();
	return (
		<div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">
			<div className=" flex flex-col items-center justify-center gap-2 mt-3 mb-7">
				{user?.profileImageUrl ? (
					<img
						src={user?.profileImageUrl}
						alt="Profile"
						className="w-20 h-20 bg-slate-400 rounded-full object-cover"
					/>
				) : (
					<User className="w-20 h-20 text-purple-400 text-xl border-2 border-purple-400 rounded-full p-3 " />
				)}
				<h5 className="text-gray-950 font-medium text-xl leading-6 ">
					{user?.fullName}
				</h5>
			</div>

			{/* Sidebar Menu Items */}
			{SIDE_BAR_DATA.map((item, index) => (
				<button
					onClick={() => navigate(item.path)}
					key={`menu_${index}`}
					className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer ${
						activeMenu === item.label
							? "bg-purple-100 text-purple-700 font-medium"
							: "text-gray-700 hover:bg-gray-100 transition-colors"
					}`}
				>
					<item.icon className="text-xl" />
					{item.label}
				</button>
			))}
		</div>
	);
}
export default Sidebar;
