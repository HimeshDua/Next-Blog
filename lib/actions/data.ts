// /lib/actions/getAllStartups.ts
import dbConnect from "@/lib/db";
import Startup from "@/models/Startup.model";


export async function getAllStartups() {
    await dbConnect();

    const startups = await Startup.find()
        .populate("author", "_id name avatar") // pulls in author info
        .sort({createdAt: -1}); // newest first

    return JSON.parse(JSON.stringify(startups)); // ensures serializable data for Next.js
}

export async function createPitch(formData: FormData, pitch: string) {
    try {
        const newPitch = await Startup.create({
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            image: formData.get("link"),
            pitch,
        });

        return {status: "SUCCESS", _id: newPitch._id};
    } catch (err) {
        console.error(err);
        return {status: "ERROR", error: "Failed to create pitch."};
    }
}
