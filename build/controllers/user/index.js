"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.getMe = exports.getUserById = exports.getAllUsers = void 0;
const user_service_1 = require("../../services/user/user.service");
const thrower_1 = require("../../utils/thrower");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1._getAllUsers)();
        return res.status(200).json({
            data: users,
            message: "Kullanıcılar başarıyla getirildi.",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            message: "ID parametresi boş olamaz.",
        });
    }
    try {
        const user = yield (0, user_service_1._getUserById)(id);
        return res.status(200).json({
            data: user,
            message: "Kullanıcı başarıyla getirildi.",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.getUserById = getUserById;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    if (!id) {
        return res.status(400).json({
            message: "ID parametresi boş olamaz.",
        });
    }
    try {
        const user = yield (0, user_service_1._getUserById)(id);
        return res.status(200).json({
            data: user,
            message: "Kullanıcı başarıyla getirildi.",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.getMe = getMe;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            message: "ID parametresi boş olamaz.",
        });
    }
    try {
        const user = yield (0, user_service_1._updateUserById)(id, req.body);
        return (0, thrower_1.beautyApi)({
            res,
            status: 201,
            message: "Çalışan başarıyla güncellendi.",
        });
    }
    catch (error) {
        (0, thrower_1.beautyApi)({ res, status: 500, error });
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            message: "ID parametresi boş olamaz.",
        });
    }
    try {
        yield (0, user_service_1._deleteUserById)(id);
        return (0, thrower_1.beautyApi)({
            res,
            status: 201,
            message: "Çalışan başarıyla silindi.",
        });
    }
    catch (error) {
        (0, thrower_1.beautyApi)({ res, status: 500, error });
    }
});
exports.deleteUserById = deleteUserById;
