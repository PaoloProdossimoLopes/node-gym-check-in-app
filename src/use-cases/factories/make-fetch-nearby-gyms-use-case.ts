import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nweaby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
