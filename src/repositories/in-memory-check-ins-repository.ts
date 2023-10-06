import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CheckInsRepository } from './check-ins-repository'

export class InMemotyUsersRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const item = this.items.find(
      (item) =>
        item.user_id === userId && date.getDate() === item.created_at.getDate(),
    )

    if (!item) return null

    return item
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      gym_id: data.gym_id,
      user_id: data.user_id,
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }
    this.items.push(checkIn)
    return checkIn
  }
}
