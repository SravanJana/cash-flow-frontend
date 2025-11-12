import { Eye, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export default function Input({ label, value, onChange, placeholder, type }) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	return (
		<div className="mb-4">
			<label htmlFor="" className="text-13px text-slate-500 mb-1 block">
				{label}
			</label>
			<div className="relative">
				<input
					className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 "
					type={
						type === "password"
							? showPassword
								? "text"
								: "password"
							: type
					}
					placeholder={placeholder}
					value={value}
					onChange={(e) => onChange(e)}
				/>
				{type === "password" && (
					<span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
						{showPassword ? (
							<Eye
								size={20}
								className="text-purple-800"
								onClick={togglePasswordVisibility}
							/>
						) : (
							<EyeOffIcon
								size={20}
								className="text-purple-800"
								onClick={togglePasswordVisibility}
							/>
						)}
					</span>
				)}
			</div>
		</div>
	);
}
