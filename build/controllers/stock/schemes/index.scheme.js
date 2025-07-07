"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStockType = void 0;
const zod_1 = require("zod");
const createStockType = () => {
    return zod_1.z.object({
        totalBox: zod_1.z.number({
            message: "Toplam koli sayısı zorunludur.",
        }),
        productId: zod_1.z.string().min(1, "Lütfen ürün seçiniz."),
    });
};
exports.createStockType = createStockType;
