import { prisma } from "../../utils/db";

export const _getAllOrders = async ({ pageSize, pageNumber }) => {
  const orders = await prisma.order.findMany({
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
};

export const _createOrder = async (data: any) => {
  const order = await prisma.order.create({
    data,
  });

  if (!order) {
    throw new Error("Sipariş oluşturulurken bir hata oluştu.");
  }

  return order;
};

export const _deleteOrder = async (data: any) => {
  const order = await prisma.order.delete({
    where: {
      id: +data.id,
    },
  });

  if (!order) {
    throw new Error("Sipariş silinirken bir hata oluştu.");
  }

  return order;
};
