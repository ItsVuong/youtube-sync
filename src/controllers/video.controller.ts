import { NextFunction, Request, Response } from "express";
import { IVideo, Video } from "../models/video.model";
import axios from "axios";

exports.addVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const url = body?.url;

        const response = await axios.get(`https://noembed.com/embed`, {
            params: {
                //https://www.youtube.com/watch?v=2PzkEcYJUQw&t=480s
                url: url,
            },
        });

        const videoData: IVideo = response.data;
        if (videoData) {
            const video = await Video.create(videoData);
            res.status(200).json(video);
        } else {
            res.status(400).send('Video not found');
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error?.message });
    }
}

exports.getAllVids = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const videos = await Video.find({});
        res.status(200).json(videos);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}