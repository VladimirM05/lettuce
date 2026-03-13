export class Phone {
  private readonly _phone: string

  get phone(): string {
    return this._phone
  }

  constructor(phone: string) {
    if (this._isValid(phone)) {
      this._phone = phone
    } else {
      throw new Error("Phone is required")
    }
  }

  private _isValid = (phone: string): boolean => {
    return phone.startsWith("+")
  }
}
