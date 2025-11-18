import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

function AddExpenseForm({ onAddExpense, categories }) {
	const [expense, setExpense] = useState({
		amount: "",
		name: "",
		date: "",
		icon: "",
		categoryId: "",
	});
	const [loading, setLoading] = useState(false);

	const categoryOptions = categories.map((category) => ({
		value: category.id,
		label: category.name,
	}));
	const handleChange = (field, value) => {
		setExpense({
			...expense,
			[field]: value,
		});
	};

	const handleAddExpense = async (expense) => {
		setLoading(true);
		try {
			await onAddExpense(expense);
		} catch (error) {
			console.error("Failed to add expense", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (categories.length > 0 && !expense.categoryId) {
			setExpense((prevExpense) => ({
				...prevExpense,
				categoryId: categories[0].id,
			}));
		}
	}, [categories, expense.categoryId]);

	return (
		<div>
			<EmojiPickerPopup
				icon={expense.icon}
				onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
			/>
			<Input
				value={expense.name}
				onChange={(e) => handleChange("name", e.target.value)}
				label="Expense Name"
				placeholder="e.g., Groceries, Rent, etc."
				type="text"
			/>

			<Input
				label="category"
				value={expense.categoryId}
				onChange={({ target }) =>
					handleChange("categoryId", target.value)
				}
				isSelect={true}
				options={categoryOptions}
			/>

			<Input
				value={expense.amount}
				onChange={({ target }) => handleChange("amount", target.value)}
				label="Amount"
				placeholder="e.g., 1000"
				type="number"
			/>
			<Input
				value={expense.date}
				onChange={({ target }) => handleChange("date", target.value)}
				label="Date"
				type="date"
			/>
			<div className="flex justify-center mt-6">
				<button
					onClick={() => handleAddExpense(expense)}
					className="add-btn add-tn-fill"
					disabled={loading}
				>
					{loading ? (
						<>
							<LoaderCircle className="animate-spin w-4 h-4" />
							Adding...
						</>
					) : (
						<>Add Expense</>
					)}
				</button>
			</div>
		</div>
	);
}
export default AddExpenseForm;
