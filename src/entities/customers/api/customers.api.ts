import type { CustomerData } from '../types/customers'

export const customers = async () => {
  const result = await fetch('/mock-customers.json')
  const data: { data: CustomerData[] } = await result.json()
  return data.data
}
