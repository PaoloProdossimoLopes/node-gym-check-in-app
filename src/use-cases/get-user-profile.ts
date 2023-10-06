import { User } from '@prisma/client'
import { UserRepository } from './../repositories/user-repository'
import { ResourceNotFound } from './errors/resource-not-found-error'

interface GetUserProfileData {
  userId: string
}

interface GetUserProfileResult {
  user: User
}

export class GetUserProfile {
  constructor(private userRepository: UserRepository) {}

  async handle({ userId }: GetUserProfileData): Promise<GetUserProfileResult> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new ResourceNotFound()

    return { user }
  }
}
