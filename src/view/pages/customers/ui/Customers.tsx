import { useEffect, useState } from "react"

import { Search } from "@/view/primitives/search"
import { Pagination } from "@/view/primitives/pagination"
import { Table } from "@/view/primitives/table"
import { CustomerPopUp } from "@/view/components/customer-pop-up"

import type { TableColumn } from "@/view/primitives/table/types/TableColumn"
import type { Customer } from "@/model/entities/Customer"

import type { CustomerDTO } from "@/model/dto/customerDTO"
import { CustomersInteractor } from "@/model/interactors/CustomersInteractor"

import styles from "./Customers.module.scss"

const customerColumns: TableColumn<Customer>[] = [
  { key: "name", title: "Name", searchable: true },
  { key: "phone", title: "Phone", searchable: true },
  { key: "email", title: "Email", searchable: true },
  { key: "dateJoined", title: "Date Joined", searchable: false },
]

const customersInteractor = new CustomersInteractor()

export const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const [rowsCount, setRowsCount] = useState(10)

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()
  const [visibleCustomerPopUp, setVisibleCustomerPopUp] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Partial<
    Record<keyof Customer, string>
  > | null>({})

  // Search and pagination logic.
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

  const handleCurrentPage = (page: number) => setCurrentPage(page)

  const handleSearchValue = (search: string) => setSearchValue(search)

  const handleRowsCount = (rows: number) => setRowsCount(rows)

  // Customer pop-up logic.
  const handleSelectedCustomer = (selectedCustomer: Customer) => {
    setSelectedCustomer(selectedCustomer)
    setVisibleCustomerPopUp(true)
  }

  const handleCloseCustomerPopUp = () => {
    setValidationErrors({})
    setVisibleCustomerPopUp(false)
  }

  const handleUpdateCustomer = (updatedCustomer: CustomerDTO) => {
    const result = customersInteractor.updateCustomer(updatedCustomer)
    if (!result.success) {
      setValidationErrors(result.errors)
      return
    }

    const newCustomer = result.data

    setValidationErrors({})
    setCustomers(prev =>
      prev.map(oldCustomer =>
        newCustomer && oldCustomer.id === newCustomer.id
          ? newCustomer
          : oldCustomer,
      ),
    )
    setVisibleCustomerPopUp(false)
  }

  return (
    <section className={styles["customers"]}>
      {visibleCustomerPopUp && selectedCustomer && (
        <CustomerPopUp
          customer={selectedCustomer}
          onClose={handleCloseCustomerPopUp}
          onCustomerChange={handleUpdateCustomer}
          errors={validationErrors}
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
        onSelectedRowChange={handleSelectedCustomer}
      />
    </section>
  )
}
