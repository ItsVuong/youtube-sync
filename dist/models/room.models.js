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
exports.Room = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const nanoid_1 = require("nanoid");
const username_generator_1 = require("../utils/username-generator");
const roomSchema = new mongoose_1.Schema({
    _id: {
        type: String,
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
                sessionId: { type: String, require: true },
                username: { type: String, require: true },
                isActive: {
                    type: Boolean,
                    default: true
                }
            }],
        default: []
    },
    playlist: {
        type: [{
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
});
roomSchema.pre('save', function (next) {
    if (this.isNew) {
        const username = (0, username_generator_1.usernameGen)();
        // console.log('generating id: ', nanoid(12));
        this._id = (0, nanoid_1.nanoid)(12);
        this.users[0].username = username;
        return next();
    }
});
roomSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateData = this.getUpdate();
        const roomModel = mongoose_1.default.model('Room', roomSchema);
        const usersArray = (yield roomModel.find({}));
        console.log('update data: ', usersArray);
        // if (updateData.age && updateData.age <= 0) {
        //   throw new Error('Age must be a positive number');
        // }
        // You can also modify the update data (optional)
        // ...
        next(); // Call next() to proceed with update if validation passes
    });
});
const Room = mongoose_1.default.model('Room', roomSchema);
exports.Room = Room;
