import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface CheckInData {
  userId: string
  gymId: string
}

interface CheckInResult {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private repository: CheckInsRepository) {}

  async handle({ userId, gymId }: CheckInData): Promise<CheckInResult> {
    const checkIn = await this.repository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
