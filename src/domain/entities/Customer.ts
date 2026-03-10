export class Customer {
  readonly id: number
  name: string
  phone: string
  dateJoined: string
  email?: string

  constructor(
    id: number,
    name: string,
    phone: string,
    dateJoined: string,
    email?: string,
  ) {
    this.id = id
    this.name = name
    this.phone = phone
    this.dateJoined = dateJoined
    this.email = email
  }
}
