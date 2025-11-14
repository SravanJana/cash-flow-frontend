import { use, useContext } from "react";
import Menubar from "./Menubar";
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";


const Dashboard = () => {
	const { user } = useContext(AppContext);
	return (
		<div>
			<Menubar />

			{user && (
				<div className="flex">
					<div className="max-[1080px]:hidden">
						{/* Side Menu Component can be placed here */}
                        <Sidebar/> 
					</div>
                    

					<div className="grow mx-5">Right Side Content Area</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
