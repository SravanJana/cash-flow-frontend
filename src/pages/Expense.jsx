import { useCallback, useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseOverview from "../components/ExpenseOverview";

function Expense() {
	const [expenseData, setExpenseData] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
	const [openDeleteAlert, setOpenDeleteAlert] = useState({
		show: false,
		data: null,
	});

	const fetchExpenseData = useCallback(async () => {
		console.log("Inside fetchExpenseData");
		if (loading) return;
		setLoading(true);

		try {
			const response = await axiosConfig.get(
				API_ENDPOINTS.GET_ALL_EXPENSE
			);
			if (response.status === 200) {
				console.log("Expense List", response.data);
				setExpenseData(response.data);
			}
		} catch (error) {
			console.error("Failed to fetch expense data", error);
			toast.error(
				error.response?.data?.message || "Failed to fetch expense data"
			);
		} finally {
			setLoading(false);
		}
	}, []);
	const fetchExpenseCategories = useCallback(async () => {
		try {
			const response = await axiosConfig.get(
				API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
			);
			if (response.status === 200) {
				console.log("Expense Categories", response.data);
				setCategories(response.data);
			}
		} catch (error) {
			console.error("Failed to fetch expense categories", error);
			toast.error("Failed to fetch expense categories");
		}
	}, []);

	const handleAddExpense = async (expense) => {
		const { name, amount, date, icon, categoryId } = expense;
		if (!name.trim()) {
			toast.error("Please enter a name`");
			return;
		}

		if (!amount || isNaN(amount) || Number(amount) <= 0) {
			toast.error("Please enter a valid amount");
			return;
		}
		if (!date) {
			toast.error("Please enter a date");
			return;
		}
		if (!icon.trim()) {
			toast.error("Please select an icon");
			return;
		}
		if (!categoryId) {
			toast.error("Please select a category");
			return;
		}
		const today = new Date().toISOString().split("T")[0];
		if (date > today) {
			toast.error("Date cannot be in the future");
			return;
		}

		try {
			const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
				name,
				amount: Number(amount),
				date,
				icon,
				categoryId,
			});
			if (response.status === 201) {
				toast.success("Expense added successfully");
				setOpenAddExpenseModal(false);
				fetchExpenseData();
			}
		} catch (error) {
			console.log("Error adding expense", error);
			toast.error(
				error.response?.data?.message || "Failed to add expense"
			);
		}
	};
	const deleteExpense = async (expenseId) => {
		try {
			await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(expenseId));
			toast.success("Expense deleted successfully");
			setOpenDeleteAlert({ show: false, data: null });
			fetchExpenseData();
		} catch (error) {
			toast.error(
				error.response?.data?.message || "Failed to delete expense"
			);
		}
	};

	const handleDownloadExpenseDetails = async () => {
		console.log("Download Expense Details");
		try {
			const response = await axiosConfig.get(
				API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
				{
					responseType: "blob",
				}
			);

			let filename = "expense_details.xlsx";
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);
			window.URL.revokeObjectURL(url);
			toast.success("Expense details downloaded successfully");
		} catch (error) {
			console.error("Failed to download expense details", error);
			toast.error(
				error.response?.data?.message ||
					"Failed to download expense details"
			);
		}
	};

	const handleEmailExpenseDetails = async () => {
		try {
			const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
			if (response.status === 200) {
				console.log("Email Response ", response.data);
				toast.success("Expense details emailed successfully");
			}
		} catch (error) {
			console.error("Failed to email expense details", error);
			toast.error(
				error.response?.data?.message ||
					"Failed to email expense details"
			);
		}
	};

	useEffect(() => {
		fetchExpenseData();
		fetchExpenseCategories();
	}, [fetchExpenseData, fetchExpenseCategories]);

	return (
		<Dashboard activeMenu="Expense">
			<div className="my-5 mx-auto">
				<div className="grid grid-cols-1 gap-6 ">
					<div>
						{/* Overview for expense with Line Chart */}

						<ExpenseOverview
							transactions={expenseData}
							onAddExpense={() => setOpenAddExpenseModal(true)}
						/>
					</div>

					<ExpenseList
						transactions={expenseData}
						onDelete={(id) =>
							setOpenDeleteAlert({ show: true, data: id })
						}
						onDownload={handleDownloadExpenseDetails}
						onEmail={handleEmailExpenseDetails}
					/>

					{/* Add Expense Modal */}
					<Modal
						isOpen={openAddExpenseModal}
						onClose={() => setOpenAddExpenseModal(false)}
						title="Add Expense"
					>
						<AddExpenseForm
							onAddExpense={handleAddExpense}
							categories={categories}
						/>
					</Modal>

					<Modal
						isOpen={openDeleteAlert.show}
						onClose={() =>
							setOpenDeleteAlert({ show: false, data: null })
						}
						title="Delete Expense"
					>
						<DeleteAlert
							content="Are you sure you want to delete this expense?"
							onDelete={() => {
								// Add delete logic here
								deleteExpense(openDeleteAlert.data);
							}}
						/>
					</Modal>
				</div>
			</div>
		</Dashboard>
	);
}
export default Expense;
