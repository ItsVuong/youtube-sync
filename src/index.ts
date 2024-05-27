import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import cors from "cors";
import session from 'express-session';
import MongoStore from "connect-mongo";
import cron from 'node-cron';
import { Room } from "./models/room.models";
import router from "./routes/index.route";
import http from 'http';
import socketServer from "./utils/socketio";
dotenv.config();

const app: Express = express();
const API_PORT = process.env.API_PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;
app.use(express.json());
app.use(cors<Request>({
    origin: process.env.FRONT_END_URL,
    optionsSuccessStatus: 200,
    credentials: true
}));

const server = http.createServer(app);
socketServer(server, SOCKET_PORT);

mongoose
    .connect(String(process.env.MONGODB_URL))
    .then(() => {
        console.log('connected')
    })
    .catch((error) => {
        console.log('Connect fail');
        console.log(error);
    });

app.use(session({
    name: 'example.sid',
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 60 * 12,
        httpOnly: true,
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient()
    })
}));

app.use('/', router);
declare module 'express-session' {
    interface SessionData {
        visited: Boolean;
    }
}



cron.schedule('0 1 * * *', async function () {
    const threshold = Date.now() - (60 * 1000);
    console.log(new Date(threshold).toISOString())
    await Room.deleteMany({
        lastActivity: { $lt: new Date(threshold).toISOString() }
    });
});

app.listen(
    API_PORT, () => {
        try { console.log(`Server is running on port ${API_PORT}`) }
        catch (err) {
            console.log(err);
        }
    }
)