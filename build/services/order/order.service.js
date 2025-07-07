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
exports._deleteOrder = exports._createOrder = exports._getAllOrders = void 0;
const db_1 = require("../../utils/db");
const _getAllOrders = (_a) => __awaiter(void 0, [_a], void 0, function* ({ pageSize, pageNumber }) {
    const orders = yield db_1.prisma.order.findMany({
        orderBy: {
            createdAt: "desc",
        },
        skip: (+pageNumber - 1) * +pageSize,
        take: +pageSize,
    });
    if (!orders) {
        throw new Error("Siparişler getirilirken bir hata oluştu.");
    }
    return orders;
});
exports._getAllOrders = _getAllOrders;
const _createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield db_1.prisma.order.create({
        data,
    });
    if (!order) {
        throw new Error("Sipariş oluşturulurken bir hata oluştu.");
    }
    return order;
});
exports._createOrder = _createOrder;
const _deleteOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield db_1.prisma.order.delete({
        where: {
            id: +data.id,
        },
    });
    if (!order) {
        throw new Error("Sipariş silinirken bir hata oluştu.");
    }
    return order;
});
exports._deleteOrder = _deleteOrder;
