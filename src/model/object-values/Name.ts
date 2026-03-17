type CreateNameParams = {
  success: boolean
  data?: Name
  error?: string
}

export class Name {
  private readonly _name: string

  get name(): string {
    return this._name
  }

  private constructor(name: string) {
    this._name = name
  }

  toString(): string {
    return this._name
  }

  static create(name: string): CreateNameParams {
    if (!this._isValid(name)) {
      return { success: false, error: "Name is required" }
    }

    return { success: true, data: new Name(name) }
  }

  private static _isValid(name: string): boolean {
    return name.trim().length > 0
  }
}
