import { NextFunction, Request, Response } from "express";
import { Room } from "../models/room.models";
import { roomService } from "../services/room.service";
// users: { $not: { $elemMatch: { active: true } } }
const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomData = {
            
        };

        const room = await roomService.createRoom();
        res.status(200).json(room);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const roomController = {
    createRoom
}