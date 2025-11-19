import axios from "axios";

const axiosConfig = axios.create({
	baseURL:
		import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

const excludeEndpoints = [
	"/login",
	"/register",
	"/status",
	"/activate",
	"/health",
];

axiosConfig.interceptors.request.use(
	(config) => {
		// Check if URL should skip token
		const shouldSkipToken = excludeEndpoints.some((endpoint) => {
			return config.url?.includes(endpoint);
		});

		// Add token if NOT excluded
		if (!shouldSkipToken) {
			const accessToken = localStorage.getItem("token");
			if (accessToken) {
				config.headers = config.headers || {};
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosConfig.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			if (error.response.status === 401) {
				window.location.href = "/login";
			} else if (error.response.status === 500) {
				console.error("Server Error, please try again later.");
			}
		} else if (error.code === "ECONNABORTED") {
			console.error("Request timed out. Please try again.");
		}

		return Promise.reject(error);
	}
);

export default axiosConfig;
