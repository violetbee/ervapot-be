"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const ledger_1 = __importDefault(require("./ledger"));
const stock_1 = __importDefault(require("./stock"));
const product_1 = __importDefault(require("./product"));
const employee_1 = __importDefault(require("./employee"));
const order_1 = __importDefault(require("./order"));
const auth_2 = require("../middlewares/auth");
const permissions_1 = require("../middlewares/permissions");
const route_1 = require("../utils/route");
const whiteList = {
    auth: ["/auth"],
};
const routeHandler = (app) => {
    app.use((0, route_1.restrictRoutes)(auth_2.AuthMiddleware, whiteList.auth));
    app.use("/user", user_1.default);
    app.use("/auth", auth_1.default);
    app.use("/ledger", permissions_1.isAdmin, ledger_1.default);
    app.use("/stock", stock_1.default);
    app.use("/product", product_1.default);
    app.use("/order", order_1.default);
    app.use("/employee", employee_1.default);
    app.use("*", (_req, res) => {
        res.status(404).json({
            error: "Erişmeye çalıştığınız sayfa bulunamadı.",
        });
    });
};
exports.default = routeHandler;
