import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { CheckIn } from '@prisma/client'
import { getDistanceBetweenCoordinates } from '../utils/get-distance-coordinates'
import { InvalidDistanceError } from './errors/invalid-distance-error'
import { MoreThanOneCheckInOnDayError } from './errors/more-than-one-check-in-on-day-error'
import { ResourceNotFound } from './errors/resource-not-found-error'

interface CheckInData {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInResult {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInstRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async handle({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInData): Promise<CheckInResult> {
    const gym = await this.gymsRepository.fidById(gymId)
    if (!gym) throw new ResourceNotFound()

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitule.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )
    const MAX_DISTANCE = 0.1 /* 0.1KM == 100m */
    if (distance > MAX_DISTANCE) throw new InvalidDistanceError()

    const check = await this.checkInstRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )
    if (check !== null) throw new MoreThanOneCheckInOnDayError()

    const checkIn = await this.checkInstRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
