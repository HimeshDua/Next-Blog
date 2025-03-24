// import Image from "next/image";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

async function CreatePost() {
    async function handleSubmit(formData: FormData) {
        "use server";

        const file = formData.get("image") as File;
        const title = formData.get("title")?.toString().trim();
        const description = formData.get("description")?.toString().trim();
        const category = formData.get("category")?.toString().trim();

        if (!file || !title || !description || !category) {
            throw new Error("Missing fields");
        }

        // Validate file type and size (max 5MB for sanity)
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            throw new Error("Invalid file type");
        }
        if (file.size > 5 * 1024 * 1024) {
            throw new Error("File too large");
        }

        // Create unique file name
        const ext = file.name.split(".").pop();
        const uniqueName = crypto.randomUUID() + "." + ext;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.resolve("./public/uploads");
        const uploadPath = path.join(uploadDir, uniqueName);
        await writeFile(uploadPath, buffer);

        // TODO: Save to DB (title, description, category, file path)
        const filePath = `/uploads/${uniqueName}`;
        console.log({ title, description, category, filePath });

        revalidatePath("/");
        redirect("/");
    }

    return (
        <form
            action={handleSubmit}
            className="startup-card max-w-2xl mx-auto bg-white dark:bg-[var(--card)] border-[5px] border-black rounded-[22px] shadow-[2px_2px_0px_0px_rgb(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgb(238,43,105)] transition-all duration-500 p-8"
        >
            <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Create New Post</h2>

            <div className="mb-5">
                <label className="block mb-2 text-[16px] font-medium">Upload Image</label>
                <Input name="image" type="file" accept="image/*" className="startup-form_input cursor-pointer" required />
            </div>

            <div className="mb-5">
                <label className="block mb-2 text-[16px] font-medium">Title</label>
                <Input name="title" placeholder="Enter post title" className="startup-form_input" required />
            </div>

            <div className="mb-5">
                <label className="block mb-2 text-[16px] font-medium">Description</label>
                <Textarea name="description" placeholder="Write a short description..." className="startup-form_textarea" rows={4} required />
            </div>

            <div className="mb-5">
                <label className="block mb-2 text-[16px] font-medium">Category</label>
                <Input name="category" placeholder="E.g. SaaS, FinTech, AI..." className="startup-form_input" required />
            </div>

            <div className="mt-6">
                <Button type="submit" className="w-full login bg-[var(--primary)] text-white hover:shadow-[2px_2px_0px_0px_rgb(238,43,105)]">
                    Create Post
                </Button>
            </div>

            <div className="text-center mt-4">
                <Link href="/" className="text-[14px] text-[var(--primary)] hover:underline">
                    Go back to Home
                </Link>
            </div>
        </form>
    );
}

export default CreatePost;
