import { Customer } from "@/model/entities/Customer"
import { Name } from "@/model/object-values/Name"
import { Phone } from "@/model/object-values/Phone"
import { Email } from "@/model/object-values/Email"

type CustomerDTO = {
  id: string
  name: string
  phone: string
  email: string | null
  dateJoined: string
}

type CustomersResponse = {
  data: CustomerDTO[]
}

export class CustomersGateway {
  private static _customers: Customer[] = []

  static async getCustomers(): Promise<Customer[]> {
    if (this._customers.length === 0) {
      const response = await fetch("/mock-customers.json")
      const data: CustomersResponse = await response.json()

      this._customers = data.data
        .map(customer => {
          return new Customer(
            customer.id,
            new Name(customer.name),
            new Phone(customer.phone),
            customer.dateJoined,
            new Email(customer.email ?? ""),
          )
        })
        .filter(customer => customer !== null)
    }

    return this._customers
  }

  static updateCustomer(customer: Customer): void {
    const index = this._customers.findIndex(
      oldCustomer => oldCustomer.id === customer.id,
    )

    if (index !== -1) {
      this._customers[index] = customer
    }
  }
}
