import { z } from "zod";

export const createLedgerType = () => {
  return z.object({
    name: z
      .string({
        message: "Cari başlığı zorunludur.",
      })
      .min(3, {
        message: "Cari başlığı en az 3 karakter olmalıdır.",
      })
      .max(100, {
        message: "Cari başlığı en fazla 100 karakter olmalıdır.",
      }),
    type: z.enum(["CUSTOMER", "WHOLESALER"], {
      message: "Lütfen cari türünü seçiniz.",
    }),
    phone: z.string().optional(),
    address: z.string().optional(),
  });
};

export const createTransactionType = () => {
  return z.object({
    ledgerId: z.string().min(0, "İşlem yapabilmek için cari seçmelisiniz."),
    paymentAmount: z.number().min(1, "Tutar girilmeden işlem yapılamaz."),
  });
};

export type CreateTransactionType = z.infer<
  ReturnType<typeof createTransactionType>
>;
export type CreateLedgerScheme = z.infer<ReturnType<typeof createLedgerType>>;
