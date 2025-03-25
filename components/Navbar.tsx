import Link from "next/link";
import {auth} from "@/auth";
import {signInAction, signOutAction} from "@/lib/server-actions";
import Image from "next/image";

const Navbar = async () => {
    const session = await auth()

    return (
        <header className="px-5 py-3 bg-white text-black shadow-sm">
            <nav className="flex justify-between items-center">
                <h1>
                    <Link href="/">Hems</Link>
                </h1>
                <div className="flex items-center gap-5">
                    {session && session?.user ? (
                        <>
                            <Link href={"/startup/create"}>
                                <span>Create</span>
                            </Link>

                            <form action={signOutAction}>
                                <button type="submit">Signout</button>
                            </form>

                            <Link href={`/user/${session.user.id}`}>
                                <div className="relative h-10 w-10 overflow-hidden rounded-full outline-none">
                                    <Image
                                        src={session?.user?.image || "/default-avatar.png"}
                                        alt={session?.user?.name || "User's Image"}
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </Link>

                        </>
                    ) : (
                        <form action={signInAction}>
                            <button type="submit">SignIn</button>
                        </form>
                    )
                    }
                </div>
            </nav>


        </header>
    )
}
export default Navbar
