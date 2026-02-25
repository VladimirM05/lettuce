import * as React from 'react'
import { useEffect, useState } from 'react'

export const useScrollToTop = <G extends HTMLElement>(ref: React.RefObject<G | null>) => {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const shouldShow = element.scrollTop > 300
      setVisible((prev) => (prev !== shouldShow ? shouldShow : prev))
    }

    element.addEventListener('scroll', handleScroll)
    return () => element.removeEventListener('scroll', handleScroll)
  }, [ref])

  const scrollToTop = () => ref.current?.scrollTo({ top: 0, behavior: 'smooth' })

  return { visible, scrollToTop }
}
