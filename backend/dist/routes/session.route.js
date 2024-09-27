"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = void 0;
const express_1 = require("express");
const session_controller_1 = require("../controllers/session.controller");
const sessionRoutes = (0, express_1.Router)();
exports.sessionRoutes = sessionRoutes;
// prefix /sessions
sessionRoutes.get('/', session_controller_1.getSessionHandler);
sessionRoutes.delete('/:id', session_controller_1.deleteSessionHandler);
