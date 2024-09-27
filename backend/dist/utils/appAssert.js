"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appAssert = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const appError_1 = require("./appError");
/**
 * Asserts a condition and throws an AppError if the condition is false.
 */
const appAssert = (condition, httpStatusCode, message, appErrorCode) => (0, node_assert_1.default)(condition, new appError_1.AppError(httpStatusCode, message, appErrorCode));
exports.appAssert = appAssert;
