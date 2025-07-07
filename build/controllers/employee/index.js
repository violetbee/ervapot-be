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
exports.deleteEmployeeById = exports.getEmployeeById = exports.updateEmployeeById = exports.createEmployee = exports.getAllEmployees = void 0;
const thrower_1 = require("../../utils/thrower");
const employee_service_1 = require("../../services/employee/employee.service");
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize, pageNumber } = req.query;
    try {
        const employees = yield (0, employee_service_1._getAllEmployees)({ pageSize, pageNumber });
        return (0, thrower_1.beautyApi)({
            res,
            data: employees,
            status: 200,
            message: "Çalışanlar başarıyla getirildi.",
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({ res, status: 500, error });
    }
});
exports.getAllEmployees = getAllEmployees;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        yield (0, employee_service_1._createEmployee)(data);
        return (0, thrower_1.beautyApi)({
            res,
            status: 201,
            message: "Çalışan başarıyla oluşturuldu.",
        });
    }
    catch (error) {
        (0, thrower_1.beautyApi)({ res, status: 500, error });
    }
});
exports.createEmployee = createEmployee;
const updateEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        yield (0, employee_service_1._updateEmployeeById)(id, data);
        return (0, thrower_1.beautyApi)({
            res,
            message: "Çalışan başarıyla güncellendi.",
            status: 200,
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({ res, error, status: 500 });
    }
});
exports.updateEmployeeById = updateEmployeeById;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const stokById = yield (0, employee_service_1._getEmployeeById)(id);
        return (0, thrower_1.beautyApi)({
            res,
            data: stokById,
            status: 200,
            message: "Çalışan başarıyla getirildi.",
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({ res, error, status: 500 });
    }
});
exports.getEmployeeById = getEmployeeById;
const deleteEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, employee_service_1._deleteEmployeeById)(id);
        return (0, thrower_1.beautyApi)({
            res,
            message: "Çalışan başarıyla silindi",
            status: 200,
        });
    }
    catch (error) {
        return (0, thrower_1.beautyApi)({
            res,
            error: { message: "Çalışan silinirken bir hata oluştu." },
            status: 500,
        });
    }
});
exports.deleteEmployeeById = deleteEmployeeById;
