import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose'
// const mongoose = require('mongoose'); 
import cors from "cors";
import videoRouter from './routes/video.route'
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors<Request>());

mongoose
    .connect(String(process.env.MONGODB_URL))
    .then(() => {
        console.log('connected')
    })
    .catch((error) => {
        console.log(process.env.MONGODB_URL)
        console.log('Connect fail');
        console.log(error);
    });



app.get('', (req: Request, res: Response, next: NextFunction) => {
    console.log('endpoint reached')
    res.json({})
})

app.use('/api/playlist', videoRouter);
// const video = require('./routes/video.route');
// app.use('/api/playlist', video);

app.listen(
    PORT, () => {
        try { console.log(`Server is running on port ${PORT}`) }
        catch (err) {
            console.log(err);
        }
    }
)