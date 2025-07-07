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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._deleteUserById = exports._updateUserById = exports._getUserById = exports._getAllUsers = void 0;
const db_1 = require("../../utils/db");
const _getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.prisma.user.findMany({
        omit: { password: true },
    });
    if (users === null) {
        throw new Error("Kullanıcılar getirilemedi.");
    }
    return users;
});
exports._getAllUsers = _getAllUsers;
const _getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            employee: {
                select: {
                    id: true,
                },
            },
        },
    });
    if (!user) {
        throw new Error(`${id} ID'li bir kullanıcı bulunamadı.`);
    }
    return user;
});
exports._getUserById = _getUserById;
const _updateUserById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = data, rest = __rest(data, ["password"]);
    const user = yield db_1.prisma.user.update({
        where: {
            id,
        },
        data: Object.assign(Object.assign({}, (password !== "" ? data : rest)), { employee: {
                update: {
                    data: data.employee,
                },
            } }),
    });
    if (!user) {
        throw new Error("Personel güncellenemedi.");
    }
    return user;
});
exports._updateUserById = _updateUserById;
const _deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.user.delete({
        where: {
            id,
        },
    });
});
exports._deleteUserById = _deleteUserById;
