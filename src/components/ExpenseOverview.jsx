import { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../Util/util";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

function ExpenseOverview({ transactions, onAddExpense }) {
	const [chartData, setChartData] = useState([]);
	useEffect(() => {
		const result = prepareExpenseLineChartData(transactions);
		console.log("transactions >>>>>>>>>>>", transactions);
		console.log("result >>>>>>>>>>>", result);
		setChartData(result);
		return () => {};
	}, [transactions]);
	return (
		<div className="card">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
				<div>
					<h5 className="text-base sm:text-lg font-semibold">
						Expense Overview
					</h5>
					<p className="text-xs sm:text-sm text-gray-400 mt-0.5">
						Track your spending over time and analyze your expense
						trends.
					</p>
				</div>
				<button
					onClick={onAddExpense}
					className="add-btn text-sm sm:text-base"
				>
					<Plus size={16} className="sm:text-lg" />
					Add Expense
				</button>
			</div>

			<div className="mt-6 h-[350px] w-full">
				{/*Create Line Chart  */}
				<CustomLineChart data={chartData} />
			</div>
		</div>
	);
}
export default ExpenseOverview;
