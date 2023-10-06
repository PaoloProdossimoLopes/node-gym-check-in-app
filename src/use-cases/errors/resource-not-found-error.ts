export class ResourceNotFound extends Error {
  constructor() {
    super('Resource not found')
    super.name = 'ResourceNotFoundError'
  }
}
