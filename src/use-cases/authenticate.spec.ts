import { InMemotyUsersRepository } from '@/repositories/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('AuthenticateUseCase', () => {
  it('should be able to authenticate', async () => {
    const email = 'any valid email'
    const password = 'any valid password'
    const password_hash = await hash(password, 6)
    const repository = new InMemotyUsersRepository()
    const sut = new AuthenticateUseCase(repository)
    const registered = await repository.handle({
      name: 'Jhon Doe',
      email,
      password_hash,
    })

    const { user } = await sut.handle({ email, password })

    expect(user).toEqual(registered)
  })

  it('should not be able to authenticate with wrong email', async () => {
    const password = 'any valid password'
    const password_hash = await hash(password, 6)
    const repository = new InMemotyUsersRepository()
    const sut = new AuthenticateUseCase(repository)
    await repository.handle({
      name: 'Jhon Doe',
      email: 'any valid email',
      password_hash,
    })

    await expect(() =>
      sut.handle({ email: 'any invalid email', password }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'any valid email'
    const repository = new InMemotyUsersRepository()
    const sut = new AuthenticateUseCase(repository)
    await repository.handle({
      name: 'Jhon Doe',
      email,
      password_hash: await hash('any valid password', 6),
    })

    expect(async () =>
      sut.handle({
        email: 'any invalid email',
        password: await hash('any invalid password', 6),
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
