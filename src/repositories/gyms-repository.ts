import { Gym } from '@prisma/client'

export interface GymsRepository {
  fidById(id: string): Promise<Gym | null>
  create(data: Gym): Promise<Gym>
}
