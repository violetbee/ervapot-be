"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userRegisterSchema = void 0;
const zod_1 = require("zod");
exports.userRegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email({
        message: "Geçerli bir email adresi giriniz.",
    }),
    password: zod_1.z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
    name: zod_1.z.string({
        message: "Kullanıcı adı boş olamaz.",
    }),
    surname: zod_1.z.string({
        message: "Kullanıcı soyadı boş olamaz.",
    }),
    role: zod_1.z.enum(["EMPLOYEE", "ADMIN"], {
        message: "Lütfen üyelik tipini seçiniz.",
    }),
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email({
        message: "Geçerli bir email adresi giriniz.",
    }),
    password: zod_1.z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
});
