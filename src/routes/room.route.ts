import { NextFunction, Request, Response, Router} from "express";
import { Room } from "../models/room.models";
import mongoose from "mongoose";
import { roomController } from "../controllers/room.controller";
const roomRouter = Router();


// router.post('', videoController.addVideo); 

roomRouter.get('', roomController.createRoom);

export default roomRouter;   