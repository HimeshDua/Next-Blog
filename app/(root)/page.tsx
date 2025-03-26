"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchForm from "@/components/SearchForm";
import StartUpCards from "@/components/StartUpCards";

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

function StartupSearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [posts, setPosts] = useState<StartupTypeCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/startup?query=${query}`);
        const data: StartupTypeCard[] = await res.json();
        setPosts(data || []);
      } catch {
        setError("Failed to fetch startups.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <>
      <section className="container mb-16">
        <p className="heading bg-white ms-0 font-medium text-black text-3xl mx-auto">
          {query ? `Search Results For "${query}"` : "Search For A Startup"}
        </p>

        {loading && <p className="text-center w-full">Loading...</p>}
        {error && <p className="text-center w-full text-red-500">{error}</p>}

        <ul className="card_grid mt-7">
          {!loading && !error && posts.length > 0
            ? posts.map((post) => <StartUpCards key={post._id} post={post} />)
            : !loading &&
              !error && <p className="text-center w-full">No results found</p>}
        </ul>
      </section>
    </>
  );
}

export default function Home() {
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

        <SearchForm />
      </section>

      {/* ✅ Wrap in Suspense */}
      <Suspense
        fallback={<p className="text-center w-full">Loading search...</p>}
      >
        <StartupSearchResults />
      </Suspense>
    </>
  );
}
