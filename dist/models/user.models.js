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
const roomSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title can not be empty"]
    },
    createdAt: {
        type: Date(),
        default: Date.now
    },
    isEmpty: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        require: false
    },
    activeUsers: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastActivity: {
        type: Date,
        default: Date.now(),
        partialFilterExpression: { activeUsers: [] },
        expireAf: 60
    }
});
const Video = mongoose_1.default.model('Video', roomSchema);
exports.Video = Video;
const build = (attr) => {
    return new Video(attr);
};
