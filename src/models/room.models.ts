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
            default: nanoid()
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
    // console.log(this)
    const username = usernameGen()
    console.log(username);
    this.users[0].username = username;
    return next();
})

roomSchema.pre('findOneAndUpdate', function() {
    console.log(this.getFilter()); // { name: 'John' }
    console.log(this.getUpdate()); // { age: 30 }
  });

roomSchema.methods.generateUsername = async function () {
    const room = this as RoomDocument;
    let usernames: string[] = room.users.map((user: any) => user.username);
    return usernameGen();
}

const Room = mongoose.model('Room', roomSchema);


export {Room, RoomDocument};
