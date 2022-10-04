"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
// middleware
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(cookie_parser_1.default());
// routes
app.get('/', (req, res) => {
    res.json({ message: 'Home' });
});
// server listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
