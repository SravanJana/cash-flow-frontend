export const BASE_URL = "https://cash-flow-ri25.onrender.com/api/v1";
// export const BASE_URL = "http://localhost:8080/api/v1";

const CLOUDINARY_CLOUD_NAME = "dkqijfkxl";

export const API_ENDPOINTS = {
	LOGIN: "/login",
	REGISTER: "/register",
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
