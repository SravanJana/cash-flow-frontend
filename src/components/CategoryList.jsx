import { Layers2, Pen, Pencil } from "lucide-react";

function CategoryList({ categories, onEditCategory }) {
	return (
		<div className="card p-4 bg-white  my-4 rounded-2xl ">
			<div className="flex items-center justify-between mb-4 ">
				<h4 className="text-lg font-semibold">Category Sources</h4>
			</div>
			{/* Category List */}
			{categories.length === 0 ? (
				<p className="text-gray-500">No categories available.</p>
			) : (
				// Render categories here
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap -4">
					{categories.map((category ) => (
						<div
							key={category.id}
							className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-200/60"
						>
							{/* Emoji's */}
							<div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 rounded-full bg-gray-200/50">
								{category.icon ? (
									<span className="text-xl">
										<img 
											src={category.icon}
											alt={category.name}
										/>
									</span>
								) : (
									<Layers2
										className="text-purple-800 "
										size={24}
									/>
								)}
							</div>
							{/* Category Details */}
							<div className="flex-1 flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-700 mt-1 capitalize font-medium">
										{category.name}
									</p>
									<p className="text-sm text-gray-400 mt-1 capitalize">
										{category.type}
									</p>
								</div>
								{/* Action Buttons */}

								<div className="flex items-center gap-2">
									<button
                                        onClick={() => onEditCategory(category)}
                                     className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
										<Pencil size={19} />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
export default CategoryList;
