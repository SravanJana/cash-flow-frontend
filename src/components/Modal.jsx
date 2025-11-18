import { X } from "lucide-react";

function Modal({ children, onClose, isOpen, title }) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 justify-center items-center w-full h-full overflow-hidden bg-black/40 backdrop-blur-none flex">
			<div className="relative p-4 w-full max-w-2xl max-h-[-90vh]">
				{/* Model Header */}
				<div className="relative bg-white rounded-xl shadow-2xl border border-gray-100">
					{/* Model Content */}
					<div className="flex items-center justify-between p-5 md:pd-6 border-b border-gray-100 rounded-t-xl">
						<h3 className="text-xl font-semibold text-gray-900 ">
							{title || "Modal Title"}
						</h3>
						<button
							onClick={onClose}
							type="button"
							className="text-black font-bold  bg-red-200 hover:bg-red-400 hover:text-black-700 rounded-lg text-sm w-9 h-9 inline-flex items-center transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-blue-500 focus:ring-offset-2  justify-center  "
						>
							<X className="w-5 h-5 "  size={15}/>
						</button>
					</div>
                    {/* Modal Body */}
                    <div className="p-5 md:p-6 text-gray-700">
                        {children}
                    </div>
				</div>
			</div>
		</div>
	);
}
export default Modal;
