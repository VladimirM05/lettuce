export class Email {
  private readonly _email: string

  get email(): string {
    return this._email
  }

  private constructor(email: string) {
    this._email = email
  }

  static create(email: string) {
    if (!this._isValid(email)) {
      return { success: false, error: "email is required" }
    }

    return { success: true, data: new Email(email) }
  }

  private static _isValid(email: string): boolean {
    return email.includes("@")
  }
}
