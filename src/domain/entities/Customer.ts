import type { Name } from "@/domain/object-values/Name"
import type { Phone } from "@/domain/object-values/Phone"
import type { Email } from "@/domain/object-values/Email"

export class Customer {
  private readonly _id: string
  private readonly _name: Name
  private readonly _phone: Phone
  private readonly _dateJoined: string
  private readonly _email: Email

  get id(): string {
    return this._id
  }

  get name(): Name {
    return this._name
  }

  get phone(): Phone {
    return this._phone
  }

  get dateJoined(): string {
    return this._dateJoined
  }

  get email(): Email | null {
    return this._email
  }

  constructor(
    id: string,
    name: Name,
    phone: Phone,
    dateJoined: string,
    email: Email,
  ) {
    this._id = id
    this._name = name
    this._phone = phone
    this._dateJoined = dateJoined
    this._email = email
  }
}
