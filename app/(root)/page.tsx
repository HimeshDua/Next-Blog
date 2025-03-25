"use client";

import SearchForm from "@/components/SearchForm";
import StartUpCards from "@/components/StartUpCards";
import { getAllStartups } from "@/lib/actions/data";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define the type for startup posts
interface StartupTypeCard {
  createdAt: string;
  views: number;
  author: { _id: string; name: string; avatar: string; verified?: boolean };
  _id: string;
  title: string;
  description: string;
  link: string;
  slug: string;
  category: string;
  featured?: boolean;
}

export default function Home() {
  const searchParams = useSearchParams();
  const query: string = searchParams.get("query") || "";

  // Properly typed state variables
  const [posts, setPosts] = useState<StartupTypeCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Prevent memory leaks
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const data: StartupTypeCard[] = await getAllStartups(query);
        if (isMounted) {
          setPosts(data || []);
        }
      } catch (err) {
        if (isMounted) setError("Failed to fetch startups.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading mx-auto">
          Pitch Your Startup,
          <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="container mb-16">
        <p className="heading bg-white ms-0 font-medium text-black text-3xl mx-auto">
          {query ? `Search Results For "${query}"` : "Search For A Startup"}
        </p>

        {loading && <p className="text-center w-full">Loading...</p>}
        {error && <p className="text-center w-full text-red-500">{error}</p>}

        <ul className="card_grid mt-7">
          {!loading && !error && posts.length > 0
            ? posts.map((post: StartupTypeCard) => (
                <StartUpCards
                  key={post._id}
                  post={{
                    ...post,
                    createdAt:
                      typeof post.createdAt === "string" &&
                      post.createdAt.trim() !== ""
                        ? new Date(post.createdAt).toISOString()
                        : new Date().toISOString(),
                  }}
                />
              ))
            : !loading &&
              !error && <p className="text-center w-full">No results found</p>}
        </ul>
      </section>
    </>
  );
}
