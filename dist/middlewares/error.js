"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.NotFound = void 0;
const NotFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.NotFound = NotFound;
const ErrorHandler = (err, req, res, next) => {
    const errorCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(errorCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=error.js.map