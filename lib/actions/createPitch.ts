// lib/actions/createPitch.ts
"use server";

import dbConnect from "@/lib/db";
import Startup from "@/models/Startup.model";

export async function createPitch(formData: FormData, pitch: string) {
    try {
        // Establish the DB connection on the server side
        await dbConnect();

        const newPitch = await Startup.create({
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            image: formData.get("link"),
            pitch: pitch,
        });

        return {status: "SUCCESS", _id: newPitch._id};
    } catch (err) {
        console.error(err);
        return {status: "ERROR", error: "Failed to create pitch."};
    }
}
