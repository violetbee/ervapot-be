"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beautyApi = void 0;
const beautyApi = ({ res, message, status, error, data, }) => {
    return res.status(status).json({
        result: data,
        [error ? "error" : "message"]: (error === null || error === void 0 ? void 0 : error.message) || message,
        status: error ? "fail" : "success",
    });
};
exports.beautyApi = beautyApi;
