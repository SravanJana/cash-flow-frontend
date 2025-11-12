import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUDINARY_UPLOAD_PRESET = "moneymanger";

const uploadProfileImage = async (imageFile) => {
	const formData = new FormData();
	formData.append("file", imageFile);
	formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
	try {
		const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
			method: "POST",
			body: formData,
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				`Cloudinary upload failed with status ${
					errorData.error.message || response.status
				}`
			);
		}
		const data = await response.json();
		console.log(data);
		console.log("data >>>>" + data);
		return data.secure_url;
	} catch (error) {
		console.error("Error uploading image to Cloudinary:", error);
		throw error;
	}
};

export default uploadProfileImage;
