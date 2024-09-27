"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchErrors = void 0;
const catchErrors = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    }
    catch (error) {
        // pass error on
        next(error);
    }
};
exports.catchErrors = catchErrors;
