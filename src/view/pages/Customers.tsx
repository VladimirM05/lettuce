import { useEffect, useState } from "react"
import { CustomersInteractor } from "@/domain/interactors/CustomersInteractor"
import type { TableColumn } from "@/view/primitives/table/types/TableColumn"
import { Table } from "@/view/primitives/table"
import type { Customer } from "@/domain/entities/Customer"

const customerColumns: TableColumn<Customer>[] = [
  { key: "name", title: "Name", searchable: true },
  { key: "phone", title: "Phone", searchable: true },
  { key: "email", title: "Email", searchable: true },
  { key: "dateJoined", title: "Date Joined", searchable: false },
]

const customersInteractor = new CustomersInteractor()

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [rowsCount, setRowsCount] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const loadCustomers = async () => {
      const result = await customersInteractor.getCustomers({
        searchQuery: searchValue,
        currentPage: currentPage,
        rowsCount: rowsCount,
      })

      setCustomers(result.slicedCustomers)
      setTotalPages(result.totalPages)
    }

    void loadCustomers()
  }, [searchValue, currentPage, rowsCount])

  const handleSearchValue = (value: string) => {
    setSearchValue(value)
    setCurrentPage(1)
  }
  const handleCurrentPage = (page: number) => setCurrentPage(page)
  const handleRowsCount = (value: number) => {
    setRowsCount(value)
    setCurrentPage(1)
  }

  return (
    <Table
      columns={customerColumns}
      data={customers}
      onSearchValueChange={handleSearchValue}
      rowsCount={rowsCount}
      currentPage={currentPage}
      totalPages={totalPages}
      onCurrentPageChange={handleCurrentPage}
      onRowsCountChange={handleRowsCount}
    />
  )
}

export default Customers
