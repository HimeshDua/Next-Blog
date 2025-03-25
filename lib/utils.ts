import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date | undefined | null) {
    if (!date) return "Unknown Date";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "Invalid Date";

    return parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

