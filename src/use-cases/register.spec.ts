import { InMemotyUsersRepository } from '@/repositories/in-memory-users-repository'
import { RegistgerUseCase } from '@src/use-cases/register'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

describe('RegisterUseCase', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegistgerUseCase(new InMemotyUsersRepository())
    const password = '123456'
    const { user } = await registerUseCase.handle({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password,
    })

    const isCorrect = await compare(password, user.password_hash)
    expect(isCorrect).toBeTruthy()
  })

  it('should not be able to register with same email twice', async () => {
    const registerUseCase = new RegistgerUseCase(new InMemotyUsersRepository())
    const email = 'jhondoe@example.com'
    await registerUseCase.handle({
      name: 'Jhon Doe',
      email,
      password: 'any passqord',
    })

    await expect(() =>
      registerUseCase.handle({
        name: 'Any other Jhon Doe',
        email,
        password: 'any other passqord',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const registerUseCase = new RegistgerUseCase(new InMemotyUsersRepository())
    const email = 'jhondoe@example.com'
    const { user } = await registerUseCase.handle({
      name: 'Jhon Doe',
      email,
      password: 'any passqord',
    })
    expect(user.id).toEqual(expect.any(String))
  })
})
