import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found-error'

interface ValidateCheckInData {
  checkId: string
}

interface ValidateCheckInResult {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private repository: CheckInsRepository) {}

  async handle({
    checkId,
  }: ValidateCheckInData): Promise<ValidateCheckInResult> {
    const checkIn = await this.repository.findById(checkId)

    if (!checkIn) throw new ResourceNotFound()
    const date = new Date()

    // validar os 20 minutos

    checkIn.validated_at = date
    await this.repository.save(checkIn)

    return {
      checkIn,
    }
  }
}
