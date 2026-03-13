export class Phone {
  private readonly _phone: string

  get phone(): string {
    return this._phone
  }

  private constructor(phone: string) {
    this._phone = phone
  }

  static create(phone: string) {
    if (!this._isValid(phone)) {
      return { success: false, error: "Phone is required" }
    }

    return { success: true, data: new Phone(phone) }
  }

  private static _isValid(phone: string): boolean {
    return phone.startsWith("+")
  }
}
