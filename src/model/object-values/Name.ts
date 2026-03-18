export class Name {
  private readonly value: string

  get name(): string {
    return this.value
  }

  constructor(name: string) {
    if (!Name.isValid(name)) {
      throw new Error("Name is required")
    }
    this.value = name
  }

  toString(): string {
    return this.name
  }

  private static isValid(name: string): boolean {
    return name.trim().length > 0
  }
}
