import type { Name } from "@/domain/object-values/Name"
import type { Phone } from "@/domain/object-values/Phone"
import type { Email } from "@/domain/object-values/Email"

export class Customer {
  id: number
  name: Name
  phone: Phone
  dateJoined: string
  email?: Email

  constructor(
    id: number,
    name: Name,
    phone: Phone,
    dateJoined: string,
    email?: Email,
  ) {
    this.id = id
    this.name = name
    this.phone = phone
    this.dateJoined = dateJoined
    this.email = email
  }
}
