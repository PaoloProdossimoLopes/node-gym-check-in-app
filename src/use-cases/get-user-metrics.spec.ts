import { InMemotyUsersRepository } from '@/repositories/in-memory-check-ins-repository'
import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

describe('GetUserMetrics', () => {
  it('should count', async () => {
    const userId = randomUUID()
    const repository = new InMemotyUsersRepository()
    const sut = new GetUserMetricsUseCase(repository)

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

    const { checkinsCount } = await sut.handle({ userId })

    expect(checkinsCount).toEqual(2)
  })
})
