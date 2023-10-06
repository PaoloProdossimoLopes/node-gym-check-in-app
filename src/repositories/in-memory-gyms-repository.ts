import { Gym } from '@prisma/client'
import { GymsRepository } from './gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  async create(data: Gym) {
    const gym = {
      id: data.id,
      description: data.description,
      latitule: data.latitule,
      longitude: data.longitude,
      phone: data.phone,
      title: data.title,
    }
    this.items.push(gym)
    return gym
  }

  private items: Gym[] = []

  async fidById(id: string) {
    const item = this.items.find((gym) => gym.id === id)
    if (!item) return null
    return item
  }
}
