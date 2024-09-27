"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const env_1 = require("./constants/env");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./middleware/errorHandler");
const catchErrors_1 = require("./utils/catchErrors");
const http_1 = require("./constants/http");
const auth_route_1 = require("./routes/auth.route");
const user_routes_1 = require("./routes/user.routes");
const authenticate_1 = require("./middleware/authenticate");
const session_route_1 = require("./routes/session.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((0, cors_1.default)({ origin: env_1.APP_ORIGIN, credentials: true }));
app.use((0, cookie_parser_1.default)());
app.get('/health', (0, catchErrors_1.catchErrors)(async (req, res, next) => {
    res.status(http_1.OK).json({ message: 'API is running' });
}));
app.use('/auth', auth_route_1.authRoutes);
// protected routes
app.use('/user', authenticate_1.authenticate, user_routes_1.userRoutes);
app.use('/sessions', authenticate_1.authenticate, session_route_1.sessionRoutes);
app.use(errorHandler_1.errorHandler);
app.listen(env_1.PORT, async () => {
    console.log(`Server running in ${env_1.NODE_ENV} mode on port ${env_1.PORT}`);
    await (0, db_1.connectToDatabase)();
});
