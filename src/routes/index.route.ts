import { Router } from "express";
import roomRouter from "./room.route";

const router = Router();

// router.use('/api/playlist', videoRouter);
router.use('/api/room', roomRouter);


export default router;