import { prisma } from "../../utils/db";

export const _getAllProducts = async ({ pageSize, pageNumber }) => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (+pageNumber - 1) * +pageSize,
    take: +pageSize,
    include: {
      stocks: true,
    },
  });

  const productCount = await prisma.product.count();

  if (!products) {
    throw new Error("Herhangi bir ürün bulunamadı.");
  }

  return { data: products, count: productCount };
};

export const _createProduct = async (data: any) => {
  const product = await prisma.product.create({
    data,
  });

  if (!product) {
    throw new Error("Ürün oluşturulurken bir hata oluştu.");
  }

  return product;
};

export const _getProductById = async (id: string) => {
  const productById = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!productById) {
    throw new Error("Ürün aranırken bir hata oluştu.");
  }

  return productById;
};

export const _updateProductById = async (id: string, data: any) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data,
  });

  if (!updatedProduct) {
    throw new Error("Ürün güncellenemedi.");
  }

  return updatedProduct;
};

export const _deleteProductById = async (id: string) => {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
};
