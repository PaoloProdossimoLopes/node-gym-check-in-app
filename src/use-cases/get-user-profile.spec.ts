import { InMemotyUsersRepository } from '@/repositories/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { ResourceNotFound } from './errors/resource-not-found-error'
import { GetUserProfile } from './get-user-profile'

describe('GEtUserProfileUceCase', () => {
  it('should be able to authenticate', async () => {
    const email = 'any valid email'
    const password = 'any valid password'
    const password_hash = await hash(password, 6)
    const repository = new InMemotyUsersRepository()
    const sut = new GetUserProfile(repository)
    const registered = await repository.handle({
      name: 'Jhon Doe',
      email,
      password_hash,
    })

    const { user } = await sut.handle({ userId: registered.id })

    expect(user).toEqual(registered)
  })

  it('should not be able to authenticate with wrong email', async () => {
    const repository = new InMemotyUsersRepository()
    const sut = new GetUserProfile(repository)
    await expect(() =>
      sut.handle({ userId: 'non exist id' }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
