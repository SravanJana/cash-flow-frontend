import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useState } from "react";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import toast from "react-hot-toast";
import moment from "moment";
import TransactionInfoCard from "../components/TransactionInfoCard";

function Filter() {
	const [type, setType] = useState("expense");
	const [startDate, setStartDate] = useState(() => {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), 1)
			.toISOString()
			.split("T")[0];
	});
	const [endDate, setEndDate] = useState(() => {
		return new Date().toISOString().split("T")[0];
	});
	const [keyword, setKeyword] = useState("");
	const [sortField, setSortField] = useState("date");
	const [sortOrder, setSortOrder] = useState("asc");

	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleSearch = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axiosConfig.post(
				API_ENDPOINTS.APPLY_FILTER,
				{
					type,
					startDate,
					endDate,
					keyword,
					sortField,
					sortOrder,
				}
			);
			console.log("Filter applied successfully:", response.data);

			setTransactions(response.data);
		} catch (error) {
			console.error("Error applying filter:", error);
			toast.error("Failed to apply filter. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return (
		<Dashboard activeMenu="Filters">
			<div className="my-5 mx-auto">
				<div className="flex justify-between items-center mb-4 ">
					<h2 className="text-2xl font-bold">Filters</h2>
				</div>
				<div className="card p-6 mb-4">
					<div className="flex items-center justify-between mb-6">
						<h5 className="text-lg font-semibold">
							Select the Filters
						</h5>
					</div>
					<form
						action=""
						className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
					>
						<div>
							<label
								htmlFor="type"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Type
							</label>
							<select
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
								id="type"
								value={type}
								onChange={(e) => setType(e.target.value)}
							>
								<option value="income">Income</option>
								<option value="expense">Expense</option>
							</select>
						</div>
						<div>
							<label
								htmlFor="startDate"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Start Date
							</label>
							<input
								type="date"
								id="startDate"
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
							/>
						</div>
						<div>
							<label
								htmlFor="endDate"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								End Date
							</label>
							<input
								type="date"
								id="endDate"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
							/>
						</div>
						<div>
							<label
								htmlFor="sortField"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Sort Field
							</label>
							<select
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
								id="sortField"
								value={sortField}
								onChange={(e) => setSortField(e.target.value)}
							>
								<option value="date">Date</option>
								<option value="amount">Amount</option>
								<option value="category">Category</option>
							</select>
						</div>
						<div>
							<label
								htmlFor="sortOrder"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Sort Order
							</label>
							<select
								className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
								id="sortOrder"
								value={sortOrder}
								onChange={(e) => setSortOrder(e.target.value)}
							>
								<option value="asc">Ascending</option>
								<option value="desc">Descending</option>
							</select>
						</div>
						<div className="sm:col-span-1 md:col-span-1 flex items-end">
							<div className="w-full ">
								<label
									htmlFor="keyword"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Search
								</label>
								<input
									type="text"
									id="keyword"
									placeholder="Search..."
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
									value={keyword}
									onChange={(e) => setKeyword(e.target.value)}
								/>
							</div>
							<button
								onClick={handleSearch}
								className="ml-2 p-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 shadow-sm hover:shadow-md"
							>
								<Search size={20} />
							</button>
						</div>
					</form>
				</div>
				<div className="card p-4 ">
					<div className="flex justify-between items-center mb-4">
						<h5 className="text-lg font-semibold">Transactions</h5>
					</div>
					{transactions.length === 0 && !loading ? (
						<p className="text-gray-500 ">
							Select the filters and click apply to filter the
							transactions
						</p>
					) : (
						""
					)}
					{loading ? (
						<p className="text-gray-500">Loading transactions...</p>
					) : (
						""
					)}
					{transactions.map((transaction, index) => (
						<TransactionInfoCard
							key={transaction.id}
							title={transaction.name}
							icon={transaction.icon}
							date={moment(transaction.date).format(
								"Do MMM YYYY"
							)}
							amount={transaction.amount}
							type={type}
							hideDeleteBtn
						/>
					))}
				</div>
			</div>
		</Dashboard>
	);
}
export default Filter;
