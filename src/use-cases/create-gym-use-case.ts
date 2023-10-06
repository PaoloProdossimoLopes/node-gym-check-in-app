import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'

interface CreateGymData {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymResult {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private repository: GymsRepository) {}

  async handle(data: CreateGymData): Promise<CreateGymResult> {
    const gym = await this.repository.create({
      id: randomUUID(),
      title: data.title,
      phone: data.phone,
      description: data.description,
      latitule: new Decimal(data.latitude),
      longitude: new Decimal(data.longitude),
    })

    return { gym }
  }
}
