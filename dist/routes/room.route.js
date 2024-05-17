"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const room_controller_1 = require("../controllers/room.controller");
const roomRouter = (0, express_1.Router)();
// router.post('', videoController.addVideo); 
roomRouter.get('', room_controller_1.roomController.createRoom);
roomRouter.get('/:id', room_controller_1.roomController.joinRoom);
exports.default = roomRouter;
