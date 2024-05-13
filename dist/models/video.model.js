"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const videoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title can not be empty"]
    },
    url: {
        type: String,
        require: true
    },
    html: {
        type: String,
        require: true
    },
    thumbnail_url: {
        type: String,
        require: true
    },
    provider_name: {
        type: String,
        require: true
    },
    author_name: {
        type: String,
        require: true
    }
});
const Video = mongoose_1.default.model('Video', videoSchema);
exports.Video = Video;
const build = (attr) => {
    return new Video(attr);
};
// const mongoose = require('mongoose');
// const VideoSchema = mongoose.Schema({
//     title: {
//         type: String,
//         required:[true, "Title can not be empty"]
//     },
//     url:{
//         type: String,
//         require:true
//     },
//     html:{
//         type: String,
//         require: true
//     },
//     thumbnail_url: {
//         type: String,
//         require: true
//     },
//     provider_name: {
//         type: String,
//         require: true
//     },
//     author_name: {
//         type: String,
//         require: true
//     }
// });
// const Video = mongoose.model("Video", VideoSchema);
// module.exports = Video;
