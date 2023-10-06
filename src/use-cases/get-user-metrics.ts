import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsData {
  userId: string
}

interface GetUserMetricsResult {
  checkinsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private repository: CheckInsRepository) {}

  async handle({ userId }: GetUserMetricsData): Promise<GetUserMetricsResult> {
    const checkinsCount = await this.repository.countByUserId(userId)
    return { checkinsCount }
  }
}
