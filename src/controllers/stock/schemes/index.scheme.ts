import { z } from "zod";

export const createStockType = () => {
  return z.object({
    totalBox: z.number({
      message: "Toplam koli sayısı zorunludur.",
    }),
    productId: z.string().min(1, "Lütfen ürün seçiniz."),
  });
};

export type CreateStockScheme = z.infer<ReturnType<typeof createStockType>>;
