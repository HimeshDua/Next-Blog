import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import Author from "@/models/Author.model";
import dbConnect from "@/lib/db";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        async session({session}) {

            await dbConnect();

            let dbUser = await Author.findOne({email: session.user.email});

            if (!dbUser) {
                dbUser = await Author.create({
                    name: session.user.name,
                    email: session.user.email,
                    username: session.user.email.split("@")[0], // Auto-generate username
                    avatar: session.user.image, // Fix field name
                    bio: "This user has not added a bio yet.",
                });
            }

            session.user.id = dbUser._id;
            // session.user.username = dbUser.username;
            // session.user.avatar = dbUser.avatar;

            return session;
        }
    }
});
