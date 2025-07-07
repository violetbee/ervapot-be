"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictRoutes = void 0;
const restrictRoutes = (cb, exceptedRoutes) => {
    const whiteList = exceptedRoutes;
    return (req, res, next) => {
        if (whiteList.includes(`/${req.originalUrl.split("/")[1]}`)) {
            return next();
        }
        if (whiteList.includes(req.originalUrl)) {
            return next();
        }
        cb(req, res, next);
    };
};
exports.restrictRoutes = restrictRoutes;
