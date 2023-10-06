import { InMemotyUsersRepository } from '@/repositories/in-memory-check-ins-repository'
import { describe, expect, it } from 'vitest'
import { CheckInUseCase } from './check-in-use-case'

describe('CheckInsRepotory', () => {
  it('should be able create a checkins', async () => {
    const registerUseCase = new CheckInUseCase(new InMemotyUsersRepository())
    const data = {
      gymId: 'any gym id',
      userId: 'any user id',
    }
    const { checkIn } = await registerUseCase.handle(data)
    expect(checkIn.id).toEqual(expect.any(String))
    expect(checkIn.gym_id).toEqual(data.gymId)
    expect(checkIn.user_id).toEqual(data.userId)
    expect(checkIn.validated_at).toEqual(null)
  })
})
