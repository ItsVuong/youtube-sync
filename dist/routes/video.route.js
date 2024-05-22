"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// router.get('/', (req: Request, res: Response) => {
//     res.send([]);
// });
// const express = require('express');
// const router = express.Router();
const videoController = require('../controllers/video.controller');
router.post('', videoController.addVideo);
router.get('', (req, res, next) => {
    console.log(req.headers.cookie);
    videoController.getAllVids(req, res, next);
});
exports.default = router;
