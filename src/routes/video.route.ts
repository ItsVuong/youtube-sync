import {Request, Response, Router} from "express";
const router = Router();

// router.get('/', (req: Request, res: Response) => {
//     res.send([]);
// });
// const express = require('express');
// const router = express.Router();
const videoController = require('../controllers/video.controller');

router.post('', videoController.addVideo); 

router.get('', videoController.getAllVids);

export default router;  