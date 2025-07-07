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
exports.deleteOrder = exports.createOrder = exports.getAllOrders = void 0;
const order_service_1 = require("../../services/order/order.service");
const thrower_1 = require("../../utils/thrower");
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize, pageNumber } = req.query;
    try {
        const orders = yield (0, order_service_1._getAllOrders)({ pageSize, pageNumber });
        return (0, thrower_1.beautyApi)({
            res,
            data: orders,
            status: 200,
            message: "Siparişler başarıyla getirildi.",
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({ res, status: 500, error });
    }
});
exports.getAllOrders = getAllOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, order_service_1._createOrder)(req.body);
        return (0, thrower_1.beautyApi)({
            res,
            status: 201,
            message: "Sipariş başarıyla oluşturuldu.",
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({ res, status: 500, error });
    }
});
exports.createOrder = createOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, order_service_1._deleteOrder)(req.params);
        return (0, thrower_1.beautyApi)({
            res,
            status: 201,
            message: "Sipariş başarıyla silindi.",
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({ res, status: 500, error });
    }
});
exports.deleteOrder = deleteOrder;
