import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number().default(333),
})

const _env = schema.safeParse(process.env)

if (!_env.success) {
  const message = '❌ ERROR: Missing enviroment variable'
  console.log(message, _env.error.format())
  throw new Error(message)
}

export const env = _env.data
