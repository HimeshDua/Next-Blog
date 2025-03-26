'use client'

import {useSearchParams} from 'next/navigation'

function Search(query: string) {
    return useSearchParams().get(query)
}

export default Search

