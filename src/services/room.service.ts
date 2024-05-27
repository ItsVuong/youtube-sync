
import axios from "axios";
import AddUserDto from "../dto/add-user.dto";
import { RoomDocument, Room } from "../models/room.models";
import mongoose from "mongoose";
import { IVideo } from "../models/video.model";
// users: { $not: { $elemMatch: { active: true } } }
const getRoom = async (roomId: String) => {
    return await Room.find({ roomId });
}
//users: {sessionId: new mongoose.Types.ObjectId('6640fe14253a18b1f9b833f2'), userName:'FlyingRacoon'}
const createRoom = async (userData: AddUserDto) => {
    try {
        return await Room.create({ users: userData });
    } catch (error) {
        console.log(error);
        throw (error);
    }
}

const joinRoom = async (roomId: string, userData: AddUserDto) => {
    try {
        const room: RoomDocument = await Room.findOne({ _id: roomId });
        const userSessions = room.users.map(user => user.sessionId)

        if (userSessions.includes(userData.sessionId)) {
            return room;
        }
        const result = await Room.findOneAndUpdate({ _id: roomId }, { $push: { users: userData } }, { new: true });
        return result;
    } catch (error: any) {
        console.log(error)
    }
}


const addToPlaylist = async (roomId: string, videoData: IVideo) => {
    try {
        const result = await Room.updateOne({ _id: roomId }, { $push: { playlist: videoData } });
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
}

const removeVideo = async (roomId: string, videoIndex: number): Promise<any> => {
        console.log('is this working')
        const result = Room.updateOne(
            { '_id': roomId },
            [{
                $set: {
                    playlist: {
                        $concatArrays: [
                            { $slice: ["$playlist", videoIndex] },
                            { $slice: ["$playlist", { $add: [1, videoIndex] }, { $size: "$playlist" }] }
                        ]
                    }
                }
            }]);
        return result;
}

const updatePlaylist = async (roomId: string, playlist: Array<any>) => {
    const result = Room.updateOne(
        {_id: roomId},
        {$set: {playlist: playlist}}
    )

    return result;
}

export const roomService = {
    createRoom,
    getRoom,
    joinRoom,
    addToPlaylist,
    removeVideo,
    updatePlaylist
}