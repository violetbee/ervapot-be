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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._register = exports._login = void 0;
const db_1 = require("../../utils/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = require("../../utils/token");
const _login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (!user) {
        throw new Error("Kullanıcı bulunamadı.");
    }
    const isEqual = yield bcryptjs_1.default.compare(password, user.password);
    if (!isEqual) {
        throw new Error("Geçersiz şifre.");
    }
    const accessToken = (0, token_1.generateToken)({
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        phoneNumber: user.phoneNumber,
    });
    const refreshToken = (0, token_1.generateToken)({ id: user.id, email: user.email }, "refresh");
    return { accessToken, refreshToken, user };
});
exports._login = _login;
const _register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield db_1.prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });
    if (isUserExist) {
        throw new Error("Bu e-posta adresi ile kayıtlı bir kullanıcı bulunmaktadır.");
    }
    const user = yield db_1.prisma.user.create({
        data: Object.assign(Object.assign({}, data), { password: yield bcryptjs_1.default.hash(data.password, 12) }),
    });
    return user;
});
exports._register = _register;
