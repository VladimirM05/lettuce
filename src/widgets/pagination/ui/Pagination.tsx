import { useContext } from 'react'

import { Refresh } from './Refresh'
import { Button } from '@/shared/ui/button/Button'
import { PaginationSelect } from './PaginationSelect'
import { PaginationCounter } from './PaginationCounter'

import { TableContext } from '@/widgets/table/model/TableContext'

import First from '@/widgets/pagination/assets/first.svg?react'
import AllowLeft from '@/widgets/pagination/assets/arrow-left.svg?react'
import AllowRight from '@/widgets/pagination/assets/arrow-right.svg?react'
import Last from '@/widgets/pagination/assets/last.svg?react'

import styles from './Pagination.module.scss'

export const Pagination = () => {
  const context = useContext(TableContext)!
  const { currentPage, setCurrentPage, totalPages } = context

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <div className={styles.pagination}>
      <Refresh />
      <div className={styles.paginationControls}>
        <Button onClick={() => setCurrentPage(1)} disabled={isFirstPage}>
          <First />
        </Button>
        <Button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={isFirstPage}>
          <AllowLeft />
        </Button>
        <PaginationSelect />
        <Button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={isLastPage}>
          <AllowRight />
        </Button>
        <Button onClick={() => setCurrentPage(totalPages)} disabled={isLastPage}>
          <Last />
        </Button>
      </div>
      <PaginationCounter />
    </div>
  )
}
