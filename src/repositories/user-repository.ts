import { User } from '@prisma/client'

export interface UserData {
  name: string
  email: string
  password_hash: string
}

export type UserResult = User

export interface UserRepository {
  handle({ name, email, password_hash }: UserData): Promise<UserResult>
  findUserByEmail(email: string): Promise<UserResult | null>
}
