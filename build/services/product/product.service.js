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
exports._deleteProductById = exports._updateProductById = exports._getProductById = exports._createProduct = exports._getAllProducts = void 0;
const db_1 = require("../../utils/db");
const _getAllProducts = (_a) => __awaiter(void 0, [_a], void 0, function* ({ pageSize, pageNumber }) {
    const products = yield db_1.prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
        skip: (+pageNumber - 1) * +pageSize,
        take: +pageSize,
        include: {
            stocks: true,
        },
    });
    const productCount = yield db_1.prisma.product.count();
    if (!products) {
        throw new Error("Herhangi bir ürün bulunamadı.");
    }
    return { data: products, count: productCount };
});
exports._getAllProducts = _getAllProducts;
const _createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.prisma.product.create({
        data,
    });
    if (!product) {
        throw new Error("Ürün oluşturulurken bir hata oluştu.");
    }
    return product;
});
exports._createProduct = _createProduct;
const _getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productById = yield db_1.prisma.product.findUnique({
        where: {
            id,
        },
    });
    if (!productById) {
        throw new Error("Ürün aranırken bir hata oluştu.");
    }
    return productById;
});
exports._getProductById = _getProductById;
const _updateProductById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield db_1.prisma.product.update({
        where: {
            id,
        },
        data,
    });
    if (!updatedProduct) {
        throw new Error("Ürün güncellenemedi.");
    }
    return updatedProduct;
});
exports._updateProductById = _updateProductById;
const _deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.product.delete({
        where: {
            id,
        },
    });
});
exports._deleteProductById = _deleteProductById;
