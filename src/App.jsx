import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Income from "./pages/Income";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Expense from "./pages/Expense";
import AppContext from "./context/AppContext";

function App() {
	console.log("Hello App!");
	return (
		<>
			<Toaster />
			<AppContext>
				<BrowserRouter>
					<Routes>
						<Route path="/dashboard" element={<Home />} />
						<Route path="/income" element={<Income />} />
						<Route path="/expense" element={<Expense />} />
						<Route path="/category" element={<Category />} />
						<Route path="/filter" element={<Filter />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</BrowserRouter>
			</AppContext>
		</>
	);
}

export default App;
