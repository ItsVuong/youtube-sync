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
exports.roomController = void 0;
const room_models_1 = require("../models/room.models");
const room_service_1 = require("../services/room.service");
// users: { $not: { $elemMatch: { active: true } } }
const createRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('cookie: ', req.cookies);
        const room = yield room_service_1.roomService.createRoom(req.sessionID);
        res.status(200).json(room);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const joinRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.id;
    const result = yield room_models_1.Room.findOneAndUpdate({ _id: roomId }, { $push: { users: { sessionId: req.sessionID } } });
    res.status(200).json(result);
});
exports.roomController = {
    createRoom,
    joinRoom
};
