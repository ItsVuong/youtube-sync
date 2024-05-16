import mongoose, { Schema, Model, Document } from 'mongoose';
import { nanoid } from 'nanoid';
import { usernameGen } from '../utils/username-generator';

interface RoomDocument extends Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    password?: String;
    users: [{
        sessionId: String,
        username: String,
        isActive: Boolean
    }];
    playlist: [{
            title: String,
            url: String,
            html: String,
            thumbnail_url: String,
            provider_name: String,
            author_name: String
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
                    sessionId: {type: String, require:true},
                    username: {type: String, require: true},
                    isActive: {
                        type: Boolean,
                        default: true
                    }
                }], 
            default: []
        },

        playlist: {
            type:[{
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
    if (this.isNew){
    const username = usernameGen()
    // console.log('generating id: ', nanoid(12));
    this._id = nanoid(12);
    this.users[0].username = username;
    return next();}
})

roomSchema.methods.generateUsername = async function () {
    const room = this as RoomDocument;
    let usernames: string[] = room.users.map((user: any) => user.username);
    return usernameGen();
}

const Room = mongoose.model('Room', roomSchema);


export {Room, RoomDocument};
