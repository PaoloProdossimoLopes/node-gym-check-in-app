import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNearbyGymsData {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsResult {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private repository: GymsRepository) {}

  async handle(data: FetchNearbyGymsData): Promise<FetchNearbyGymsResult> {
    const gyms = await this.repository.findmanyBearBy(
      data.userLatitude,
      data.userLongitude,
    )

    return { gyms }
  }
}
