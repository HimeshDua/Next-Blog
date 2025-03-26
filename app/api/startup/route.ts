    import {NextResponse} from "next/server";
    import Startup from "@/models/Startup.model";
    import {auth} from "@/auth";
    import { getAllStartups } from "../../../lib/actions/data";
    import connectToDB from "@/lib/db";

    export async function POST(req: Request) {
        try {
            const session = await auth()
            
            if (!session || !session.user) {
                return NextResponse.json(
                    {error: "Unauthorized. Please log in."},
                    {status: 401}
                );
            }

            const {title, description, category, link, pitch} = await req.json();

            if (!title || !description || !category || !link || !pitch) {
                return NextResponse.json({error: "Missing required fields."}, {status: 400})
            }
            await connectToDB();

            const newStartup = await Startup.create({
                title,
                description,
                category,
                link,
                pitch,
                author: session.user.id,
            })

            await newStartup.save()

            return NextResponse.json(
                {status: "SUCCESS", message: "Startup added successfully"},
                {status: 201}
            );
        } catch (error) {
            console.error("Error saving startup:", error);
            return NextResponse.json(
                {error: "Internal Server Error"},
                {status: 500}
            );
        }
    }



    export async function GET(req: Request) {
    try {
        await connectToDB();
        const query = new URL(req.url).searchParams.get("query") || "";
        const startups = await getAllStartups(query);
        return NextResponse.json(startups);
    } catch  {
        return NextResponse.json(
        { error: "Failed to fetch startups" },
        { status: 500 }
        );
    }
    }
