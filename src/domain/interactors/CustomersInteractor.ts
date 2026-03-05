import type { Customer } from "@/domain/entities/Customer";
import { CustomersGateway } from "@/dal/gateways/CustomersGateway";

type GetCustomersParams = {
  searchQuery: string;
  currentPage: number;
  rowsCount: number;
};

export class CustomersInteractor {
  getCustomers = async ({
    searchQuery,
    currentPage,
    rowsCount,
  }: GetCustomersParams) => {
    const customers: Customer[] = await new CustomersGateway().getCustomers();

    const filteredCustomers = customers.filter((customer) => {
      const searchField = customer.name + customer.phone + customer.email;
      return searchField.includes(searchQuery);
    });

    const totalPages = Math.max(
      Math.ceil(filteredCustomers.length / rowsCount),
      1,
    );

    const start = (currentPage - 1) * rowsCount;
    const slicedCustomers = filteredCustomers.slice(start, start + rowsCount);

    return { slicedCustomers, totalPages };
  };
}
