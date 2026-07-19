import { PrismaClient } from "@prisma/client";


// Refreshed and reloaded at: 2026-05-29T11:40
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["error", "warn"],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
