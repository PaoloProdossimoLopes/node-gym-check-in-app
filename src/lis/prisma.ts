import { Prisma, PrismaClient } from '@prisma/client'
import { env } from '@src/env'

const log: Prisma.LogLevel[] = env.NODE_ENV === 'dev' ? ['query'] : []

export const prisma = new PrismaClient({ log })
