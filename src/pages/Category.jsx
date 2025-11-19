import { Plus, PlusIcon } from "lucide-react";
import Dashboard from "../components/Dashboard";
import CategoryList from "../components/CategoryList";
import { useCallback, useEffect, useState } from "react";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

function Category() {
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
	const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const fetchCategories = useCallback(async () => {
		// API call to fetch categories
		if (loading) return;
		setLoading(true);
		try {
			const response = await axiosConfig.get(
				API_ENDPOINTS.GET_ALL_CATEGORIES
			);
			if (response.status === 200) {
				console.log("Categories", response.data);
				setCategories(response.data);
			}
		} catch (error) {
			console.error("Failed to fetch categories", error);
			toast.error("Failed to fetch categories");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	const handleAddCategory = async (newCategory) => {
		if (isSubmitting) return; // Prevent duplicate submissions

		const { name, type, icon } = newCategory;
		if (name.trim() === "" || type.trim() === "" || icon.trim() === "") {
			toast.error("Please fill all the fields");
			return;
		}

		const isDuplicate = categories.some(
			(category) =>
				category.name.toLowerCase() === name.trim().toLowerCase()
		);
		if (isDuplicate) {
			toast.error("Category with this name already exists");
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await axiosConfig.post(
				API_ENDPOINTS.ADD_CATEGORY,
				newCategory
			);
			if (response.status === 201) {
				toast.success("Category added successfully");
				setOpenAddCategoryModal(false);
				fetchCategories();
			}
		} catch (error) {
			console.error("Failed to add category", error);
			toast.error(
				error.response?.data?.message || "Failed to add category"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEditCategory = (category) => {
		setSelectedCategory(category);
		setOpenEditCategoryModal(true);
		console.log("Editing Category", category);
	};
	const handleUpdateCategory = async (updatedCategory) => {
		if (isSubmitting) return; // Prevent duplicate submissions

		const { name, type, icon } = updatedCategory;
		if (name.trim() === "" || type.trim() === "" || icon.trim() === "") {
			toast.error("Please fill all the fields");
			return;
		}
		setIsSubmitting(true);
		try {
			const response = await axiosConfig.put(
				API_ENDPOINTS.UPDATE_CATEGORY(selectedCategory.id),
				{ name, type, icon }
			);
			if (response.status === 200) {
				toast.success("Category updated successfully");
				setOpenEditCategoryModal(false);
				setSelectedCategory(null);
				fetchCategories();
			}
		} catch (error) {
			console.error("Failed to update category", error);
			toast.error(
				error.response?.data?.message || "Failed to update category"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dashboard activeMenu="Category">
			<div className="my-5 mx-auto ">
				{/* Add Button to add category */}
				<div className="flex justify-between items-center mb-5 ">
					<h2 className="text-2xl font-semibold">All Categories</h2>

					<button
						onClick={() => setOpenAddCategoryModal(true)}
						className="flex items-center gap-1 add-btn"
					>
						<Plus size={15} />
						Add Category
					</button>
				</div>

				{/* Category List */}
				<CategoryList
					categories={categories}
					onEditCategory={handleEditCategory}
				/>

				{/* Adding category Modal */}
				<Modal
					isOpen={openAddCategoryModal}
					onClose={() => setOpenAddCategoryModal(false)}
					title="Add  Category"
				>
					<AddCategoryForm
						onAddCategory={handleAddCategory}
						isSubmitting={isSubmitting}
					/>
				</Modal>

				{/* Updating category Modal */}

				<Modal
					isOpen={openEditCategoryModal}
					onClose={() => {
						setOpenEditCategoryModal(false);
						setSelectedCategory(null);
					}}
					title="Edit Category"
				>
					<AddCategoryForm
						onAddCategory={handleUpdateCategory}
						isEditing={true}
						initialCategoryData={selectedCategory}
						isSubmitting={isSubmitting}
					/>
				</Modal>
			</div>
		</Dashboard>
	);
}
export default Category;
