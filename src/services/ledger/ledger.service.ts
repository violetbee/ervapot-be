import { prisma } from "../../utils/db";
import { publishedTimeAgo } from "../../utils/general";

export const _getAllLedgers = async ({ pageNumber, pageSize, ledgerType }) => {
  const ledgers = await prisma.ledger.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      type: ledgerType || undefined,
    },
    skip: (+pageNumber - 1) * +pageSize,
    take: +pageSize,
  });

  const count = await prisma.ledger.count();

  if (!ledgers) {
    throw new Error("Herhangi bir cari bulunamadı.");
  }

  const data = ledgers.map((post) => ({
    ...post,
    timeAgo: publishedTimeAgo(post.createdAt),
  }));

  return { data, count };
};

export const _createLedger = async (data: any) => {
  const ledger = await prisma.ledger.create({
    data,
  });

  if (!ledger) {
    throw new Error("Cari oluşturulurken bir hata oluştu.");
  }

  return ledger;
};

export const _getLedgerById = async (id: string) => {
  const ledger = await prisma.ledger.findUnique({
    where: {
      id,
    },
    include: {
      transaction: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!ledger) {
    throw new Error("Cari bulunamadı.");
  }

  return {
    ...ledger,
    timeAgo: publishedTimeAgo(ledger.createdAt),
  };
};

export const _removeLedgerById = async (id: string) => {
  const ledger = await prisma.ledger.delete({
    where: {
      id,
    },
  });

  return ledger;
};

export const _updateLedgerById = async (id: string, data: any) => {
  const ledger = await prisma.ledger.update({
    where: {
      id,
    },
    data,
  });

  if (!ledger) {
    throw new Error("Cari güncellenemedi.");
  }

  return ledger;
};

export const _createTransaction = async (data: any) => {
  const currentBalance = await prisma.ledger.findUnique({
    where: {
      id: data.ledgerId,
    },
    select: {
      balance: true,
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      ...data,
      ...currentBalance,
    },
  });

  if (transaction) {
    await prisma.ledger.update({
      where: {
        id: data.ledgerId,
      },
      data: {
        balance:
          data.transactionType === "ADD_DEBT"
            ? { increment: data.paymentAmount }
            : { decrement: data.paymentAmount },
      },
    });
  }

  if (!transaction) {
    throw new Error("Ödeme kaydı oluşturulurken hata oluştu.");
  }
  return transaction;
};

export const _getAllTransactions = async ({ pageNumber, pageSize, id }) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      ledgerId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (+pageNumber - 1) * +pageSize,
    take: +pageSize,
  });

  const count = await prisma.transaction.count({
    where: {
      ledgerId: id,
    },
  });

  if (!transactions) {
    throw new Error("Kayıtlar getirilirken bir hata oluştu.");
  }

  return { transactions, count };
};

export const _deleteTransaction = async (id: string) => {
  const transaction = await prisma.transaction.delete({
    where: {
      id: +id,
    },
    include: {
      ledger: true,
    },
  });

  if (transaction) {
    const updatedLedger = await prisma.ledger.update({
      where: {
        id: transaction.ledgerId,
      },
      data: {
        balance:
          transaction.transactionType === "ADD_DEBT"
            ? { decrement: transaction.paymentAmount }
            : { increment: transaction.paymentAmount },
      },
    });
    return updatedLedger;
  }

  return transaction;
};
