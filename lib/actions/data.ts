// /lib/actions/getAllStartups.ts
import dbConnect from "@/lib/db";
import Startup from "@/models/Startup.model";


export async function getAllStartups() {
    await dbConnect();

    const startups = await Startup.find()
        .populate("author", "_id name avatar") // pulls in author info
        .sort({createdAt: -1}); // newest first

    return JSON.parse(JSON.stringify(startups));
}