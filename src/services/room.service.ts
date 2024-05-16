
import { RoomDocument, Room } from "../models/room.models";
import mongoose from "mongoose";
// users: { $not: { $elemMatch: { active: true } } }
const getRoom = async (roomId: String) => {
    return await Room.find({roomId});
}
//users: {sessionId: new mongoose.Types.ObjectId('6640fe14253a18b1f9b833f2'), userName:'FlyingRacoon'}
const createRoom = async (sessionId: string) => {
    try {
        return await Room.create({users:{sessionId: sessionId} });   
    } catch (error) {
        console.log(error);
        throw(error);
    }
}


export const roomService = {
    createRoom,
    getRoom
}