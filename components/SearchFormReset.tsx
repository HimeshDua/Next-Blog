"use client"
import Link from "next/link";
import {X} from "lucide-react";
import { Button } from "./ui/button";

const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector(".search-form") as HTMLFormElement
        if (form) form.reset()
    }

    return (
        <Button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center" type="reset"
                onClick={reset}>
            <Link href="/" className="flex items-center justify-center w-full h-full">
                <X className="size-5 m-auto self-center"/>
            </Link>
        </Button>
    )
}
export default SearchFormReset
