const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const uploadImage = async (file: File): Promise<string> => {
    if (!IMGBB_API_KEY) {
        throw new Error("ImgBB API key is not configured");
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", IMGBB_API_KEY);

    try {
        const response = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error.message || "Failed to upload image to ImgBB");
        }

        return data.data.url;
    } catch (error) {
        console.error("ImgBB upload error:", error);
        throw error;
    }
};