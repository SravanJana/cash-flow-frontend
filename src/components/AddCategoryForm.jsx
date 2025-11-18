import { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

function AddCategoryForm({ onAddCategory, isEditing, initialCategoryData }) {
	const [category, setCategory] = useState({
		name: "",
		type: "income",
		icon: "",
	});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isEditing && initialCategoryData) {
			setCategory({
				name: initialCategoryData.name || "",
				type: initialCategoryData.type || "income",
				icon: initialCategoryData.icon || "",
			});
		} else {
			setCategory({
				name: "",
				type: "income",
				icon: "",
			});
		}
	}, [isEditing, initialCategoryData]);

	const categoryTypesOptions = [
		{ label: "Income", value: "income" },
		{ label: "Expense", value: "expense" },
	];
	const handleChange = (field, value) => {
		setCategory({ ...category, [field]: value });
	};
	const handleSubmit = async () => {
		setLoading(true);
		// You can add validation here if needed
		try {
			await onAddCategory(category);
		} catch (error) {
			console.error("Failed to add category", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="p-1  ">
			<div>
				<EmojiPickerPopup
					icon={category.icon}
					onSelect={(selectedIcon) =>
						handleChange("icon", selectedIcon)
					}
				/>
			</div>

			<p className="mb-1">Category Name</p>
			<input
				value={category.name}
				onChange={(e) => handleChange("name", e.target.value)}
				type="text"
				placeholder="e.g., Food, Salary, Grocery"
				label="Category Name"
				className="w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
			/>

			<Input
				label="Category Type"
				value={category.type}
				onChange={(e) => handleChange("type", e.target.value)}
				isSelect={true}
				options={categoryTypesOptions}
			/>
			<div className="flex justify-center mt-6 ">
				<button
					onClick={handleSubmit}
					type="button"
					className="add-btn add-btn-fill"
				>
					{loading ? (
						<>
							<LoaderCircle className="animate-spin h-5 w-5 text-black" />
							{isEditing ? " Updating..." : " Adding..."}
						</>
					) : isEditing ? (
						" Update Category"
					) : (
						" Add Category"
					)}
				</button>
			</div>
		</div>
	);
}
export default AddCategoryForm;
