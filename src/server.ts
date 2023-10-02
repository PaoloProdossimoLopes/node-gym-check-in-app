import { app } from '@src/app'
import { env } from '@src/env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => console.log('🚀 HTTP server running!'))
