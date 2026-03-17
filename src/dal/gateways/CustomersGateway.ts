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
  private _customers: Customer[] = []

  async getCustomers(): Promise<Customer[]> {
    if (this._customers.length === 0) {
      const response = await fetch("/mock-customers.json")
      const data: CustomersResponse = await response.json()

      this._customers = data.data
        .map(customer => {
          const nameResult = Name.create(customer.name)
          const phoneResult = Phone.create(customer.phone)
          const emailResult = Email.create(customer.email ?? "")

          if (!nameResult.data ?? !phoneResult.data ?? !emailResult.data) {
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

  updateCustomer(customer: Customer): void {
    const index = this._customers.findIndex(c => c.id === customer.id)

    if (index !== -1) {
      this._customers[index] = customer
    }
  }
}
