import { type Express } from "express";
import UserRouter from "./user";
import AuthRouter from "./auth";
import LedgerRouter from "./ledger";
import StockRouter from "./stock";
import ProductRouter from "./product";
import EmployeeRouter from "./employee";
import OrderRouter from "./order";
import { AuthMiddleware } from "../middlewares/auth";
import { isAdmin } from "../middlewares/permissions";
import { restrictRoutes } from "../utils/route";

const whiteList = {
  auth: ["/auth"],
};

const routeHandler = (app: Express) => {
  app.use(restrictRoutes(AuthMiddleware, whiteList.auth));
  app.use("/user", UserRouter);
  app.use("/auth", AuthRouter);
  app.use("/ledger", isAdmin, LedgerRouter);
  app.use("/stock", StockRouter);
  app.use("/product", ProductRouter);
  app.use("/order", OrderRouter);
  app.use("/employee", EmployeeRouter);
  app.use("*", (_req, res) => {
    res.status(404).json({
      error: "Erişmeye çalıştığınız sayfa bulunamadı.",
    });
  });
};

export default routeHandler;
