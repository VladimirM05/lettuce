import type { Customer } from "@/domain/entities/Customer"

export class CustomersGateway {
  getCustomers = async (): Promise<Customer[]> => {
    const result: Response = await fetch("/mock-customers.json")
    const data: { data: Customer[] } = await result.json()
    return data.data
  }

  getCustomerById = async (id: number): Promise<Customer | null> => {
    const result: Response = await fetch("/mock-customers.json")
    const data: { data: Customer[] } = await result.json()
    return data.data.find((customer) => customer.id === id) ?? null
  }
}
