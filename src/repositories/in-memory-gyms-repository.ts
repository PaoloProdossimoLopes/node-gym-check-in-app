import { getDistanceBetweenCoordinates } from '@/utils/get-distance-coordinates'
import { Gym } from '@prisma/client'
import { GymsRepository } from './gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  async findmanyBearBy(latitule: number, longitude: number) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: latitule, longitude },
        {
          latitude: item.latitule.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10 /* 10KM */
    })
  }

  async searchManyByTitle(title: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(title))
      .slice((page - 1) * 20, page * 20)
  }

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
