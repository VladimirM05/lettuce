export class Name {
  private readonly _name: string

  get name(): string {
    return this._name
  }

  constructor(name: string) {
    if (this._isValid(name)) {
      this._name = name
    } else {
      throw new Error("Name is required")
    }
  }

  private _isValid = (name: string): boolean => {
    return name.trim().length > 0
  }
}
