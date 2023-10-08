import { prisma } from '@/lis/prisma'
import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from './gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async fidById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async findmanyBearBy(latitule: number, longitude: number) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitule}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitule}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  async searchManyByTitle(title: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
