import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(req: FastifyRequest, rep: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.handle({
    userId: req.user.sub,
  })

  rep.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
