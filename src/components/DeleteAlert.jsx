import { LoaderCircle } from "lucide-react";
import { useState } from "react";

function DeleteAlert({ content, onDelete }) {
	const [toLoad, setToLoad] = useState(false);

	const handleDelete = async () => {
		setToLoad(true);
		console.log("Inside Handle Delete", toLoad);

		try {
			await onDelete();
		} finally {
            // setToLoad(false);
        }
	};

	return (
		<div>
			<p className="text-lg"> {content}</p>
			<div className="flex justify-center mt-6">
				<button
					onClick={handleDelete}
					disabled={toLoad}
					type="button"
					className="del-btn del-btn-fill flex items-center gap-2 justify-center"
				>
					{toLoad ? (
						<>
							<LoaderCircle className=" w-4 h-4 animate-spin" />
							Deleting...
						</>
					) : (
						<>Yes, Delete</>
					)}
				</button>
			</div>
		</div>
	);
}
export default DeleteAlert;
