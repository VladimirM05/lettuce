import type { Name } from "@/model/object-values/Name"
import type { Phone } from "@/model/object-values/Phone"
import type { Email } from "@/model/object-values/Email"

export class Customer {
  private readonly idValue: string
  private nameValue: Name
  private phoneValue: Phone
  private readonly dateJoinedValue: string
  private emailValue: Email

  get id(): string {
    return this.idValue
  }
  get name(): Name {
    return this.nameValue
  }
  get phone(): Phone {
    return this.phoneValue
  }
  get dateJoined(): string {
    return this.dateJoinedValue
  }
  get email(): Email {
    return this.emailValue
  }

  set name(name: Name) {
    this.nameValue = name
  }
  set phone(phone: Phone) {
    this.phoneValue = phone
  }
  set email(email: Email) {
    this.emailValue = email
  }

  constructor(
    id: string,
    name: Name,
    phone: Phone,
    dateJoined: string,
    email: Email,
  ) {
    this.idValue = id
    this.nameValue = name
    this.phoneValue = phone
    this.dateJoinedValue = dateJoined
    this.emailValue = email
  }
}
