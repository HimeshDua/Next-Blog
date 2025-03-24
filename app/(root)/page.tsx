import SearchForm from "@/components/SearchForm";
import StartUpCards from "@/components/StartUpCards";
import {getAllStartups} from "@/lib/actions/data";

interface Author {
    _id: number;
    name: string;
    avatar: string;
}

interface StartUpTypeCard {
    _createdAt: Date;
    views: number;
    author: Author;
    _id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
    category: string;
}

export default async function Home({searchParams}: { searchParams: Promise<{ query?: string }> }) {
    const {query} = await searchParams;

    // Fetch startup posts from database
    const posts = await getAllStartups();

    return (
        <>
            <section className="pink_container pattern">
                <h1 className="heading mx-auto">Pitch Your Startup,<br/> Connect With Entrepreneurs</h1>
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competitions.
                </p>

                <SearchForm query={query}/>
            </section>

            <section className="container mb-16">
                <p className="heading  text-4xl mx-auto">
                    {query ? `Search Results For "${query}"` : "Search For A Startup"}
                </p>
                <ul className="card_grid mt-7">
                    {posts?.length > 0 ? (
                        posts.map((post: StartUpTypeCard) => (
                            <StartUpCards key={post._id} post={post}/>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </ul>
            </section>
        </>
    );
}
