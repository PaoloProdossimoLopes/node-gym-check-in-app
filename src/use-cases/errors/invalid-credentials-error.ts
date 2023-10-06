export class InvalidCredentialsError extends Error {
  constructor() {
    super('credentials are invalids')
    super.name = 'InvalidCredentialsError'
  }
}
