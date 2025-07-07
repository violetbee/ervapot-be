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
exports.deleteProductById = exports.getProductById = exports.updateProductById = exports.createProduct = exports.getAllProducts = void 0;
const thrower_1 = require("../../utils/thrower");
const product_service_1 = require("../../services/product/product.service");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize, pageNumber } = req.query;
    try {
        const products = yield (0, product_service_1._getAllProducts)({ pageSize, pageNumber });
        return (0, thrower_1.beautyApi)({
            res,
            data: products,
            status: 200,
            message: "Ürünler başarıyla getirildi.",
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({ res, status: 500, error });
    }
});
exports.getAllProducts = getAllProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        yield (0, product_service_1._createProduct)(data);
        return (0, thrower_1.beautyApi)({
            res,
            status: 201,
            message: "Ürün başarıyla oluşturuldu.",
        });
    }
    catch (error) {
        (0, thrower_1.beautyApi)({ res, status: 500, error });
    }
});
exports.createProduct = createProduct;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        yield (0, product_service_1._updateProductById)(id, data);
        return (0, thrower_1.beautyApi)({
            res,
            message: "Ürün başarıyla güncellendi.",
            status: 200,
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({ res, error, status: 500 });
    }
});
exports.updateProductById = updateProductById;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ÜrünById = yield (0, product_service_1._getProductById)(id);
        return (0, thrower_1.beautyApi)({
            res,
            data: ÜrünById,
            status: 200,
            message: "Ürün başarıyla getirildi.",
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({ res, error, status: 500 });
    }
});
exports.getProductById = getProductById;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, product_service_1._deleteProductById)(id);
        return (0, thrower_1.beautyApi)({ res, message: "Ürün başarıyla silindi", status: 200 });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({
            res,
            error: { message: "Ürün silinirken bir hata oluştu." },
            status: 500,
        });
    }
});
exports.deleteProductById = deleteProductById;
