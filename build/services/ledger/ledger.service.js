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
exports._deleteTransaction = exports._getAllTransactions = exports._createTransaction = exports._updateLedgerById = exports._removeLedgerById = exports._getLedgerById = exports._createLedger = exports._getAllLedgers = void 0;
const db_1 = require("../../utils/db");
const general_1 = require("../../utils/general");
const _getAllLedgers = (_a) => __awaiter(void 0, [_a], void 0, function* ({ pageNumber, pageSize, ledgerType }) {
    const ledgers = yield db_1.prisma.ledger.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            type: ledgerType || undefined,
        },
        skip: (+pageNumber - 1) * +pageSize,
        take: +pageSize,
    });
    const count = yield db_1.prisma.ledger.count();
    if (!ledgers) {
        throw new Error("Herhangi bir cari bulunamadı.");
    }
    const data = ledgers.map((post) => (Object.assign(Object.assign({}, post), { timeAgo: (0, general_1.publishedTimeAgo)(post.createdAt) })));
    return { data, count };
});
exports._getAllLedgers = _getAllLedgers;
const _createLedger = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const ledger = yield db_1.prisma.ledger.create({
        data,
    });
    if (!ledger) {
        throw new Error("Cari oluşturulurken bir hata oluştu.");
    }
    return ledger;
});
exports._createLedger = _createLedger;
const _getLedgerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ledger = yield db_1.prisma.ledger.findUnique({
        where: {
            id,
        },
        include: {
            transaction: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });
    if (!ledger) {
        throw new Error("Cari bulunamadı.");
    }
    return Object.assign(Object.assign({}, ledger), { timeAgo: (0, general_1.publishedTimeAgo)(ledger.createdAt) });
});
exports._getLedgerById = _getLedgerById;
const _removeLedgerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ledger = yield db_1.prisma.ledger.delete({
        where: {
            id,
        },
    });
    return ledger;
});
exports._removeLedgerById = _removeLedgerById;
const _updateLedgerById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const ledger = yield db_1.prisma.ledger.update({
        where: {
            id,
        },
        data,
    });
    if (!ledger) {
        throw new Error("Cari güncellenemedi.");
    }
    return ledger;
});
exports._updateLedgerById = _updateLedgerById;
const _createTransaction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const currentBalance = yield db_1.prisma.ledger.findUnique({
        where: {
            id: data.ledgerId,
        },
        select: {
            balance: true,
        },
    });
    const transaction = yield db_1.prisma.transaction.create({
        data: Object.assign(Object.assign({}, data), currentBalance),
    });
    if (transaction) {
        yield db_1.prisma.ledger.update({
            where: {
                id: data.ledgerId,
            },
            data: {
                balance: data.transactionType === "ADD_DEBT"
                    ? { increment: data.paymentAmount }
                    : { decrement: data.paymentAmount },
            },
        });
    }
    if (!transaction) {
        throw new Error("Ödeme kaydı oluşturulurken hata oluştu.");
    }
    return transaction;
});
exports._createTransaction = _createTransaction;
const _getAllTransactions = (_a) => __awaiter(void 0, [_a], void 0, function* ({ pageNumber, pageSize, id }) {
    const transactions = yield db_1.prisma.transaction.findMany({
        where: {
            ledgerId: id,
        },
        orderBy: {
            createdAt: "desc",
        },
        skip: (+pageNumber - 1) * +pageSize,
        take: +pageSize,
    });
    const count = yield db_1.prisma.transaction.count({
        where: {
            ledgerId: id,
        },
    });
    if (!transactions) {
        throw new Error("Kayıtlar getirilirken bir hata oluştu.");
    }
    return { transactions, count };
});
exports._getAllTransactions = _getAllTransactions;
const _deleteTransaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.prisma.transaction.delete({
        where: {
            id: +id,
        },
        include: {
            ledger: true,
        },
    });
    if (transaction) {
        const updatedLedger = yield db_1.prisma.ledger.update({
            where: {
                id: transaction.ledgerId,
            },
            data: {
                balance: transaction.transactionType === "ADD_DEBT"
                    ? { decrement: transaction.paymentAmount }
                    : { increment: transaction.paymentAmount },
            },
        });
        return updatedLedger;
    }
    return transaction;
});
exports._deleteTransaction = _deleteTransaction;
