"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRoutes = (0, express_1.Router)();
exports.authRoutes = authRoutes;
// prefix /auth
authRoutes.post('/register', auth_controller_1.registerHandler);
authRoutes.post('/login', auth_controller_1.loginHandler);
authRoutes.get('/logout', auth_controller_1.logoutHandler);
authRoutes.get('/refresh', auth_controller_1.refreshHandler);
authRoutes.get('/email/verify/:code', auth_controller_1.verifyEmailHandler);
authRoutes.post('/password/forgot', auth_controller_1.sendPasswordHandler);
authRoutes.post('/password/reset', auth_controller_1.resetPasswordHandler);
