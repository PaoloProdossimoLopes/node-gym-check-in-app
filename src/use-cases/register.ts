import { UserRepository } from '@src/repositories/user-repository'
import bcrypt from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

interface Data {
  name: string
  email: string
  password: string
}

export class RegistgerUseCase {
  constructor(private repository: UserRepository) {}

  async handle({ name, email, password }: Data) {
    const userWithSameEmail = await this.repository.findUserByEmail(email)
    if (userWithSameEmail) throw new EmailAlreadyExistsError()

    const password_hash = await bcrypt.hash(password, 6)
    const user = await this.repository.handle({ name, email, password_hash })

    return { user }
  }
}
