import { z } from "zod";

export const createProductType = () => {
  return z.object({
    name: z
      .string({
        message: "Ürün başlığı zorunludur.",
      })
      .min(5, {
        message: "Ürün başlığı en az 5 karakter olmalıdır.",
      })
      .max(100, {
        message: "Ürün başlığı en fazla 100 karakter olmalıdır.",
      }),
    price: z.number({
      message: "Fiyat alanı zorunludur.",
    }),
    quantityPerBox: z.number({
      message: "Lütfen ürün koli içi adedini giriniz.",
    }),
  });
};

export type CreateProductScheme = z.infer<ReturnType<typeof createProductType>>;
