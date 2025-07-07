"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductType = void 0;
const zod_1 = require("zod");
const createProductType = () => {
    return zod_1.z.object({
        name: zod_1.z
            .string({
            message: "Ürün başlığı zorunludur.",
        })
            .min(5, {
            message: "Ürün başlığı en az 5 karakter olmalıdır.",
        })
            .max(100, {
            message: "Ürün başlığı en fazla 100 karakter olmalıdır.",
        }),
        price: zod_1.z.number({
            message: "Fiyat alanı zorunludur.",
        }),
        quantityPerBox: zod_1.z.number({
            message: "Lütfen ürün koli içi adedini giriniz.",
        }),
    });
};
exports.createProductType = createProductType;
