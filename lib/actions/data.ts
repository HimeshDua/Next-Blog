// /lib/actions/getAllStartups.ts
import dbConnect from "@/lib/db";
import Startup from "@/models/Startup.model";

export async function getAllStartups(query?: string) {

    const filter = query ? {title: {$regex: query, $options: "i"}} : {};

    await dbConnect();
    const startups = await Startup.find(filter).sort({createdAt: -1}).populate("author", "_id name avatar").lean();

    return startups.map((startup) => ({
        ...startup,
        _id: String(startup._id),
        createdAt: startup.createdAt ? new Date(startup.createdAt).toISOString() : new Date().toISOString(),
    }));
}