"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const video_model_1 = require("../models/video.model");
const axios_1 = __importDefault(require("axios"));
exports.addVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const url = body === null || body === void 0 ? void 0 : body.url;
        const response = yield axios_1.default.get(`https://noembed.com/embed`, {
            params: {
                //https://www.youtube.com/watch?v=2PzkEcYJUQw&t=480s
                url: url,
            },
        });
        const videoData = response.data;
        if (videoData) {
            const video = yield video_model_1.Video.create(videoData);
            res.status(200).json(video);
        }
        else {
            res.status(400).send('Video not found');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.getAllVids = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield video_model_1.Video.find({});
        res.status(200).json(videos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
