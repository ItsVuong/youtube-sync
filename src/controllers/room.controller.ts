import { NextFunction, Request, Response } from "express";
import { roomService } from "../services/room.service";
import AddUserDto from "../dto/add-user.dto";
import { usernameGen } from "../utils/username-generator";
import axios from "axios";
import { IVideo } from "../models/video.model";
// users: { $not: { $elemMatch: { active: true } } }
const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log('cookie: ', req.headers)
        const userData: AddUserDto = {
            sessionId: req.sessionID,
            username: req.body.username || usernameGen()
        };
        const room = await roomService.createRoom(userData);
        console.log(userData)
        res.status(200).json(room);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

const joinRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("joining room")
        const roomId: string = req.params.id;
        const userData: AddUserDto = {
            sessionId: req.sessionID,
            username: req.body.username || usernameGen()
        };
        const result = await roomService.joinRoom(roomId, userData);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const addToPlaylist = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const url = body?.url;
    const roomId = req.params.id;

    axios.get(`https://noembed.com/embed`, {
        params: {
            //https://www.youtube.com/watch?v=2PzkEcYJUQw&t=480s
            url: url,
        },
    }).then(async response => {
        try {
            if (response.data?.error) {
                res.status(200).json({ 'error': `Found no video with the provided url: ${url}` });
                return;
            }
            
            const videoData: IVideo = response?.data as IVideo;
            // console.log('data: ', videoData)
            const result = await roomService.addToPlaylist(roomId, videoData);
            return res.status(201).send(result);
        } catch (error) {
            res.status(500).json(error)
        }
    }).catch(error => {
        res.status(401).json(error);
    });
}

export const roomController = {
    createRoom,
    joinRoom,
    addToPlaylist
}