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
exports.deleteTransaction = exports.getAllTransactions = exports.createTransaction = exports.updateLedgerById = exports.removeLedgerById = exports.createLedger = exports.getLedgerById = exports.getAllLedgers = void 0;
const thrower_1 = require("../../utils/thrower");
const ledger_service_1 = require("../../services/ledger/ledger.service");
const getAllLedgers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize, pageNumber, ledgerType } = req.query;
    try {
        const ledgers = yield (0, ledger_service_1._getAllLedgers)({
            pageSize,
            pageNumber,
            ledgerType,
        });
        return (0, thrower_1.beautyApi)({
            res,
            data: ledgers,
            message: "Cariler başarıyla getirildi.",
            status: 200,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.getAllLedgers = getAllLedgers;
const getLedgerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ledger = yield (0, ledger_service_1._getLedgerById)(id);
        return (0, thrower_1.beautyApi)({
            res,
            data: ledger,
            message: "Cari başarıyla getirildi",
            status: 200,
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({
            res,
            error,
            status: 500,
        });
    }
});
exports.getLedgerById = getLedgerById;
const createLedger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        yield (0, ledger_service_1._createLedger)(data);
        return (0, thrower_1.beautyApi)({
            res,
            message: "Cari başarıyla oluşturuldu.",
            status: 201,
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({
            res,
            error: {
                message: "Cari oluşturulurken hata oluştu.",
            },
            status: 403,
        });
    }
});
exports.createLedger = createLedger;
const removeLedgerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, ledger_service_1._removeLedgerById)(id);
        return (0, thrower_1.beautyApi)({
            res,
            message: "Cari başarıyla silindi.",
            status: 200,
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({
            res,
            error: {
                message: "İlgili cari bulunamadı.",
            },
            status: 403,
        });
    }
});
exports.removeLedgerById = removeLedgerById;
const updateLedgerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        yield (0, ledger_service_1._updateLedgerById)(id, data);
        return (0, thrower_1.beautyApi)({
            res,
            message: "Cari başarıyla güncellendi",
            status: 200,
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({
            res,
            error: {
                message: "Cari silinirken hata oluştu.",
            },
            status: 403,
        });
    }
});
exports.updateLedgerById = updateLedgerById;
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        yield (0, ledger_service_1._createTransaction)(data);
        return (0, thrower_1.beautyApi)({
            res,
            message: "Kayıt başarıyla oluşturuldu",
            status: 200,
        });
    }
    catch (error) {
        console.log(error);
        return (0, thrower_1.beautyApi)({
            res,
            error: {
                message: "Kayıt oluşturulurken hata oluştu.",
            },
            status: 403,
        });
    }
});
exports.createTransaction = createTransaction;
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize, pageNumber } = req.query;
    const { id } = req.params;
    try {
        const data = yield (0, ledger_service_1._getAllTransactions)({
            pageSize,
            pageNumber,
            id,
        });
        return (0, thrower_1.beautyApi)({
            res,
            data,
            status: 200,
            message: "Kayıtlar başarıyla getirildi.",
        });
    }
    catch (err) {
        return (0, thrower_1.beautyApi)({
            res,
            error: {
                message: "Kayıtlar getirilirken bir hata oluştu.",
            },
            status: 403,
        });
    }
});
exports.getAllTransactions = getAllTransactions;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, ledger_service_1._deleteTransaction)(id);
        return (0, thrower_1.beautyApi)({
            res,
            status: 200,
            message: "Kayıt başarıyla silindi.",
        });
    }
    catch (e) {
        return (0, thrower_1.beautyApi)({
            res,
            error: {
                message: "Kayıt silinirken bir hata oluştu.",
            },
            status: 403,
        });
    }
});
exports.deleteTransaction = deleteTransaction;
