import { register } from '@src/http/controllers/register'
import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'

export async function routes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
