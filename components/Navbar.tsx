import Link from "next/link";
import {auth} from "@/auth";
import {signInAction, signOutAction} from "@/lib/server-actions";

const Navbar = async () => {
    const session = await auth()

    return (
        <header className="px-5 py-3 bg-white text-black shadow-sm">
            <nav className="flex justify-between items-center">
                <h1>
                    <Link href="/public">Hems</Link>
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
                                <span>{session?.user?.name}</span>
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
