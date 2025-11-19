import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

function AddIncomeForm({ onAddIncome, categories, isSubmitting }) {
	const [income, setIncome] = useState({
		amount: "",
		name: "",
		date: "",
		icon: "",
		categoryId: "",
	});

	const categoryOptions = categories.map((category) => ({
		value: category.id,
		label: category.name,
	}));
	const handleChange = (field, value) => {
		setIncome({
			...income,
			[field]: value,
		});
	};

	const handleAddIncome = async (income) => {
		await onAddIncome(income);
	};

	useEffect(() => {
		if (categories.length > 0 && !income.categoryId) {
			setIncome((prevIncome) => ({
				...prevIncome,
				categoryId: categories[0].id,
			}));
		}
	}, [categories, income.categoryId]);

	return (
		<div>
			<EmojiPickerPopup
				icon={income.icon}
				onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
			/>
			<Input
				value={income.name}
				onChange={(e) => handleChange("name", e.target.value)}
				label="Income Name"
				placeholder="e.g., Salary, Freelance, etc."
				type="text"
			/>

			<Input
				label="category"
				value={income.categoryId}
				onChange={({ target }) =>
					handleChange("categoryId", target.value)
				}
				isSelect={true}
				options={categoryOptions}
			/>

			<Input
				value={income.amount}
				onChange={({ target }) => handleChange("amount", target.value)}
				label="Amount"
				placeholder="e.g., 1000"
				type="number"
			/>
			<Input
				value={income.date}
				onChange={({ target }) => handleChange("date", target.value)}
				label="Date"
				type="date"
			/>
			<div className="flex justify-center mt-6">
				<button
					onClick={() => handleAddIncome(income)}
					className="add-btn add-tn-fill"
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<>
							<LoaderCircle className="animate-spin w-4 h-4" />
							Adding...
						</>
					) : (
						<>Add Income</>
					)}
				</button>
			</div>
		</div>
	);
}
export default AddIncomeForm;
