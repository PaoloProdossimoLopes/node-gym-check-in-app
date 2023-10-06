import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { PrismaUsersRepository } from '@src/repositories/prisma-users-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const userRequest = userSchema.parse(request.body)

  try {
    const repository = new PrismaUsersRepository()
    const useCase = new AuthenticateUseCase(repository)
    await useCase.handle(userRequest)
  } catch (error) {
    if (error instanceof InvalidCredentialsError)
      return reply.status(400).send({
        error: 'Email or Password are wrong, try again',
        messsage: error.message,
      })

    throw error
  }

  return reply.status(201).send()
}
