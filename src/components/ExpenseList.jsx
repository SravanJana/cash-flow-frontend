import { Download, Loader, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

function ExpenseList({ transactions, onDelete, onDownload, onEmail }) {
	const [emailLoading, setEmailLoading] = useState(false);
	const [downloadLoading, setDownloadLoading] = useState(false);
	const loading = emailLoading || downloadLoading;

	const handleEmail = async () => {
		setEmailLoading(true);
		try {
			await onEmail();
		} finally {
			setEmailLoading(false);
		}
	};
	const handleDownload = async () => {
		setDownloadLoading(true);
		try {
			await onDownload();
		} finally {
			setDownloadLoading(false);
		}
	};
	return (
		<div className="card">
			<div className="flex items-center justify-between">
				<h5 className="text-lg font-semibold">Expense Transactions</h5>
				<div className="flex items-center justify-end gap-2 ">
					<button
						disabled={loading}
						onClick={handleEmail}
						className="card-btn"
					>
						{emailLoading ? (
							<>
								<Loader className="w-4 h-4 animate-spin" />
								Sending..
							</>
						) : (
							<>
								<Mail size={15} className="text-base" />
								Email
							</>
						)}
					</button>

					<button
						disabled={loading}
						onClick={handleDownload}
						className="card-btn"
					>
						{downloadLoading ? (
							<>
								<Loader className="w-4 h-4 animate-spin" />
								"Downloading..
							</>
						) : (
							<>
								<Download size={15} className="text-base" />
								Download
							</>
						)}
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2">
				{/* Display the expenses */}
				{transactions.map((expense) => (
					<TransactionInfoCard
						key={expense.id}
						title={expense.name}
						icon={expense.icon}
						date={moment(expense.date).format("Do MMM YYYY")}
						amount={expense.amount}
						type="expense"
						onDelete={() => onDelete(expense.id)}
					/>
				))}
			</div>
		</div>
	);
}
export default ExpenseList;
