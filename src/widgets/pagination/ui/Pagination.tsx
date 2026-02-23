import type { FC, SVGProps } from 'react'

import First from '@/app/assets/images/first.svg?react'
import AllowLeft from '@/app/assets/images/arrow-left.svg?react'
import AllowRight from '@/app/assets/images/arrow-right.svg?react'
import Last from '@/app/assets/images/last.svg?react'

import { Refresh } from '@/entities/buttons/refresh'
import { Button } from '@/shared/ui/button/Button'
import { PaginationSelect } from '@/entities/pagination-select'
import { PaginationCounter } from '@/entities/pagination-counter'

import styles from './Pagination.module.scss'

type PaginationItemType = 'button' | 'select'

interface PaginationItem {
  type: PaginationItemType
  icon?: FC<SVGProps<SVGSVGElement>>
}

const paginationItems: PaginationItem[] = [
  { type: 'button', icon: First },
  { type: 'button', icon: AllowLeft },
  { type: 'select' },
  { type: 'button', icon: AllowRight },
  { type: 'button', icon: Last },
]

export const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <Refresh />
      <div className={styles.paginationControls}>
        {paginationItems.map((item, index) => {
          if (item.type === 'button' && item.icon) {
            return (
              <Button key={index}>
                <item.icon />
              </Button>
            )
          }
          return <PaginationSelect key={index} />
        })}
      </div>
      <PaginationCounter />
    </div>
  )
}
