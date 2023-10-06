import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { UserRepository } from './../repositories/user-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateData {
  email: string
  password: string
}

interface AuthenticateResult {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async handle({
    email,
    password,
  }: AuthenticateData): Promise<AuthenticateResult> {
    const user = await this.userRepository.findUserByEmail(email)
    if (!user) throw new InvalidCredentialsError()

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) throw new InvalidCredentialsError()

    return { user }
  }
}
