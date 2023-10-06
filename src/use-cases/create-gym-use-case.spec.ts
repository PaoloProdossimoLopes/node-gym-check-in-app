import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym-use-case'

describe('CreateGymUseCase', () => {
  it('should be able to authenticate', async () => {
    const data = {
      title: 'any title',
      description: 'any description',
      latitude: 0,
      longitude: 0,
      phone: 'any phone number',
    }
    const repository = new InMemoryGymsRepository()
    const sut = new CreateGymUseCase(repository)

    const { gym } = await sut.handle(data)

    expect(gym.id).toEqual(expect.any(String))
    expect(gym.title).toEqual(data.title)
    expect(gym.description).toEqual(data.description)
    expect(gym.phone).toEqual(data.phone)
  })
})
