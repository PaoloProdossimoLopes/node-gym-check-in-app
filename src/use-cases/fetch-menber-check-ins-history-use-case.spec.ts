import { InMemotyUsersRepository } from '@/repositories/in-memory-check-ins-repository'
import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { FetchMemberCheckInsHistoryUseCase } from './fetch-menber-check-ins-history-use-case'

describe('FetchMemberCheckInsHistory', () => {
  it('should ', async () => {
    const userId = randomUUID()
    const repository = new InMemotyUsersRepository()
    const sut = new FetchMemberCheckInsHistoryUseCase(repository)

    await repository.create({
      gym_id: 'any gym id',
      id: 'any valid id 01',
      user_id: userId,
      created_at: new Date(),
    })
    await repository.create({
      gym_id: 'any gym id',
      id: 'any valid id 02',
      user_id: 'any valid user id',
      created_at: new Date(),
    })
    await repository.create({
      gym_id: 'any gym id',
      id: 'any valid id 03',
      user_id: userId,
      created_at: new Date(),
    })

    const { checkins } = await sut.handle({ userId, page: 1 })

    expect(checkins.length).toEqual(2)
    expect(checkins[0].id).toEqual('any valid id 01')
    expect(checkins[1].id).toEqual('any valid id 03')
  })

  it('should ', async () => {
    const userId = randomUUID()
    const repository = new InMemotyUsersRepository()
    const sut = new FetchMemberCheckInsHistoryUseCase(repository)

    for (let i = 1; i <= 22; i++) {
      await repository.create({
        gym_id: `gym-${i}`,
        id: `id-${i}`,
        user_id: userId,
        created_at: new Date(),
      })
    }

    const { checkins } = await sut.handle({ userId, page: 2 })

    expect(checkins.length).toEqual(2)
    expect(checkins[0].id).toEqual('id-21')
    expect(checkins[1].id).toEqual('id-22')
  })
})
