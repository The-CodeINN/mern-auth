"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONE_DAY_MS = exports.oneHourFromNow = exports.fiveMinutesAgo = exports.fifteenMinutesFromNow = exports.sevenDaysFromNow = exports.oneDayFromNow = exports.oneYearFromNow = void 0;
const oneYearFromNow = () => {
    return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
};
exports.oneYearFromNow = oneYearFromNow;
const oneDayFromNow = () => {
    return new Date(Date.now() + 24 * 60 * 60 * 1000);
};
exports.oneDayFromNow = oneDayFromNow;
const sevenDaysFromNow = () => {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
};
exports.sevenDaysFromNow = sevenDaysFromNow;
const fifteenMinutesFromNow = () => {
    return new Date(Date.now() + 15 * 60 * 1000);
};
exports.fifteenMinutesFromNow = fifteenMinutesFromNow;
const fiveMinutesAgo = () => {
    return new Date(Date.now() - 5 * 60 * 1000);
};
exports.fiveMinutesAgo = fiveMinutesAgo;
const oneHourFromNow = () => {
    return new Date(Date.now() + 60 * 60 * 1000);
};
exports.oneHourFromNow = oneHourFromNow;
exports.ONE_DAY_MS = 24 * 60 * 60 * 1000;
