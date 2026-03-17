import { Customer } from "@/model/entities/Customer"
import { Name } from "@/model/object-values/Name"
import { Phone } from "@/model/object-values/Phone"
import { Email } from "@/model/object-values/Email"
import type { CustomerDTO } from "@/model/dto/customerDTO"

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
          const nameResult = Name.create(customer.name)
          const phoneResult = Phone.create(customer.phone)
          const emailResult = Email.create(customer.email ?? "")

          if (!nameResult.data || !phoneResult.data || !emailResult.data) {
            return null
          }

          return new Customer(
            customer.id,
            nameResult.data,
            phoneResult.data,
            customer.dateJoined,
            emailResult.data,
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
