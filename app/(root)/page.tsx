import SearchForm from "@/components/SearchForm";
import StartUpCards from "@/components/StartUpCards";
import { getAllStartups } from "@/lib/actions/data";

export default async function Home({ searchParams }: { searchParams: { query?: string } }) {
    const {query} = searchParams;


    const posts = await getAllStartups(query);

    return (
        <>
            <section className="pink_container pattern">
                <h1 className="heading mx-auto">Pitch Your Startup,<br /> Connect With Entrepreneurs</h1>
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competitions.
                </p>

                <SearchForm query={query} />
            </section>

            <section className="container mb-16">
                <p className="heading bg-white  ms-0 font-medium text-black text-3xl mx-auto">
                    {query ? `Search Results For "${query}"` : "Search For A Startup"}
                </p>
                <ul className="card_grid mt-7">
                    {posts?.length > 0 ? (
                        posts.map((post) => (
                            <StartUpCards
                                key={post._id.toString()}
                                post={{
                                    ...post,
                                    createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString(),
                                    _id: post._id.toString(),
                                }}
                            />
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </ul>


            </section>
        </>
    );
}
