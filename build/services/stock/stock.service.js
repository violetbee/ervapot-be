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
exports._deleteStockById = exports._updateStockById = exports._getStockById = exports._createStock = exports._getAllStocks = void 0;
const db_1 = require("../../utils/db");
const _getAllStocks = (_a) => __awaiter(void 0, [_a], void 0, function* ({ pageSize, pageNumber }) {
    const stocks = yield db_1.prisma.stock.findMany({
        orderBy: {
            createdAt: "desc",
        },
        skip: (+pageNumber - 1) * +pageSize,
        take: +pageSize,
        include: {
            employee: {
                select: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            surname: true,
                        },
                    },
                },
            },
            product: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                },
            },
        },
    });
    const stockCount = yield db_1.prisma.stock.count();
    if (!stocks) {
        throw new Error("Herhangi bir stok bulunamadı.");
    }
    return { data: stocks, count: stockCount };
});
exports._getAllStocks = _getAllStocks;
const _createStock = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { stockType, balance } = data, rest = __rest(data, ["stockType", "balance"]);
    const stock = yield db_1.prisma.stock.create({
        data: Object.assign(Object.assign({}, rest), { stockType }),
    });
    if (balance) {
        yield db_1.prisma.ledger.update({
            where: {
                id: data.ledgerId,
            },
            data: {
                balance: {
                    increment: balance,
                },
            },
        });
        const product = yield db_1.prisma.product.findUnique({
            where: {
                id: data.productId,
            },
        });
        if (product) {
            yield db_1.prisma.transaction.create({
                data: {
                    transactionType: "ADD_DEBT",
                    description: `${product.name} | ${data.totalBox} Koli | ${(data.specialPrice || product.price) * product.quantityPerBox} ₺ ${data.specialPrice ? "(Özel Fiyat)" : ""} Koli Adet Fiyatı`,
                    paymentAmount: balance,
                    ledgerId: data.ledgerId,
                },
            });
        }
    }
    if (!stock) {
        throw new Error("Stok oluşturulurken bir hata oluştu.");
    }
    return stock;
});
exports._createStock = _createStock;
const _getStockById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const stockById = yield db_1.prisma.stock.findUnique({
        where: {
            id,
        },
    });
    if (!stockById) {
        throw new Error("Stok aranırken bir hata oluştu.");
    }
    return stockById;
});
exports._getStockById = _getStockById;
const _updateStockById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedStock = yield db_1.prisma.stock.update({
        where: {
            id,
        },
        data,
    });
    if (!updatedStock) {
        throw new Error("Stok güncellenemedi.");
    }
    return updatedStock;
});
exports._updateStockById = _updateStockById;
const _deleteStockById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.stock.delete({
        where: {
            id,
        },
    });
});
exports._deleteStockById = _deleteStockById;
