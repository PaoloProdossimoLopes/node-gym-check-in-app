import { PrismaUsersRepository } from '@src/repositories/prisma-users-repository'
import { RegistgerUseCase } from '@src/use-cases/register'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

describe('RegisterUseCase', () => {
  it('should hash user password upon registration', async () => {
    const registerRepository = new PrismaUsersRepository()
    const registerUseCase = new RegistgerUseCase(registerRepository)
    const password = '123456'
    const { user } = await registerUseCase.handle({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password,
    })

    const isCorrect = await compare(password, user.password_hash)
    expect(isCorrect).toBeTruthy()
  })
})
