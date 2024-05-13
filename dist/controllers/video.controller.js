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
Object.defineProperty(exports, "__esModule", { value: true });
const Video = require("../models/video.model");
const axios = require('axios');
exports.addVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const body = req.body;
        const url = (_a = body.params) === null || _a === void 0 ? void 0 : _a.url;
        const response = yield axios.get(`https://noembed.com/embed`, {
            params: {
                //https://www.youtube.com/watch?v=2PzkEcYJUQw&t=480s
                url: url,
            },
        });
        const videoData = response.data;
        const video = yield Video.create(videoData);
        res.status(200).json(video);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.getAllVids = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video.find({});
        res.status(200).json(videos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
