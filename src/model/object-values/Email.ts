type CreateEmailParams = {
  success: boolean
  data?: Email
  error?: string
}

export class Email {
  private readonly _email: string | null

  get email(): string | null {
    return this._email
  }

  private constructor(email: string | null) {
    this._email = email
  }

  toString(): string | null {
    return this._email
  }

  static create(email: string | null): CreateEmailParams {
    if (email && !this._isValid(email)) {
      return { success: false, error: "email is required" }
    }

    return { success: true, data: new Email(email) }
  }

  private static _isValid(email: string): boolean {
    return email.includes("@")
  }
}
