import type { FC, SVGProps } from 'react'

import { Refresh } from './Refresh'
import { Button } from '@/shared/ui/button/Button'
import { PaginationSelect } from './PaginationSelect'
import { PaginationCounter } from './PaginationCounter'

import First from '@/widgets/pagination/assets/first.svg?react'
import AllowLeft from '@/widgets/pagination/assets/arrow-left.svg?react'
import AllowRight from '@/widgets/pagination/assets/arrow-right.svg?react'
import Last from '@/widgets/pagination/assets/last.svg?react'

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
