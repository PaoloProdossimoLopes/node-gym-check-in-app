import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CheckInsRepository } from './check-ins-repository'

export class InMemotyUsersRepository implements CheckInsRepository {
  async save(checkIn: CheckIn) {
    const i = this.items.findIndex((item) => item.id === checkIn.id)
    if (i >= 0) {
      this.items[i] = checkIn
    }

    return checkIn
  }

  async findById(id: string) {
    const checkin = this.items.find((item) => item.id === id)

    if (!checkin) return null

    return checkin
  }

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length
  }

  public items: CheckIn[] = []

  async findManyBuUserId(userId: string, page: number) {
    const checkIns: CheckIn[] = this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
    return checkIns
  }

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
      id: data.id ?? randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }
    this.items.push(checkIn)
    return checkIn
  }
}
