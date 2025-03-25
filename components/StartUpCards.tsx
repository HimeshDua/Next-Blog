import Image from "next/image";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { EyeIcon, ArrowRight, Verified } from "lucide-react";

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

const StartUpCards = ({ post }: { post: StartupTypeCard }) => {
    const {
        createdAt,
        views,
        author: { _id: authorId, name, avatar, verified },
        _id,
        title,
        description,
        link,
        category,
        featured,
    } = post;

    return (
        <li className="group relative h-full overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[6px_6px_0px_0px_rgba(238,43,105,1)] dark:border-gray-700 dark:bg-gray-900 dark:hover:shadow-[6px_6px_0px_0px_rgba(238,43,105,0.8)]">
            {/* Featured ribbon */}
            {featured && (
                <div className="absolute -left-8 top-4 z-10 w-32 rotate-45 bg-primary py-1 text-center text-xs font-bold text-white shadow-md">
                    Featured
                </div>
            )}

            {/* Image with hover effect */}
            <div className="relative h-48 overflow-hidden">
                <Link href={`/startup/${_id}`} className="block h-full">
                    <Image
                        src={link || '/default-startup.jpg'}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>

                {/* Category badge */}
                <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm">
          {category}
        </span>
            </div>

            {/* Card Content */}
            <div className="flex h-[calc(100%-12rem)] flex-col p-5">
                {/* Meta info - Date & Views */}
                <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {formatDate(createdAt)}
          </span>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <EyeIcon className="h-4 w-4" />
                        <span>{views.toLocaleString()}</span>
                    </div>
                </div>

                {/* Title & Description */}
                <div className="mb-4 flex-1">
                    <Link href={`/startup/${_id}`}>
                        <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2 hover:text-primary dark:text-white dark:hover:text-primary-400">
                            {title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3 dark:text-gray-300">
                            {description}
                        </p>
                    </Link>
                </div>

                {/* Author & CTA */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-black">
                            <Image
                                src={avatar || "/default-avatar.png"}
                                alt={name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                            />
                            {verified && (
                                <Verified className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-blue-500 text-white" />
                            )}
                        </div>
                        <div>
                            <Link
                                href={`/user/${authorId}`}
                                className="flex items-center gap-1 text-sm font-medium hover:underline dark:text-white"
                            >
                                {name}
                                {verified && (
                                    <Verified className="h-3 w-3 text-blue-500" />
                                )}
                            </Link>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                Founder
              </span>
                        </div>
                    </div>

                    <Link
                        href={`/startup/${_id}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-all hover:scale-110 hover:bg-primary/90"
                        aria-label={`Read more about ${title}`}
                    >
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </li>
    );
};

export default StartUpCards;