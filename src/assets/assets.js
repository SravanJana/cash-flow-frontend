import login_bg from "./login_bg.jpg";
import piggy_bank from "./piggy-bank.png";
import cash_image from "./Cash Image.png";
import { Coins, Filter, FunnelPlus, LayoutDashboard, List, Wallet } from "lucide-react";
export const assets = {
	login_bg,
	piggy_bank,
	cash_image,
};

export const SIDE_BAR_DATA = [
	{
		id: "101",
		label: "Dashboard",
		icon: LayoutDashboard,
		path: "/dashboard",
	},
	{
		id: "102",
		label: "Category",
		icon: List,
		path: "/category",
	},
	{
		id: "103",
		label: "Income",
		icon: Wallet,
		path: "/Income",
	},
	{
		id: "104",
		label: "Expense",
		icon: Coins,
		path: "/expense",
	},
	{
		id: "105",
		label: "Filters",
		icon: FunnelPlus,
		path: "/filters",
	},
];
