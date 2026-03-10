import type { Customer } from "@/domain/entities/Customer"

export class CustomersGateway {
  private static _customers: Customer[] = []

  static get customers(): Customer[] {
    return this._customers
  }

  static set customers(customers: Customer[]) {
    this._customers = customers
  }

  static getCustomers = async (): Promise<Customer[]> => {
    if (this._customers.length === 0) {
      const response = await fetch("/mock-customers.json")
      const data = await response.json()
      this._customers = data.data
    }

    return this._customers
  }

  static updateCustomer(customer: Customer): void {
    const index = this._customers.findIndex(c => c.id === customer.id)

    if (index !== -1) {
      this._customers[index] = customer
    }
  }
}
