import {Request, Response, Router} from "express";
const router = Router();

// router.get('/', (req: Request, res: Response) => {
//     res.send([]);
// });
// const express = require('express');
// const router = express.Router();
const videoController = require('../controllers/video.controller');

router.post('', videoController.addVideo); 

router.get('', (req, res , next) => {
    console.log(req.headers.cookie);     
    videoController.getAllVids(req, res, next);
});

export default router;  