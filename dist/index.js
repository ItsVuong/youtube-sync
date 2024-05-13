"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const video_route_1 = __importDefault(require("./routes/video.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
// app.use(cors);
mongoose_1.default
    .connect(String(process.env.MONGO_URI))
    .then(() => {
    console.log('connected');
})
    .catch((error) => {
    console.log('Connect fail');
    console.log(error);
});
app.get('', (req, res, next) => {
    console.log('endpoint reached');
    res.json({});
});
app.use('/video', video_route_1.default);
// const video = require('./routes/video.route');
// app.use('/api/playlist', video);
app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    }
    catch (err) {
        console.log(err);
    }
});
