import {z} from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(16).max(1000),
    category: z.string().min(3).max(100),
    link: z.string().url().refine(async (url: string): Promise<boolean | undefined> => {
            try {
                const res = await fetch(url, {
                    method: 'HEAD',
                });
                return res.ok && (
                    res.headers.get('content-type')?.startsWith('image/'));
            } catch {
                return false;
            }
        }
    ),


})