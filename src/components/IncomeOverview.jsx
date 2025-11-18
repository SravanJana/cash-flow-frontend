import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../Util/util";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

function IncomeOverview({ transactions, onAddIncome }) {
	const [chartData, setChartData] = useState([]);
	useEffect(() => {
		const result = prepareIncomeLineChartData(transactions);
		console.log("transactions >>>>>>>>>>>", transactions);
		console.log("result >>>>>>>>>>>", result);
		setChartData(result);
		return () => {};
	}, [transactions]);
	return (
		<div className="card">
			<div className="flex items-center justify-between">
				<div>
					<h5 className="text-lg font-semibold">Income Overview</h5>
					<p className="text-sm text-gray-400 mt-0.5">
						Track your earnings over time and analyze your income
						trends.
					</p>
				</div>
				<button onClick={onAddIncome} className="add-btn">
					<Plus size={16} className="text-lg" />
					Add Income
				</button>
			</div>

			<div className="mt-6 h-[350px] w-full">
				{/*Create Line Chart  */}
				<CustomLineChart data={chartData} />
			</div>
		</div>
	);
}
export default IncomeOverview;
