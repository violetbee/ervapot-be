import { prisma } from "../../utils/db";
import bcryptjs from "bcryptjs";

export const _getAllEmployees = async ({ pageSize, pageNumber }) => {
  const employees = await prisma.employee.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (+pageNumber - 1) * +pageSize,
    take: +pageSize,
    include: {
      user: true,
    },
  });

  const employeesCount = await prisma.employee.count();

  if (!employees) {
    throw new Error("Herhangi bir çalışan bulunamadı.");
  }

  return { data: employees, count: employeesCount };
};

export const _createEmployee = async (data: any) => {
  const employee = await prisma.user.create({
    data: {
      ...data,
      password: await bcryptjs.hash(data.password, 12),
      employee:
        data.role !== "ADMIN"
          ? {
              create: {
                ...data.employee,
              },
            }
          : undefined,
    },
  });

  if (!employee) {
    throw new Error("Çalışan oluşturulurken bir hata oluştu.");
  }

  return employee;
};

export const _getEmployeeById = async (id: string) => {
  const employeeById = await prisma.employee.findUnique({
    where: {
      id,
    },
  });

  if (!employeeById) {
    throw new Error("Çalışan aranırken bir hata oluştu.");
  }

  return employeeById;
};

export const _updateEmployeeById = async (id: string, data: any) => {
  const updatedEmployee = await prisma.employee.update({
    where: {
      id,
    },
    data,
  });

  if (!updatedEmployee) {
    throw new Error("Çalışan güncellenemedi.");
  }

  return updatedEmployee;
};

export const _deleteEmployeeById = async (id: string) => {
  return await prisma.employee.delete({
    where: {
      id,
    },
  });
};
