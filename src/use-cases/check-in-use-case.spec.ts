import { InMemotyUsersRepository } from '@/repositories/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach } from 'node:test'
import { describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in-use-case'
import { InvalidDistanceError } from './errors/invalid-distance-error'
import { MoreThanOneCheckInOnDayError } from './errors/more-than-one-check-in-on-day-error'

describe('CheckInsRepotory', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able create a checkins', async () => {
    const date = new Date(2022, 0, 20, 8, 0, 0)
    vi.setSystemTime(date)
    const gymId = 'any gym id'
    const gymsRepository = new InMemoryGymsRepository()
    const registerUseCase = new CheckInUseCase(
      new InMemotyUsersRepository(),
      gymsRepository,
    )
    await gymsRepository.create({
      id: gymId,
      description: 'any description',
      latitule: new Decimal(0),
      longitude: new Decimal(0),
      phone: 'any phone',
      title: 'any title',
    })
    const data = {
      gymId,
      userId: 'any user id',
      userLatitude: 0,
      userLongitude: 0,
    }
    const { checkIn } = await registerUseCase.handle(data)
    expect(checkIn.id).toEqual(expect.any(String))
    expect(checkIn.gym_id).toEqual(data.gymId)
    expect(checkIn.user_id).toEqual(data.userId)
    expect(checkIn.validated_at).toEqual(null)
    expect(checkIn.created_at).toEqual(date)
  })

  it('should be able to check in twice in the same day', async () => {
    const date = new Date(2022, 0, 20, 8, 0, 0)
    vi.setSystemTime(date)
    const data = {
      userId: 'any user id',
      gymId: 'any gym id',
      userLatitude: 0,
      userLongitude: 0,
    }
    const gymsRepository = new InMemoryGymsRepository()
    const repository = new InMemotyUsersRepository()
    const sut = new CheckInUseCase(repository, gymsRepository)
    await gymsRepository.create({
      id: data.gymId,
      description: 'any description',
      latitule: new Decimal(0),
      longitude: new Decimal(0),
      phone: 'any phone',
      title: 'any title',
    })

    vi.setSystemTime(date)
    await sut.handle(data)

    await expect(() => sut.handle(data)).rejects.toBeInstanceOf(
      MoreThanOneCheckInOnDayError,
    )
  })

  it('should not be able to checkin when is nto closer enouth', async () => {
    const date = new Date(2022, 0, 20, 8, 0, 0)
    vi.setSystemTime(date)
    const gymId = 'any gym id'
    const gymsRepository = new InMemoryGymsRepository()
    const registerUseCase = new CheckInUseCase(
      new InMemotyUsersRepository(),
      gymsRepository,
    )
    await gymsRepository.create({
      id: gymId,
      description: 'any description',
      latitule: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
      phone: 'any phone',
      title: 'any title',
    })
    const data = {
      gymId,
      userId: 'any user id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }
    await expect(() => registerUseCase.handle(data)).rejects.toBeInstanceOf(
      InvalidDistanceError,
    )
  })
})
