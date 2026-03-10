import { useEffect, useState } from "react"

import { CustomerPopUp } from "@/view/components/customer-pop-up/ui/CustomerPopUp"
import { Search } from "@/view/primitives/search"
import { Pagination } from "@/view/primitives/pagination"
import { Table } from "@/view/primitives/table"

import type { TableColumn } from "@/view/primitives/table/types/TableColumn"
import type { Customer } from "@/domain/entities/Customer"

import { CustomersInteractor } from "@/domain/interactors/CustomersInteractor"

import styles from "./Customers.module.scss"

const customerColumns: TableColumn<Customer>[] = [
  { key: "name", title: "Name", searchable: true },
  { key: "phone", title: "Phone", searchable: true },
  { key: "email", title: "Email", searchable: true },
  { key: "dateJoined", title: "Date Joined", searchable: false },
]

export const Customers = () => {
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
    <section className={styles["customers"]}>
      {visibleCustomerPopUp && selectedCustomer && (
        <CustomerPopUp
          customer={selectedCustomer}
          onVisibleCustomerPopUpChange={handleVisibleCustomerPopUp}
          handleUpdateCustomer={handleUpdateCustomer}
        />
      )}
      <div className={styles["customers__controls"]}>
        <Search
          onSearchValueChange={handleSearchValue}
          onCurrentPageChange={handleCurrentPage}
        />
        <Pagination
          rowsCount={rowsCount}
          currentPage={currentPage}
          totalPages={totalPages}
          onRowsCountChange={handleRowsCount}
          onCurrentPageChange={handleCurrentPage}
        />
      </div>
      <Table
        columns={customerColumns}
        data={customers}
        onSelectedCustomerChange={handleSelectedCustomer}
        onVisibleCustomerPopUpChange={handleVisibleCustomerPopUp}
      />
    </section>
  )
}
