export class Email {
  private readonly value: string | null

  get email(): string | null {
    return this.value
  }

  constructor(email: string | null) {
    if (email && !Email.isValid(email)) {
      throw new Error("Email is required")
    }
    this.value = email
  }

  toString(): string | null {
    return this.email
  }

  private static isValid(email: string): boolean {
    return email.includes("@")
  }
}
