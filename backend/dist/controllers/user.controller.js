"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHandler = void 0;
const http_1 = require("../constants/http");
const user_model_1 = require("../models/user.model");
const appAssert_1 = require("../utils/appAssert");
const catchErrors_1 = require("../utils/catchErrors");
exports.getUserHandler = (0, catchErrors_1.catchErrors)(async (req, res) => {
    const user = await user_model_1.UserModel.findById(req.userId);
    (0, appAssert_1.appAssert)(user, http_1.NOT_FOUND, 'User not found');
    return res.status(http_1.OK).json(user.omitPassword());
});
