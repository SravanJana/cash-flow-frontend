import { addThousandsSeparator } from "../Util/util";
import CustomPieChart from "./CustomPieChart";

function FinanceOverview({ totalBalance, totalIncome, totalExpense }) {
	const COLORS = ["#4F46E5", "#10B981", "#EF4444"];

	const balanceData = [
		{ name: "Total Balance", amount: totalBalance, color: COLORS[0] },
		{ name: "Total Income", amount: totalIncome, color: COLORS[1] },
		{ name: "Total Expense", amount: totalExpense, color: COLORS[2] },
	];
	return (
		<div className="card">
			<div className="flex items-center justify-between">
				<h5 className="text-lg">Financial Overview</h5>
			</div>

			<CustomPieChart
				data={balanceData}
				label="Total Balance"
				colors={COLORS}
				totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
                showTextAnchor
			/>
		</div>
	);
}
export default FinanceOverview;
