import { useEffect, useState } from "react"
import { CustomerPopUp } from "@/view/components/customer-pop-up/ui/CustomerPopUp.tsx"
import { Table } from "@/view/primitives/table"
import type { TableColumn } from "@/view/primitives/table/types/TableColumn"
import type { Customer } from "@/domain/entities/Customer"
import { CustomersInteractor } from "@/domain/interactors/CustomersInteractor"

const customerColumns: TableColumn<Customer>[] = [
  { key: "name", title: "Name", searchable: true },
  { key: "phone", title: "Phone", searchable: true },
  { key: "email", title: "Email", searchable: true },
  { key: "dateJoined", title: "Date Joined", searchable: false },
]

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const [rowsCount, setRowsCount] = useState(10)

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()
  const [visibleCustomerPopUp, setVisibleCustomerPopUp] = useState(false)

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

  // Search and pagination logic.
  const handleCurrentPage = (page: number) => setCurrentPage(page)

  const handleSearchValue = (search: string) => setSearchValue(search)

  const handleRowsCount = (rows: number) => setRowsCount(rows)

  // Customer pop-up logic.
  const handleSelectedCustomer = (selectedCustomer: Customer) =>
    setSelectedCustomer(selectedCustomer)

  const handleVisibleCustomerPopUp = (visible: boolean) =>
    setVisibleCustomerPopUp(visible)

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    CustomersInteractor.updateCustomer(updatedCustomer)
    setCustomers((prev) =>
      prev.map((oldCustomer) =>
        oldCustomer.id === updatedCustomer.id ? updatedCustomer : oldCustomer,
      ),
    )
  }

  return (
    <>
      {visibleCustomerPopUp && selectedCustomer && (
        <CustomerPopUp
          customer={selectedCustomer}
          onVisibleCustomerPopUpChange={handleVisibleCustomerPopUp}
          handleUpdateCustomer={handleUpdateCustomer}
        />
      )}
      <Table
        columns={customerColumns}
        data={customers}
        onSearchValueChange={handleSearchValue}
        rowsCount={rowsCount}
        currentPage={currentPage}
        totalPages={totalPages}
        onCurrentPageChange={handleCurrentPage}
        onRowsCountChange={handleRowsCount}
        onSelectedCustomerChange={handleSelectedCustomer}
        onVisibleCustomerPopUpChange={handleVisibleCustomerPopUp}
      />
    </>
  )
}

export default Customers
