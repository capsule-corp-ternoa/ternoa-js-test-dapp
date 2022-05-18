import styles from './SearchBar.module.scss'

interface SearchBarProps {
  className?: string
  text?: string
  type?: React.HTMLInputTypeAttribute
  disabled?: boolean
  value?: string | number | readonly string[]
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  name?: string
  handleSearch?: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ className, text, type = 'text', onChange, value, placeholder, name, disabled, handleSearch }) => {
  const numberInputOnWheelPreventChange = (e: any) => {
    // Prevent the input value change
    e.target.blur()

    // Prevent the page/container scrolling
    e.stopPropagation()

    // Refocus immediately, on the next tick (after the current function is done)
    setTimeout(() => {
      e.target.focus()
    }, 0)
  }
  return (
    <div className={styles.root}>
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        className={`${styles.input} ${className}`}
        disabled={disabled}
        inputMode={type === 'number' ? 'numeric' : undefined}
        pattern={type === 'number' ? '[0-9]+([.,][0-9]+)?' : undefined}
        onWheel={type === 'number' ? numberInputOnWheelPreventChange : undefined}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleSearch && handleSearch
          }
        }}
      />
      <button disabled={disabled} className={styles.searchButton} onClick={handleSearch}>
        {text ? text : 'Search'}
      </button>
    </div>
  )
}

export default SearchBar
