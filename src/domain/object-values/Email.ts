export class Email {
  private readonly _email: string

  get email(): string {
    return this._email
  }

  constructor(email: string) {
    if (this._isValid(email)) {
      this._email = email
    } else {
      throw new Error("email is required")
    }
  }

  private _isValid = (email: string): boolean => {
    return email.includes("@")
  }
}
