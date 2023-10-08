import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym-use-case'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
