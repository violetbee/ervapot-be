"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeType = exports.createEmployeeType = void 0;
const zod_1 = require("zod");
const createEmployeeType = () => {
    return zod_1.z
        .object({
        name: zod_1.z
            .string({
            message: "İsim zorunludur.",
        })
            .min(2, "İsim boş geçilemez."),
        surname: zod_1.z
            .string({
            message: "Soy isim zorunludur.",
        })
            .min(2, "Soy isim boş geçilemez."),
        email: zod_1.z.union([
            zod_1.z
                .string()
                .min(1, { message: "Mail zorunludur" })
                .email("Geçerli bir mail adresi değil."),
            zod_1.z.literal(""), // Boş string kabul edilir
            zod_1.z.undefined(), // Yokluğu da kabul edilir
        ]),
        password: zod_1.z.union([
            zod_1.z.string().min(6, "Şifre için en az 6 karakter girmelisiniz."),
            zod_1.z.literal(""), // Boş string kabul edilir
            zod_1.z.undefined(), // Yokluğu da kabul edilir
        ]),
        role: zod_1.z.enum(["ADMIN", "EMPLOYEE", "MEMBER"], {
            message: "Lütfen üye tipini seçiniz.",
        }),
    })
        .refine((data) => {
        var _a, _b;
        if (data.role !== "MEMBER") {
            return !!((_a = data.email) === null || _a === void 0 ? void 0 : _a.trim()) && !!((_b = data.password) === null || _b === void 0 ? void 0 : _b.trim());
        }
        return true;
    }, {
        message: "Mail ve şifre YÖNETİCİ veya PERSONEL için zorunludur.",
        path: ["email", "password"],
    });
};
exports.createEmployeeType = createEmployeeType;
const updateEmployeeType = () => {
    return zod_1.z
        .object({
        name: zod_1.z
            .string({
            message: "İsim zorunludur.",
        })
            .min(2, "İsim boş geçilemez."),
        email: zod_1.z
            .string()
            .min(1, { message: "Mail zorunludur" })
            .email("Geçerli bir mail adresi değil."),
        surname: zod_1.z
            .string({
            message: "Soy isim zorunludur.",
        })
            .min(2, "Soy isim boş geçilemez."),
        password: zod_1.z.union([
            zod_1.z.string().min(6, "Şifre için en az 6 karakter girmelisiniz."),
            zod_1.z.literal(""), // Boş string kabul edilir
            zod_1.z.undefined(), // Yokluğu da kabul edilir
        ]),
        role: zod_1.z.enum(["ADMIN", "EMPLOYEE", "MEMBER"], {
            message: "Lütfen üye tipini seçiniz.",
        }),
    })
        .refine((data) => {
        var _a, _b;
        if (data.role !== "MEMBER") {
            return !!((_a = data.email) === null || _a === void 0 ? void 0 : _a.trim()) && !!((_b = data.password) === null || _b === void 0 ? void 0 : _b.trim());
        }
        return true;
    }, {
        message: "Mail ve şifre YÖNETİCİ veya PERSONEL için zorunludur.",
        path: ["email", "password"],
    });
};
exports.updateEmployeeType = updateEmployeeType;
