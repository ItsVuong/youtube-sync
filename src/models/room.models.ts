import mongoose, { Schema, Model, Document } from 'mongoose';
import { nanoid } from 'nanoid';
import { usernameGen } from '../utils/username-generator';

interface RoomDocument extends Document {
    _id: string;
    createdAt: Date;
    password?: string;
    users: [{
        sessionId: string,
        username: string,
        isActive: Boolean
    }];
    playlist: [{
        _id: string,
        title: string,
        url: string,
        html: string,
        thumbnail_url: string,
        provider_name: string,
        author_name: string
    }];
    lastActivity: Date
}

const roomSchema = new Schema(
    {
        _id: {
            type: String,
        },

        createdAt: {
            type: Date,
            default: Date.now
        },

        password: {
            type: String,
            require: false
        },

        users: {
            type: [{
                sessionId: { type: String, require: true },
                username: { type: String, require: true },
                isActive: {
                    type: Boolean,
                    default: true
                }
            }],
            default: []
        },

        playlist: {
            type: [{
                title: {
                    type: String,
                    required: [true, "Title can not be empty"]
                },

                url: {
                    type: String,
                    required: [true, "Video url can not be empty"]
                },

                html: {
                    type: String,
                    require: true
                },

                thumbnail_url: {
                    type: String,
                    required: [true, "Thumbnail can not be empty"]
                },

                provider_name: {
                    type: String,
                    require: true
                },

                author_name: {
                    type: String,
                    require: true
                }
            }],
            default: []
        },

        lastActivity: {
            type: Date,
            default: Date.now(),
            // partialFilterExpression: { activeUsers : [] },
            // expires: 60
        }
    }
);

roomSchema.pre('save', function (next) {
    if (this.isNew) {
        this._id = nanoid(12);
        return next();
    }
})

roomSchema.pre('findOneAndUpdate', async function (next) {
    const updateData = this.getUpdate() as { '$push': { users: { sessionId?: string, username?: string } } };
    const updateQuery = this.getQuery() as { _id: string };

    if (updateData.$push?.users) {
        const roomModel = mongoose.model<RoomDocument>('Room', roomSchema);
        const document: RoomDocument = (await roomModel.findOne({ _id: updateQuery._id }).lean())

        const usernameArray = document?.users.map(user => user.username);
        if (usernameArray && usernameArray.includes(updateData.$push.users.username)) {
            throw new Error('Duplicate username error');
        }

        const userSessionArray = document?.users.map(user => user.sessionId);
        if (userSessionArray && userSessionArray.includes(updateData.$push.users.sessionId)) {
            throw new Error('Duplicate sessionId error')
        }
    }
    next();
});


const Room = mongoose.model<RoomDocument>('Room', roomSchema);


export { Room, RoomDocument };
