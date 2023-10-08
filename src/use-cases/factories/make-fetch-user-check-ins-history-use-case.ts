import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins-repository'
import { FetchMemberCheckInsHistoryUseCase } from '../fetch-menber-check-ins-history-use-case'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchMemberCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
