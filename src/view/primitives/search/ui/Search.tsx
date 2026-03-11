import { useState } from "react"
import clsx from "clsx"
import { ActionButton } from "@/view/primitives/action-button"
import SearchIcon from "../images/search.svg?react"
import CrossIcon from "../images/cross.svg?react"
import styles from "./Search.module.scss"

interface SearchProps {
  onSearchValueChange: (value: string) => void
  onCurrentPageChange: (page: number) => void
}

export const Search = ({
  onSearchValueChange,
  onCurrentPageChange,
}: SearchProps) => {
  const [inputValue, setInputValue] = useState("")

  return (
    <div className={styles["search"]}>
      <div className={styles["search__input-wrapper"]}>
        <SearchIcon className={styles["search__img"]} />
        <input
          className={styles["search__input"]}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onSearchValueChange(inputValue)}
          placeholder="Search"
          type="text"
        />
        {inputValue && (
          <CrossIcon
            className={clsx(
              styles["search__img"],
              styles["search__img--cross"],
            )}
            onClick={() => {
              setInputValue("")
              onSearchValueChange("")
            }}
          />
        )}
      </div>
      <ActionButton
        onClick={() => {
          onSearchValueChange(inputValue)
          onCurrentPageChange(1)
        }}
      >
        Search
      </ActionButton>
    </div>
  )
}
