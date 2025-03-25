"use client";

import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {formSchema} from "@/lib/validation";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {toast} from "sonner";


const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        const formValues = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            link: formData.get("link") as string,
            pitch,
        };

        try {
            await formSchema.parseAsync(formValues);

            // ✅ Send data directly to API route
            const res = await fetch("/api/startup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formValues),
            });

            const result = await res.json();

            if (res.ok) {
                toast({
                    title: "Success",
                    description: "Your startup pitch has been created successfully",
                });

                router.push(`/startup/${result._id}`); // ✅ Redirect to new startup page
            } else {
                toast({
                    title: "Error",
                    description: result?.error || "Something went wrong",
                    variant: "destructive",
                });
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as Record<string, string>);

                toast({
                    title: "Validation Error",
                    description: "Please fix the highlighted fields",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Error",
                    description: "An unexpected error has occurred",
                    variant: "destructive",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">
                    Title
                </label>
                <Input
                    id="title"
                    name="title"
                    className="startup-form_input"
                    required
                    placeholder="Startup Title"
                />
                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">
                    Description
                </label>
                <Textarea
                    id="description"
                    name="description"
                    className="startup-form_textarea"
                    required
                    placeholder="Startup Description"
                />
                {errors.description && (
                    <p className="startup-form_error">{errors.description}</p>
                )}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">
                    Category
                </label>
                <Input
                    id="category"
                    name="category"
                    className="startup-form_input"
                    required
                    placeholder="Startup Category (Tech, Health, Education...)"
                />
                {errors.category && (
                    <p className="startup-form_error">{errors.category}</p>
                )}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label">
                    Image URL
                </label>
                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    required
                    placeholder="Startup Image URL"
                />
                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">
                    Pitch
                </label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value || "")}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{borderRadius: 20, overflow: "hidden"}}
                    textareaProps={{
                        placeholder:
                            "Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />
                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>

            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit Your Pitch"}
                <Send className="size-6 ml-2"/>
            </Button>
        </form>
    );
};

export default StartupForm;
