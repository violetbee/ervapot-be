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
exports.logout = exports.refreshToken = exports.register = exports.login = void 0;
const token_1 = require("../../utils/token");
const auth_service_1 = require("../../services/auth/auth.service");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const auth = yield (0, auth_service_1._login)(email, password);
        const { accessToken, refreshToken } = auth;
        res.status(200).json({
            message: "Giriş işlemi başarılı!",
            user: {
                id: auth.user.id,
                email: auth.user.email,
                name: auth.user.name,
                surname: auth.user.surname,
            },
            tokens: {
                accessToken,
                refreshToken,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_service_1._register)(req.body);
        return res.status(201).json({
            data: user,
            message: "Hesabınız başarıyla oluşturuldu.",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.register = register;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshToken = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token is required" });
    }
    try {
        const { id, email, name, surname } = (0, token_1.verifyToken)(refreshToken);
        const accessToken = (0, token_1.generateToken)({ id, email, name, surname });
        return res.status(200).json({
            accessToken,
            createdAt: Date.now(),
            expireDate: Date.now() + 1000 * 60 * 30, // 30 minutes
        });
    }
    catch (error) {
        console.error("Invalid refresh token:", error);
        return res.status(403).json({ error: "Invalid or expired refresh token" });
    }
});
exports.refreshToken = refreshToken;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "Çıkış işlem başarılı!" });
});
exports.logout = logout;
