"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const video_route_1 = __importDefault(require("./routes/video.route"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const mongo_connection = mongoose_1.default
    .connect(String(process.env.MONGODB_URL))
    .then(() => {
    console.log('connected');
})
    .catch((error) => {
    console.log('Connect fail');
    console.log(error);
});
app.use((0, express_session_1.default)({
    name: 'example.sid',
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60
    },
    store: connect_mongo_1.default.create({
        client: mongoose_1.default.connection.getClient()
    })
}));
app.use('/api/playlist', video_route_1.default);
app.use('/', (req, res, next) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie("hello", "world");
    res.status(201).send({ msg: "Hello" });
});
// declare module 'express-session' {
//     interface SessionData {
//       visited: Boolean;
//     }
//   }
app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    }
    catch (err) {
        console.log(err);
    }
});
