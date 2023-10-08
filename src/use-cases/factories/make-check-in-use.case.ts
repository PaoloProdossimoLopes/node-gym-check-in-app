import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in-use-case'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
