/**
 * Prisma Client singleton for Next.js
 * Prevents creating too many connections during hot-reloads in development.
 */

import { PrismaClient } from "@prisma/client";

declare global {
  // allow attaching prisma to the global object in development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
