export class MoreThanOneCheckInOnDayError extends Error {
  constructor() {
    super('Can not make more than one checkin in the same day')
    super.name = 'MoreThanOneCheckInOnDayError'
  }
}
