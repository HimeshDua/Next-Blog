import {Schema, model, models} from "mongoose";

interface AuthorInterface {
    name: string;
    username: string;
    email: string;
    avatar: string;
    bio: string;
}

const authorSchema = new Schema<AuthorInterface>(
    {
        name: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        avatar: {type: String, required: true},
        bio: {type: String, required: true},
    },
    {timestamps: true}
);

const Author = models.Author || model<AuthorInterface>("Author", authorSchema);

export default Author;
