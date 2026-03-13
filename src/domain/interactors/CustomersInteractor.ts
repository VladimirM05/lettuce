import { Customer } from "@/domain/entities/Customer"
import { CustomersGateway } from "@/dal/gateways/CustomersGateway"
import { Name } from "@/domain/object-values/Name"
import { Phone } from "@/domain/object-values/Phone"
import { Email } from "@/domain/object-values/Email"

type GetCustomersParams = {
  searchQuery: string
  currentPage: number
  rowsCount: number
}

export class CustomersInteractor {
  static getCustomers = async ({
    searchQuery,
    currentPage,
    rowsCount,
  }: GetCustomersParams) => {
    const customers = await CustomersGateway.getCustomers()

    const filteredCustomers = customers.filter(customer => {
      const searchField =
        String(customer.name) + customer.phone + customer.email
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

  static updateCustomer(customer: Customer) {
    const errors: Partial<Record<keyof Customer, string>> = {}

    const nameResult = Name.create(String(customer.name))
    if (!nameResult.success) errors.name = nameResult.error

    const phoneResult = Phone.create(String(customer.phone))
    if (!phoneResult.success) errors.phone = phoneResult.error

    const emailResult = Email.create(String(customer.email))
    if (!emailResult.success) errors.email = emailResult.error

    if (Object.keys(errors).length > 0) {
      return { success: false, errors: errors }
    }

    const newCustomer = new Customer(
      customer.id,
      nameResult.data,
      phoneResult.data,
      customer.dateJoined,
      emailResult.data,
    )

    CustomersGateway.updateCustomer(newCustomer)

    return { success: true, errors: {} }
  }
}
