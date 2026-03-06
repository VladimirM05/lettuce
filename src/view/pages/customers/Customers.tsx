import { useEffect, useState } from "react"
import { Table } from "@/view/primitives/table"
import type { Customer } from "@/domain/entities/Customer.ts"
import { CustomersInteractor } from "@/domain/interactors/CustomersInteractor.ts"
import { customerColumns } from "@/view/pages/customers/customerColumns.ts"

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [rowsCount, setRowsCount] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const loadCustomers = async () => {
      const result = await CustomersInteractor.getCustomers({
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
