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
exports.roomService = void 0;
const room_models_1 = require("../models/room.models");
// users: { $not: { $elemMatch: { active: true } } }
const getRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield room_models_1.Room.find({ roomId });
});
//users: {sessionId: new mongoose.Types.ObjectId('6640fe14253a18b1f9b833f2'), userName:'FlyingRacoon'}
const createRoom = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i <= 5; i++) {
        try {
            return yield room_models_1.Room.create({ users: { sessionId: sessionId } });
        }
        catch (error) {
            console.log('retry number: ', i);
            console.log(error);
            if (i >= 5)
                throw (error);
        }
    }
});
const joinRoom = (roomId, sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    const room = room_models_1.Room.updateOne({ _id: roomId }, { $push: { users: { sessionId: sessionId } } });
});
exports.roomService = {
    createRoom,
    getRoom
};
