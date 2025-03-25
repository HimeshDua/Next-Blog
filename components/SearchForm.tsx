import React from 'react'
import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import {Search} from "lucide-react";

const SearchForm = ({query}: { query?: string }) => {

    return (
        <Form action="/" scroll={false}
              className="mt-5 border-4 relative border-black search-form rounded-full bg-white w-full max-w-[60rem]">
            <input
                name="query"
                defaultValue={query}
                className="w-full relative placeholder:font-medium px-5 py-3 text-xl font-medium outline-0  rounded-full"
                type="text" placeholder="Search for a startup"/>

            <div className="flex gap-2 absolute right-5 top-1.5">
                {query && <SearchFormReset/>}


                <button className="bg-black text-white h-10 w-10 rounded-full flex items-center justify-center">
                    <Search className="size-5 m-auto self-center"/>
                </button>

            </div>
        </Form>
    )
}
export default SearchForm
