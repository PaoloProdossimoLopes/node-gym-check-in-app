import { register } from '@/http/controllers/users/register'
import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/users/authenticate'
import { profile } from './controllers/users/profile'
import { verifyJWT } from './midlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
