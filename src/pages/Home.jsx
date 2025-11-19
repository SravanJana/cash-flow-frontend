import { Coins, Wallet, WalletCards } from "lucide-react";
import Dashboard from "../components/Dashboard";
import InfoCard from "../components/InfoCard";
import { addThousandsSeparator } from "../Util/util";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";
function Home() {
	const navigate = useNavigate();
	const [DashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchDashboardData = async () => {
		setLoading(true);

		try {
			const response = await axiosConfig.get(
				API_ENDPOINTS.DASHBOARD_DATA
			);
			if (response.status === 200) {
                console.log('Dashboard Data',response.data)
				setDashboardData(response.data);
			}
		} catch (error) {
			console.error("Error fetching dashboard data:", error);
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDashboardData();
		return () => {};
	}, []);
	return (
		<div>
			<Dashboard activeMenu="Dashboard">
				<div className="my-3 sm:my-5 mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
						{/* {Display the cards} */}
						<InfoCard
							icon={<WalletCards />}
							label="Total Balance"
							value={addThousandsSeparator(
								DashboardData?.totalBalance || 0
							)}
							color="bg-purple-800"
						/>

						<InfoCard
							icon={<Wallet />}
							label="Total Income"
							value={addThousandsSeparator(
								DashboardData?.totalIncome || 0
							)}
							color="bg-green-800"
						/>

						<InfoCard
							icon={<Coins />}
							label="Total Expense"
							value={addThousandsSeparator(
								DashboardData?.totalExpense || 0
							)}
							color="bg-red-800"
						/>
					</div>
					<div className=" grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
						{/* Recent Transactions */}
						<RecentTransactions
							transactions={DashboardData?.recentTransactions}
							onMore={() => navigate("/expense")}
						/>

						{/* Finance Overview Chart */}

						<FinanceOverview
							totalBalance={DashboardData?.totalBalance || 0}
							totalIncome={DashboardData?.totalIncome || 0}
							totalExpense={DashboardData?.totalExpense || 0}
						/>

						{/*  Income Transactions */}
						<Transactions
							transactions={DashboardData?.recent5Incomes || []}
							onMore={() => navigate("/income")}
							type="income"
							title="Recent Incomes"
						/>
						{/* Expense Transactions */}
						<Transactions
							transactions={DashboardData?.recent5Expenses || []}
							onMore={() => navigate("/expense")}
							type="expense"
							title="Recent Expenses"
						/>
					</div>
				</div>
			</Dashboard>
		</div>
	);
}

export default Home;
