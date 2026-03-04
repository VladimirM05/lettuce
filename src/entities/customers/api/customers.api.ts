import type { CustomerData } from '../types/customers'

export const fetchCustomers = async (): Promise<CustomerData[]> => {
  const result: Response = await fetch('/mock-customers.json')
  const data: { data: CustomerData[] } = await result.json()
  return data.data
}
