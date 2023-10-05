import { prisma } from '@src/lis/prisma'
import { UserData, UserRepository } from './user-repository'

export class PrismaUsersRepository implements UserRepository {
  async handle(data: UserData) {
    const user = await prisma.user.create({ data })
    return user
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    })
  }
}
