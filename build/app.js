"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const settings_1 = require("./config/settings");
const logger_1 = require("./middlewares/logger");
const app = (0, express_1.default)();
const corsOptions = {
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsOptions));
app.use(logger_1.logger);
dotenv_1.default.config();
app.use((0, cookie_parser_1.default)());
app.listen(settings_1.PORT);
(0, routes_1.default)(app);
