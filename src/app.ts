import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from '@src/http/routes'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format()._errors,
    })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }

  return reply.status(500).send({
    message: 'Interna server error',
  })
})
