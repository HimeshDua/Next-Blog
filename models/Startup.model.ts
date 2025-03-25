import {Schema, model, models, Types} from "mongoose";

interface StartupInterface {
    title: string;
    slug: string;
    author: Types.ObjectId;
    views: number;
    description: string;
    link: string;
    category: string;
    pitch: string;
}

const startupSchema = new Schema<StartupInterface>(
    {
        title: {type: String, required: true},
        slug: {type: String, required: true, unique: true},
        author: {type: Schema.Types.ObjectId, ref: "Author", required: true},
        views: {type: Number, default: 0},
        description: {type: String, required: true},
        link: {type: String, required: true},
        category: {type: String, required: true},
        pitch: {type: String, required: true},
    },
    {timestamps: true}
);

startupSchema.pre("validate", function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "");
    }
    next();
});


const Startup = models.Startup || model<StartupInterface>("Startup", startupSchema);

export default Startup;
