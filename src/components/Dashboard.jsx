import { useContext } from "react";
import Menubar from "./Menubar";
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";

const Dashboard = ({ children, activeMenu }) => {
	const { user } = useContext(AppContext);
	return (
		<div className="bg-purple-50 h-screen flex flex-col">
			<Menubar activeMenu={activeMenu} />

			{user && (
				<div className="flex flex-1 overflow-hidden">
					<div className="max-[1020px]:hidden">
						{/* Side Menu Component can be placed here */}
						<Sidebar activeMenu={activeMenu} />
					</div>

					<div className="grow mx-5 bg-purple-50 rounded-lg overflow-y-auto">
						{children}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
