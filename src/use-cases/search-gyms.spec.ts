import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gyms'

describe('SearchGyms', () => {
  it('should ', async () => {
    const repository = new InMemoryGymsRepository()
    const sut = new SearchGymUseCase(repository)
    const title = 'any query title'
    await repository.create({
      title,
      description: 'any quered title',
      id: randomUUID(),
      latitule: new Decimal(23),
      longitude: new Decimal(23),
      phone: 'any phone',
    })
    await repository.create({
      title: 'any not quered title',
      description: 'any quered title',
      id: randomUUID(),
      latitule: new Decimal(23),
      longitude: new Decimal(23),
      phone: 'any phone',
    })
    await repository.create({
      title,
      description: 'any quered title',
      id: randomUUID(),
      latitule: new Decimal(23),
      longitude: new Decimal(23),
      phone: 'any phone',
    })

    const { gyms } = await sut.handle({ query: title, page: 1 })

    expect(gyms.length).toEqual(2)
  })

  it('should ', async () => {
    const repository = new InMemoryGymsRepository()
    const sut = new SearchGymUseCase(repository)
    const title = 'any query title'

    for (let i = 1; i <= 22; i++) {
      await repository.create({
        title,
        description: `gym-${i}`,
        id: randomUUID(),
        latitule: new Decimal(23),
        longitude: new Decimal(23),
        phone: 'any phone',
      })
    }

    const { gyms } = await sut.handle({ query: title, page: 2 })

    expect(gyms.length).toEqual(2)
    expect(gyms[0].description).toEqual('gym-21')
    expect(gyms[1].description).toEqual('gym-22')
  })
})
