import mongoose, { Schema, Model, Document } from 'mongoose';

interface IVideo {
    title: String;
    url: String;
    html: String;
    thumbnail_url: String,
    provider_name: String,
    author_name: String
}

const roomSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title can not be empty"]
        },

        createdAt: {
            type: Date(),
            default: Date.now
        },

        isEmpty: {
            type: Boolean,
            required: true
            
        },

        password: {
            type: String,
            require: false
        },

        activeUsers: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },

        lastActivity: {
            type: Date,
            default: Date.now(),
            partialFilterExpression: { activeUsers : [] },
            expireAf: 60
        }
    }    
);

const Video = mongoose.model('Video', roomSchema);

const build = (attr: IVideo) => {
    return new Video(attr);
}
export {Video, IVideo};
