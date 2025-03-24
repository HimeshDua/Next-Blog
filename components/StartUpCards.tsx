import Image from "next/image";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import {EyeIcon} from "lucide-react";

interface StartupTypeCard {
    _createdAt: Date;
    views: number;
    author: { _id: number; name: string; avatar: string };
    _id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
    category: string;
}

const StartUpCards = ({post}: { post: StartupTypeCard }) => {
    const {
        _createdAt,
        views,
        author: {_id: authorId, name, avatar},
        _id,
        title,
        description,
        image,
        category,
    } = post;

    return (
        <li className="startup-card group p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 flex flex-col gap-4">
            {/* Image */}
            <Link href={`/startup/${_id}`} className="block overflow-hidden rounded-xl">
                <Image
                    src={image}
                    alt={title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
            </Link>

            {/* Meta info */}
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <p>{formatDate(_createdAt)}</p>
                <div className="flex items-center gap-1.5">
                    <EyeIcon className="w-4 h-4 text-primary" aria-hidden="true"/>
                    <span>{views}</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
                <Link href={`/startup/${_id}`} className="hover:underline">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">{title}</h3>
                </Link>
                <p className="text-base text-gray-700 dark:text-gray-300 line-clamp-2">{description}</p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <Image
                        src={avatar || "https://i.pravatar.cc/40?u=4"}
                        alt={`${name}'s profile picture`}
                        fill
                        sizes="40px"
                        priority={true}
                        placeholder="blur"
                        blurDataURL="https://placehold.co/40x40"

                        className="object-cover border border-gray-300 dark:border-gray-700"
                    />
                </div>


                <div>
                    <Link href={`/user/${authorId}`}
                          className="hover:underline text-gray-800 dark:text-gray-200 text-sm">
                        {name}
                    </Link>
                    <p className="text-xs text-primary font-medium mt-0.5">{category}</p>
                </div>
            </div>
        </li>
    );
};

export default StartUpCards;
