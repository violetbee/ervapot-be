import { prisma } from "../../utils/db";

export const _getAllStocks = async ({ pageSize, pageNumber }) => {
  const stocks = await prisma.stock.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (+pageNumber - 1) * +pageSize,
    take: +pageSize,
    include: {
      employee: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });

  const stockCount = await prisma.stock.count();

  if (!stocks) {
    throw new Error("Herhangi bir stok bulunamadı.");
  }

  return { data: stocks, count: stockCount };
};

export const _createStock = async (data: any) => {
  const { stockType, balance, ...rest } = data;

  const stock = await prisma.stock.create({
    data: { ...rest, stockType },
  });

  if (balance) {
    await prisma.ledger.update({
      where: {
        id: data.ledgerId,
      },
      data: {
        balance: {
          increment: balance,
        },
      },
    });

    const product = await prisma.product.findUnique({
      where: {
        id: data.productId,
      },
    });
    if (product) {
      await prisma.transaction.create({
        data: {
          transactionType: "ADD_DEBT",
          description: `${product.name} | ${data.totalBox} Koli | ${
            (data.specialPrice || product.price) * product.quantityPerBox
          } ₺ ${data.specialPrice ? "(Özel Fiyat)" : ""} Koli Adet Fiyatı`,
          paymentAmount: balance,
          ledgerId: data.ledgerId,
        },
      });
    }
  }

  if (!stock) {
    throw new Error("Stok oluşturulurken bir hata oluştu.");
  }

  return stock;
};

export const _getStockById = async (id: string) => {
  const stockById = await prisma.stock.findUnique({
    where: {
      id,
    },
  });

  if (!stockById) {
    throw new Error("Stok aranırken bir hata oluştu.");
  }

  return stockById;
};

export const _updateStockById = async (id: string, data: any) => {
  const updatedStock = await prisma.stock.update({
    where: {
      id,
    },
    data,
  });

  if (!updatedStock) {
    throw new Error("Stok güncellenemedi.");
  }

  return updatedStock;
};

export const _deleteStockById = async (id: string) => {
  return await prisma.stock.delete({
    where: {
      id,
    },
  });
};
