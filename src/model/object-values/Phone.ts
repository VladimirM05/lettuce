export class Phone {
  private readonly value: string

  get phone(): string {
    return this.value
  }

  constructor(phone: string) {
    if (!Phone.isValid(phone)) {
      throw new Error("Phone is required")
    }
    this.value = phone
  }

  toString(): string {
    return this.value
  }

  private static isValid(phone: string): boolean {
    return phone.startsWith("+")
  }
}
