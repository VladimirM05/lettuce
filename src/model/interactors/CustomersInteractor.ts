import { Customer } from "@/model/entities/Customer"
import { CustomersGateway } from "@/dal/gateways/CustomersGateway"
import { Name } from "@/model/object-values/Name"
import { Phone } from "@/model/object-values/Phone"
import { Email } from "@/model/object-values/Email"
import type { CustomerDTO } from "@/model/dto/customerDTO"

type GetCustomersParams = {
  searchQuery: string
  currentPage: number
  rowsCount: number
}

type UpdateCustomerParams = {
  success: boolean
  data: Customer | null
  errors: Partial<Record<keyof Customer, string>> | null
}

const customersGateway = new CustomersGateway()

export class CustomersInteractor {
  async getCustomers({
    searchQuery,
    currentPage,
    rowsCount,
  }: GetCustomersParams) {
    const customers = await customersGateway.getCustomers()

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

  updateCustomer(customer: CustomerDTO): UpdateCustomerParams {
    const errors: Partial<Record<keyof Customer, string>> = {}

    const nameResult = Name.create(customer.name)
    if (!nameResult.success) errors.name = nameResult.error

    const phoneResult = Phone.create(customer.phone)
    if (!phoneResult.success) errors.phone = phoneResult.error

    const emailResult = Email.create(customer.email ?? "")
    if (!emailResult.success) errors.email = emailResult.error

    if (!nameResult.data || !phoneResult.data || !emailResult.data) {
      return { success: false, data: null, errors: errors }
    }

    const newCustomer = new Customer(
      customer.id,
      nameResult.data,
      phoneResult.data,
      customer.dateJoined,
      emailResult.data,
    )

    customersGateway.updateCustomer(newCustomer)

    return { success: true, data: newCustomer, errors: null }
  }
}
