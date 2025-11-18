import React from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";
import moment from "moment";

/**
 * CustomLineChart
 * - Expects data like the JSON you provided (each point has date, amount, items(array), month)
 */
function CustomLineChart({ data }) {
	// Empty state
	if (!data || data.length === 0) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<div className="text-center space-y-4">
					<div className="relative inline-block">
						<div className="absolute inset-0 bg-purple-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
						<div className="relative bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-full">
							<TrendingUp
								className="w-16 h-16 text-purple-400"
								strokeWidth={1.5}
							/>
						</div>
					</div>
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-700">
							No Income Data Yet
						</h3>
						<p className="text-sm text-gray-500 max-w-xs mx-auto">
							Start tracking your income to see beautiful insights
							and trends here.
						</p>
					</div>
					<div className="flex items-center justify-center gap-2 text-purple-500 text-xs font-medium">
						<BarChart3 className="w-4 h-4" />
						<span>Your financial journey starts here</span>
					</div>
				</div>
			</div>
		);
	}

	// Format currency
	const formatINR = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

	// Tooltip component tailored to your data shape
	const CustomTooltip = ({ active, payload }) => {
		if (!(active && payload && payload.length)) return null;

		const point = payload[0].payload || {};
		const amount = payload[0].value ?? point.amount ?? 0;
		const items = Array.isArray(point.items) ? point.items : [];

		// If you want a single category name header, pick the first item's categoryName
		const categoryName = items.length
			? items[0].categoryName
			: point.categoryName ?? null;

		return (
			<div className="relative">
				{/* small purple dot + small vertical line above tooltip */}
				<div className="absolute -top-5 left-5 flex flex-col items-center pointer-events-none">
					<div className="w-2.5 h-2.5 rounded-full bg-purple-600 shadow-sm" />
					<div className="w-px h-4 bg-gray-200 mt-1" />
				</div>

				{/* caret: rotated square to look like an arrow */}
				<div
					style={{
						position: "absolute",
						top: -6,
						left: 14,
						width: 12,
						height: 12,
						transform: "rotate(45deg)",
						background: "white",
						borderLeft: "1px solid rgba(229,231,235,1)",
						borderTop: "1px solid rgba(229,231,235,1)",
						boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
						zIndex: 20,
					}}
				/>

				{/* Tooltip Card */}
				<div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[150px] z-30">
					{/* Top row: date (left), optional category chip (right) */}
					<div className="flex items-center justify-between mb-2 gap-2">
						<p className="text-sm font-semibold text-gray-800">
							{moment(point.date).format("Do MMM YY") ?? "—"}
						</p>

						{categoryName && (
							<span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-purple-50 text-purple-700">
								{categoryName}
							</span>
						)}
					</div>

					{/* Total */}
					<div className="mb-1">
						<p className="text-sm text-gray-700">Total:</p>
						<p className="text-md font-extrabold text-gray-900">
							<span className="text-purple-600">
								{formatINR(amount)}
							</span>
						</p>
					</div>

					{/* Horizontal divider */}
					<div className="border-t border-gray-100 my-1" />

					{/* Details header */}
					<p className="text-sm font-bold text-gray-800 mb-2">
						Details:
					</p>

					{/* Items list */}
					{items && items.length > 0 ? (
						<div className="space-y-2">
							{items.map((it) => (
								<div
									key={it.id ?? `${it.name}-${it.amount}`}
									className="flex items-center justify-between"
								>
									{/* Left: icon + name + small category (optional) */}
									<div className="flex items-center gap-3">
										{it.icon ? (
											<img
												src={it.icon}
												alt={it.name}
												className="w-5 h-5 rounded-full object-cover"
											/>
										) : (
											<div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
												{/* fallback */}₹
											</div>
										)}

										<div className="flex flex-col">
											<span className="text-md font-medium text-gray-800">
												{it.name}
											</span>
											{/* {it.categoryName && (
												<span className="text-xs text-gray-500">
													{it.categoryName}
												</span>
											)} */}
										</div>
									</div>

									{/* Right: amount */}
									{/* <div className="text-xs font-semibold text-gray-800">
										{formatINR(it.amount ?? it.value ?? 0)}
									</div> */}
								</div>
							))}
						</div>
					) : (
						<p className="text-sm text-gray-500">
							No details available
						</p>
					)}
				</div>
			</div>
		);
	};

	return (
		<div className="w-full h-full">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					data={data}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient
							id="colorAmount"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor="#8b5cf6"
								stopOpacity={0.3}
							/>
							<stop
								offset="95%"
								stopColor="#8b5cf6"
								stopOpacity={0.05}
							/>
						</linearGradient>
					</defs>

					<CartesianGrid
						strokeDasharray="0"
						stroke="#f0f0f0"
						vertical={false}
					/>
					<XAxis
						dataKey="month" /* use month for nicer x ticks like "3 Nov" */
						axisLine={false}
						tickLine={false}
						tick={{ fill: "#6b7280", fontSize: 12 }}
						dy={10}
					/>
					<YAxis
						axisLine={false}
						tickLine={false}
						tick={{ fill: "#6b7280", fontSize: 12 }}
						tickFormatter={(value) => `${value / 1000}k`}
						dx={-10}
					/>
					<Tooltip
						content={<CustomTooltip />}
						cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
						wrapperStyle={{ outline: "none" }}
					/>
					<Area
						type="monotone"
						dataKey="amount"
						stroke="#8b5cf6"
						strokeWidth={3}
						fill="url(#colorAmount)"
						dot={{
							fill: "#8b5cf6",
							strokeWidth: 2,
							r: 5,
							stroke: "#fff",
						}}
						activeDot={{
							r: 7,
							fill: "#8b5cf6",
							stroke: "#fff",
							strokeWidth: 2,
						}}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

export default CustomLineChart;
