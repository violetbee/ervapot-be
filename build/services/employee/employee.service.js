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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._deleteEmployeeById = exports._updateEmployeeById = exports._getEmployeeById = exports._createEmployee = exports._getAllEmployees = void 0;
const db_1 = require("../../utils/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const _getAllEmployees = (_a) => __awaiter(void 0, [_a], void 0, function* ({ pageSize, pageNumber }) {
    const employees = yield db_1.prisma.employee.findMany({
        orderBy: {
            createdAt: "desc",
        },
        skip: (+pageNumber - 1) * +pageSize,
        take: +pageSize,
        include: {
            user: true,
        },
    });
    const employeesCount = yield db_1.prisma.employee.count();
    if (!employees) {
        throw new Error("Herhangi bir çalışan bulunamadı.");
    }
    return { data: employees, count: employeesCount };
});
exports._getAllEmployees = _getAllEmployees;
const _createEmployee = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield db_1.prisma.user.create({
        data: Object.assign(Object.assign({}, data), { password: yield bcryptjs_1.default.hash(data.password, 12), employee: data.role !== "ADMIN"
                ? {
                    create: Object.assign({}, data.employee),
                }
                : undefined }),
    });
    if (!employee) {
        throw new Error("Çalışan oluşturulurken bir hata oluştu.");
    }
    return employee;
});
exports._createEmployee = _createEmployee;
const _getEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeById = yield db_1.prisma.employee.findUnique({
        where: {
            id,
        },
    });
    if (!employeeById) {
        throw new Error("Çalışan aranırken bir hata oluştu.");
    }
    return employeeById;
});
exports._getEmployeeById = _getEmployeeById;
const _updateEmployeeById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedEmployee = yield db_1.prisma.employee.update({
        where: {
            id,
        },
        data,
    });
    if (!updatedEmployee) {
        throw new Error("Çalışan güncellenemedi.");
    }
    return updatedEmployee;
});
exports._updateEmployeeById = _updateEmployeeById;
const _deleteEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.employee.delete({
        where: {
            id,
        },
    });
});
exports._deleteEmployeeById = _deleteEmployeeById;
