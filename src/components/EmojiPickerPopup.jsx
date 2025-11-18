import EmojiPicker from "emoji-picker-react";
import { Image, X } from "lucide-react";
import { useState } from "react";

function EmojiPickerPopup({ icon = "", onSelect }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleEmojiClick = (emojiData) => {
		// Get the URL from the emoji data
		const emojiUrl = emojiData?.imageUrl;
		if (emojiUrl) {
			onSelect(emojiUrl);
			setIsOpen(false);
		}
	};

	return (
		<div className="flex flex-col md:flex-row items-start gap-5 mb-6">
			<div
				onClick={() => setIsOpen(true)}
				className="flex items-center gap-4 cursor-pointer"
			>
				<div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg overflow-hidden">
					{icon ? (
						<img
							src={icon}
							alt="Icon"
							className="w-full h-full object-cover"
						/>
					) : (
						<Image />
					)}
				</div>
				<p>{icon ? "Change Icon" : "Pick Icon"}</p>
			</div>

			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-4 relative shadow-2xl">
						<button
							onClick={() => setIsOpen(false)}
							className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer hover:bg-gray-100"
						>
							<X className="w-4 h-4" />
						</button>
						<EmojiPicker onEmojiClick={handleEmojiClick} />
					</div>
				</div>
			)}
		</div>
	);
}
export default EmojiPickerPopup;
