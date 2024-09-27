"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../constants/env");
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(env_1.MONGO_URI);
        console.log('Connected to database');
    }
    catch (error) {
        console.error('Error connecting to database: ', error);
        process.exit(1);
    }
};
exports.connectToDatabase = connectToDatabase;
