// /lib/actions/getAllStartups.ts
import dbConnect from "@/lib/db";
import Startup from "@/models/Startup.model";

export async function getAllStartups(query?: string) {
  try {
    const filter = query ? { title: { $regex: query, $options: "i" } } : {};

    await dbConnect();
    const startups = await Startup.find(filter)
      .sort({ createdAt: -1 })
      .populate("author", "_id name avatar");

    return startups.map((startup) => ({
      ...startup.toObject(),
      _id: startup._id.toString(),
      createdAt: startup.createdAt
        ? startup.createdAt.toISOString()
        : new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}
