import { User } from '@prisma/client'
import { UserData, UserRepository } from './user-repository'

export class InMemotyUsersRepository implements UserRepository {
  public items: User[] = []

  async findById(userId: string) {
    const user = this.items.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }

  async handle({ name, email, password_hash }: UserData): Promise<{
    id: string
    name: string
    email: string
    password_hash: string
    created_at: Date
  }> {
    const u = {
      id: 'any user',
      name,
      email,
      password_hash,
      created_at: new Date(),
    }
    this.items.push(u)
    return u
  }

  async findUserByEmail(email: string): Promise<{
    id: string
    name: string
    email: string
    password_hash: string
    created_at: Date
  } | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
