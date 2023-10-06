import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface SearchGymData {
  query: string
  page: number
}

interface SearchGymResult {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private repository: GymsRepository) {}

  async handle(data: SearchGymData): Promise<SearchGymResult> {
    const gyms = await this.repository.searchManyByTitle(data.query, data.page)

    return { gyms }
  }
}
