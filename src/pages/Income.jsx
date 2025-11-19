import { useCallback, useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";

function Income() {
	const [incomeData, setIncomeData] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
	const [openDeleteAlert, setOpenDeleteAlert] = useState({
		show: false,
		data: null,
	});

	const fetchIncomeData = useCallback(async () => {
		console.log("Inside fetchIncomeData");
		if (loading) return;
		setLoading(true);

		try {
			const response = await axiosConfig.get(
				API_ENDPOINTS.GET_ALL_INCOME
			);
			if (response.status === 200) {
				console.log("Income List", response.data);
				setIncomeData(response.data);
			}
		} catch (error) {
			console.error("Failed to fetch income data", error);
			toast.error(
				error.response?.data?.message || "Failed to fetch income data"
			);
		} finally {
			setLoading(false);
		}
	}, []);
	const fetchIncomeCategories = useCallback(async () => {
		try {
			const response = await axiosConfig.get(
				API_ENDPOINTS.CATEGORY_BY_TYPE("income")
			);
			if (response.status === 200) {
				console.log("Income Categories", response.data);
				setCategories(response.data);
			}
		} catch (error) {
			console.error("Failed to fetch income categories", error);
			toast.error("Failed to fetch income categories");
		}
	}, []);

	const handleAddIncome = async (income) => {
		if (isSubmitting) return; // Prevent duplicate submissions

		const { name, amount, date, icon, categoryId } = income;
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

		setIsSubmitting(true);
		try {
			const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
				name,
				amount: Number(amount),
				date,
				icon,
				categoryId,
			});
			if (response.status === 201) {
				toast.success("Income added successfully");
				setOpenAddIncomeModal(false);
				fetchIncomeData();
			}
		} catch (error) {
			console.log("Error adding income", error);
			toast.error(
				error.response?.data?.message || "Failed to add income"
			);
		} finally {
			setIsSubmitting(false);
		}
	};
	const deleteIncome = async (incomeId) => {
		try {
			await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(incomeId));
			toast.success("Income deleted successfully");
			setOpenDeleteAlert({ show: false, data: null });
			fetchIncomeData();
		} catch (error) {
			toast.error(
				error.response?.data?.message || "Failed to delete income"
			);
		}
	};

	const handleDownloadIncomeDetails = async () => {
		console.log("Download Income Details");
		try {
			const response = await axiosConfig.get(
				API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
				{
					responseType: "blob",
				}
			);

			let filename = "income_details.xlsx";
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);
			window.URL.revokeObjectURL(url);
			toast.success("Income details downloaded successfully");
		} catch (error) {
			console.error("Failed to download income details", error);
			toast.error(
				error.response?.data?.message ||
					"Failed to download income details"
			);
		}
	};

	const handleEmailIncomeDetails = async () => {
		try {
			const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
			if (response.status === 200) {
				console.log("Email Response ", response.data);
				toast.success("Income details emailed successfully");
			}
		} catch (error) {
			console.error("Failed to email income details", error);
			toast.error(
				error.response?.data?.message ||
					"Failed to email income details"
			);
		}
	};

	useEffect(() => {
		fetchIncomeData();
		fetchIncomeCategories();
	}, [fetchIncomeData, fetchIncomeCategories]);

	return (
		<Dashboard activeMenu="Income">
			<div className="my-5 mx-auto">
				<div className="grid grid-cols-1 gap-6 ">
					<div>
						{/* Overview for income with Line Chart */}

						<IncomeOverview
							transactions={incomeData}
							onAddIncome={() => setOpenAddIncomeModal(true)}
						/>
					</div>

					<IncomeList
						transactions={incomeData}
						onDelete={(id) =>
							setOpenDeleteAlert({ show: true, data: id })
						}
						onDownload={handleDownloadIncomeDetails}
						onEmail={handleEmailIncomeDetails}
					/>

					{/* Add Income Modal */}
					<Modal
						isOpen={openAddIncomeModal}
						onClose={() => setOpenAddIncomeModal(false)}
						title="Add Income"
					>
						<AddIncomeForm
							onAddIncome={handleAddIncome}
							categories={categories}
							isSubmitting={isSubmitting}
						/>
					</Modal>

					<Modal
						isOpen={openDeleteAlert.show}
						onClose={() =>
							setOpenDeleteAlert({ show: false, data: null })
						}
						title="Delete Income"
					>
						<DeleteAlert
							content="Are you sure you want to delete this income?"
							onDelete={() => {
								// Add delete logic here
								deleteIncome(openDeleteAlert.data);
							}}
						/>
					</Modal>
				</div>
			</div>
		</Dashboard>
	);
}
export default Income;
