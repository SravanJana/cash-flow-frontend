export const BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const API_ENDPOINTS = {
	LOGIN: "/login",
	REGISTER: "/register",
	GOOGLE_AUTH: "/auth/google",
	GET_ALL_CATEGORIES: "/categories",
	ADD_CATEGORY: "/categories",
	UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
	GET_ALL_INCOME: "/incomes",
	CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
	ADD_INCOME: "/incomes",
	DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
	INCOME_EXCEL_DOWNLOAD: "/excel/download/incomes",
	EMAIL_INCOME: "/excel/email/incomes",
	GET_ALL_EXPENSE: "/expenses",
	ADD_EXPENSE: "/expenses",
	DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
	EXPENSE_EXCEL_DOWNLOAD: "/excel/download/expenses",
	EMAIL_EXPENSE: "/excel/email/expenses",
	APPLY_FILTER: "/filter",
	DASHBOARD_DATA: "/dashboard",
	UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
