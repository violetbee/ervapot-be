import { z } from "zod";

export const createEmployeeType = () => {
  return z
    .object({
      name: z
        .string({
          message: "İsim zorunludur.",
        })
        .min(2, "İsim boş geçilemez."),
      surname: z
        .string({
          message: "Soy isim zorunludur.",
        })
        .min(2, "Soy isim boş geçilemez."),
      email: z.union([
        z
          .string()
          .min(1, { message: "Mail zorunludur" })
          .email("Geçerli bir mail adresi değil."),
        z.literal(""), // Boş string kabul edilir
        z.undefined(), // Yokluğu da kabul edilir
      ]),
      password: z.union([
        z.string().min(6, "Şifre için en az 6 karakter girmelisiniz."),
        z.literal(""), // Boş string kabul edilir
        z.undefined(), // Yokluğu da kabul edilir
      ]),
      role: z.enum(["ADMIN", "EMPLOYEE", "MEMBER"], {
        message: "Lütfen üye tipini seçiniz.",
      }),
    })
    .refine(
      (data) => {
        if (data.role !== "MEMBER") {
          return !!data.email?.trim() && !!data.password?.trim();
        }
        return true;
      },
      {
        message: "Mail ve şifre YÖNETİCİ veya PERSONEL için zorunludur.",
        path: ["email", "password"],
      }
    );
};

export const updateEmployeeType = () => {
  return z
    .object({
      name: z
        .string({
          message: "İsim zorunludur.",
        })
        .min(2, "İsim boş geçilemez."),
      email: z
        .string()
        .min(1, { message: "Mail zorunludur" })
        .email("Geçerli bir mail adresi değil."),
      surname: z
        .string({
          message: "Soy isim zorunludur.",
        })
        .min(2, "Soy isim boş geçilemez."),
      password: z.union([
        z.string().min(6, "Şifre için en az 6 karakter girmelisiniz."),
        z.literal(""), // Boş string kabul edilir
        z.undefined(), // Yokluğu da kabul edilir
      ]),
      role: z.enum(["ADMIN", "EMPLOYEE", "MEMBER"], {
        message: "Lütfen üye tipini seçiniz.",
      }),
    })
    .refine(
      (data) => {
        if (data.role !== "MEMBER") {
          return !!data.email?.trim() && !!data.password?.trim();
        }
        return true;
      },
      {
        message: "Mail ve şifre YÖNETİCİ veya PERSONEL için zorunludur.",
        path: ["email", "password"],
      }
    );
};

export type CreateEmployeeScheme = z.infer<
  ReturnType<typeof createEmployeeType>
>;
