import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { RegistgerUseCase } from '../register'

export function makeRegisterUseCase() {
  const repository = new PrismaUsersRepository()
  const useCase = new RegistgerUseCase(repository)
  return useCase
}
