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
exports.deleteStockById = exports.getStockById = exports.updateStockById = exports.createStock = exports.getAllStocks = void 0;
const stock_service_1 = require("../../services/stock/stock.service");
const thrower_1 = require("../../utils/thrower");
const getAllStocks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize, pageNumber } = req.query;
    try {
        const stocks = yield (0, stock_service_1._getAllStocks)({ pageSize, pageNumber });
        return (0, thrower_1.beautyApi)({
            res,
            data: stocks,
            status: 200,
            message: "Stoklar başarıyla getirildi.",
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({ res, status: 500, error });
    }
});
exports.getAllStocks = getAllStocks;
const createStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { balance } = data;
    try {
        yield (0, stock_service_1._createStock)(data);
        return (0, thrower_1.beautyApi)({
            res,
            status: 201,
            message: balance
                ? "Stok çıkışı başarıyla yapıldı."
                : "Stok başarıyla oluşturuldu.",
        });
    }
    catch (error) {
        (0, thrower_1.beautyApi)({ res, status: 500, error });
    }
});
exports.createStock = createStock;
const updateStockById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        yield (0, stock_service_1._updateStockById)(id, data);
        return (0, thrower_1.beautyApi)({
            res,
            message: "Stok başarıyla güncellendi.",
            status: 200,
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({ res, error, status: 500 });
    }
});
exports.updateStockById = updateStockById;
const getStockById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const stokById = yield (0, stock_service_1._getStockById)(id);
        return (0, thrower_1.beautyApi)({
            res,
            data: stokById,
            status: 200,
            message: "Stok başarıyla getirildi.",
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({ res, error, status: 500 });
    }
});
exports.getStockById = getStockById;
const deleteStockById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, stock_service_1._deleteStockById)(id);
        return (0, thrower_1.beautyApi)({ res, message: "Stok başarıyla silindi", status: 200 });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({
            res,
            error: { message: "Stok silinirken bir hata oluştu." },
            status: 500,
        });
    }
});
exports.deleteStockById = deleteStockById;
