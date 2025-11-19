import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

function CustomPieChart({ data, label, totalAmount }) {
	const [activeIndex, setActiveIndex] = useState(null);

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white dark:bg-white px-4 py-2 rounded-lg shadow-xl border Z-10 border-gray-200 dark:border-gray-700">
					<p className="text-xs font-semibold text-purple-600">
						{payload[0].name}
					</p>
					<p className="text-md font-bold text-black ">
						₹{payload[0].value.toLocaleString("en-IN")}
					</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="w-full flex flex-col items-center">
			<div className="relative w-full">
				<ResponsiveContainer width="100%" height={400}>
					<PieChart>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							innerRadius={90}
							outerRadius={120}
							dataKey="amount"
							onMouseEnter={(_, index) => setActiveIndex(index)}
							onMouseLeave={() => setActiveIndex(null)}
							animationDuration={1000}
						>
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={entry.color}
									opacity={
										activeIndex === null ||
										activeIndex === index
											? 1
											: 0.6
									}
									style={{
										cursor: "pointer",
										transition: "opacity 0.3s ease",
									}}
								/>
							))}
						</Pie>
						<Tooltip content={<CustomTooltip />} />
					</PieChart>
				</ResponsiveContainer>

				{/* Center label inside the donut */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
					<p className="text-sm text-gray-500 dark:text-gray-900 mb-1">
						{label}
					</p>
					<p className="text-3xl font-bold text-gray-900 dark:text-gray-1000">
						{totalAmount}
					</p>
				</div>
			</div>

			{/* Legend below the chart */}
			<div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
				{data.map((entry, index) => (
					<div
						key={`legend-${index}`}
						className="flex items-center gap-2 cursor-pointer"
						onMouseEnter={() => setActiveIndex(index)}
						onMouseLeave={() => setActiveIndex(null)}
					>
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: entry.color }}
						/>
						<span className="text-sm text-gray-700 dark:text-gray-300">
							{entry.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default CustomPieChart;
