import { useContext, useEffect, useRef, useState } from 'react'
import { TableControls } from './TableControls'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { ScrollToTopButton } from './ScrollToTopButton'
import styles from './Table.module.scss'
import { CustomerContext } from '@/pages/customers/model/CustomerContext.ts'
import type { CustomerData } from '@/pages/customers/model/customerData'

export const Table = () => {
  // Скрытие скролла при достижении определенной высоты.
  const bodyRef = useRef<HTMLTableSectionElement>(null)
  const [showScrollToTopButton, setShowScrollToTopButton] = useState<boolean>(false)

  useEffect(() => {
    const element = bodyRef.current
    if (!element) return

    const handleScroll = () => {
      const shouldShow = element.scrollTop > 300
      setShowScrollToTopButton((prev) => (prev !== shouldShow ? shouldShow : prev))
    }

    element.addEventListener('scroll', handleScroll)
    return () => element.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToTop = () => {
    bodyRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Поиск
  const context = useContext(CustomerContext)
  const data = context?.data ?? []
  const searchQuery = context?.searchQuery ?? ''

  const filteredData = data.filter((customer: CustomerData) => {
    const query: string = searchQuery.toLowerCase()

    return (
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.dateJoined.includes(query)
    )
  })

  return (
    <div className={styles.tableWrapper}>
      <TableControls />
      <table className={styles.table}>
        <TableHeader />
        <TableBody data={filteredData} ref={bodyRef} />
      </table>
      <ScrollToTopButton onClick={handleScrollToTop} visible={showScrollToTopButton} />
    </div>
  )
}
