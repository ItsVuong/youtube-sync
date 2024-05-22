"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const node_cron_1 = __importDefault(require("node-cron"));
const room_models_1 = require("./models/room.models");
const index_route_1 = __importDefault(require("./routes/index.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000"
}));
mongoose_1.default
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
app.use('/', (req, res, next) => {
    // console.log(req.session);
    // console.log(req.session.id);
    req.session.visited = true;
    res.cookie("hello", "world", { maxAge: 30000 });
    // res.status(201).send({msg: "Hello"})
    return next();
});
app.use('/', index_route_1.default);
node_cron_1.default.schedule('*/59 * * * *', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const threshold = Date.now() - (60 * 1000);
        console.log(new Date(threshold).toISOString());
        yield room_models_1.Room.deleteMany({
            lastActivity: { $lt: new Date(threshold).toISOString() }
        });
    });
});
app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    }
    catch (err) {
        console.log(err);
    }
});
