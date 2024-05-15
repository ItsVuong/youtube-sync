import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import cors from "cors";
import videoRouter from './routes/video.route';
import session from 'express-session';
import MongoStore from "connect-mongo";
import roomRouter from "./routes/room.route";
import cron from 'node-cron';
import { Room } from "./models/room.models";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors<Request>({
    credentials: true,
    origin: "http://localhost:3000"
}));

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
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient()
        })
    }));

    
app.use('/api/playlist', videoRouter);
app.use('/api/room', roomRouter);
app.use('/', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session); 
    console.log(req.session.id);
    req.session.visited= true;
    res.cookie("hello", "world", {maxAge: 30000});
    res.status(201).send({msg: "Hello"})
});

declare module 'express-session' {
    interface SessionData {
      visited: Boolean;
    }
  }

  cron.schedule('*/2 * * * *', async function() {
        const threshold = Date.now() - (60 * 1000);
        console.log(new Date(threshold).toISOString())
        await Room.deleteMany({ 
            lastActivity: { $lt: new Date(threshold).toISOString() } 
        });
  });

app.listen(
    PORT, () => {
        try { console.log(`Server is running on port ${PORT}`) }
        catch (err) {
            console.log(err);
        }
    }
)