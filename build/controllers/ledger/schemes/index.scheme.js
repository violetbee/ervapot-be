"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionType = exports.createLedgerType = void 0;
const zod_1 = require("zod");
const createLedgerType = () => {
    return zod_1.z.object({
        name: zod_1.z
            .string({
            message: "Cari başlığı zorunludur.",
        })
            .min(3, {
            message: "Cari başlığı en az 3 karakter olmalıdır.",
        })
            .max(100, {
            message: "Cari başlığı en fazla 100 karakter olmalıdır.",
        }),
        type: zod_1.z.enum(["CUSTOMER", "WHOLESALER"], {
            message: "Lütfen cari türünü seçiniz.",
        }),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    });
};
exports.createLedgerType = createLedgerType;
const createTransactionType = () => {
    return zod_1.z.object({
        ledgerId: zod_1.z.string().min(0, "İşlem yapabilmek için cari seçmelisiniz."),
        paymentAmount: zod_1.z.number().min(1, "Tutar girilmeden işlem yapılamaz."),
    });
};
exports.createTransactionType = createTransactionType;
