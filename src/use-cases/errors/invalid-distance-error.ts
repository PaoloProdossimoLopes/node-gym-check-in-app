export class InvalidDistanceError extends Error {
  constructor() {
    super('You dont are close to the gym enought')
    super.name = 'InvalidDistanceError'
  }
}
