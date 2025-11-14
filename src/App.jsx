import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Income from "./pages/Income";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Expense from "./pages/Expense";
import AppContextProvider from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	console.log("Hello App!");
	return (
		<>
			<Toaster />
			<AppContextProvider>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<Navigate to="/dashboard" replace />}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/income"
							element={
								<ProtectedRoute>
									<Income />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/expense"
							element={
								<ProtectedRoute>
									<Expense />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/category"
							element={
								<ProtectedRoute>
									<Category />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/filter"
							element={
								<ProtectedRoute>
									<Filter />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</BrowserRouter>
			</AppContextProvider>
		</>
	);
}

export default App;
