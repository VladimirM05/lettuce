import type { Customer } from "@/domain/entities/Customer"
import { CustomersGateway } from "@/dal/gateways/CustomersGateway"

type GetCustomersParams = {
  searchQuery: string
  currentPage: number
  rowsCount: number
}

export class CustomersInteractor {
  private static _customers: Customer[] = []

  static get customers(): Customer[] {
    return this._customers
  }

  static set customers(customers: Customer[]) {
    this._customers = customers
  }

  static getCustomers = async ({
    searchQuery,
    currentPage,
    rowsCount,
  }: GetCustomersParams) => {
    if (this._customers.length === 0) {
      this._customers = await new CustomersGateway().getCustomers()
    }

    const filteredCustomers = this._customers.filter((customer) => {
      const searchField = customer.name + customer.phone + customer.email
      return searchField.includes(searchQuery)
    })

    const totalPages = Math.max(
      Math.ceil(filteredCustomers.length / rowsCount),
      1,
    )

    const start = (currentPage - 1) * rowsCount
    const slicedCustomers = filteredCustomers.slice(start, start + rowsCount)

    return { slicedCustomers, totalPages }
  }

  static getCustomerById = async (id: number) => {
    let customer = this._customers.find((c) => c.id === id) ?? null
    if (!customer) {
      customer = await new CustomersGateway().getCustomerById(id)
      if (customer) this._customers.push(customer)
    }
    return customer
  }

  static updateCustomer(customer: Customer) {
    const index = this._customers.findIndex((c) => c.id === customer.id)

    if (index !== -1) {
      this._customers[index] = customer
    }
  }
}
