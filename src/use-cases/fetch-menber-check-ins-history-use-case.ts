import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchMemberCheckInsHistoryData {
  userId: string
  page: number
}

interface FetchMemberCheckInsHistoryResult {
  checkins: CheckIn[]
}

export class FetchMemberCheckInsHistoryUseCase {
  constructor(private repository: CheckInsRepository) {}

  async handle({
    userId,
    page,
  }: FetchMemberCheckInsHistoryData): Promise<FetchMemberCheckInsHistoryResult> {
    const checkins = await this.repository.findManyBuUserId(userId, page)
    return { checkins }
  }
}
