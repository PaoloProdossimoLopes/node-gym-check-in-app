import { register } from '@src/http/controllers/register'
import { FastifyInstance } from 'fastify'

export async function routes(app: FastifyInstance) {
  app.post('/users', register)
}
