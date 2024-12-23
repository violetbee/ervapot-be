import { prisma } from "../../utils/db";

export const _getAllUsers = async () => {
  const users = await prisma.user.findMany({
    omit: { password: true },
  });

  if (users === null) {
    throw new Error("Kullanıcılar getirilemedi.");
  }

  return users;
};

export const _getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      employee: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error(`${id} ID'li bir kullanıcı bulunamadı.`);
  }
  return user;
};

export const _updateUserById = async (id: string, data: any) => {
  const { password, ...rest } = data;

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...(password !== "" ? data : rest),
      employee: {
        update: {
          data: data.employee,
        },
      },
    },
  });

  if (!user) {
    throw new Error("Personel güncellenemedi.");
  }

  return user;
};

export const _deleteUserById = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};
