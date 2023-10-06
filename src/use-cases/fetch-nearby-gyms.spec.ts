import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nweaby-gyms'

describe('FetchNearbyGyms', () => {
  it('should fetch closer gyms', async () => {
    const repository = new InMemoryGymsRepository()
    const sut = new FetchNearbyGymsUseCase(repository)

    await repository.create({
      id: randomUUID(),
      title: 'Near Gym',
      phone: 'Any Near phone gyms',
      description: 'Any near gym',
      latitule: new Decimal(-27.2092052),
      longitude: new Decimal(-49.6401091),
    })

    await repository.create({
      id: randomUUID(),
      title: 'Far Gym',
      phone: 'Any Far phone gyms',
      description: 'Any Far gym',
      latitule: new Decimal(0),
      longitude: new Decimal(0),
    })

    const { gyms } = await sut.handle({
      userLatitude: -27.2002052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms[0].title).toEqual('Near Gym')
  })
})
