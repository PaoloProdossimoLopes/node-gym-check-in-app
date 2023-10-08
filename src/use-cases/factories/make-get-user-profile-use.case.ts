import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { GetUserProfile } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfile(usersRepository)

  return useCase
}
