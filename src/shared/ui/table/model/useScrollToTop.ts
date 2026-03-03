import { type RefObject, useEffect, useState } from 'react'

export const useScrollToTop = <T extends HTMLElement>(ref: RefObject<T | null>) => {
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
