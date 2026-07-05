import mongoose, { Schema } from "mongoose";

const blogSchema = mongoose.Schema({

    blog_id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        // required: true,
    },
    des: {
        type: String,
        maxlength: 200,
        // required: true
    },
    content: {
<<<<<<< Updated upstream
        type: [],
        // required: true
=======
        // EditorJS shape: { blocks: [{ id, type, data }] }
        // No `type:` wrapper — Mongoose infers the nested sub-document automatically
        blocks: {
            type: [
                {
                    id:   { type: String },
                    type: { type: String },
                    data: { type: Schema.Types.Mixed },
                    _id: false
                }
            ],
            default: []
        }
>>>>>>> Stashed changes
    },
    tags: {
        type: [String],
        // required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    activity: {
        total_likes: {
            type: Number,
            default: 0
        },
        total_comments: {
            type: Number,
            default: 0
        },
        total_reads: {
            type: Number,
            default: 0
        },
        total_parent_comments: {
            type: Number,
            default: 0
        },
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'comments'
    },
    draft: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: {
            createdAt: 'publishedAt'
        }

    })

export default mongoose.model("blogs", blogSchema);