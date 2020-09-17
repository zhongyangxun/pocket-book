import React, {
  FC,
  useRef,
  useState
} from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import MonthSelect from './monthSelect'
import YearSelect from './yearSelect'
import useClickOutside from '../../hooks/useClickOutside'
import './_style.scss'

export type YearMonthSelectChangeEvent = (date: Date) => void

export interface YearMonthSelectProps {
  onChange: YearMonthSelectChangeEvent;
  value: Date;
  className?: string;
}

const YearMonthSelect: FC<YearMonthSelectProps> = (props: YearMonthSelectProps) => {
  const { onChange, value, className } = props
  const [open, setOpen] = useState(false)
  const year = value.getFullYear()
  const month = value.getMonth()
  const realMonth = month + 1
  const componentRef = useRef<HTMLDivElement>(null)

  useClickOutside(componentRef, () => {
    setOpen(false)
  })

  const classes = classNames('year-month-select', className)
  const dropdownClasses = classNames(
    'dropdown-menu',
    'px-2',
    'shadow',
    'border',
    'border-dark',
    {
      show: open
    }
  )

  const yearMonthText = `${year} 年 ${(realMonth).toString().padStart(2, '0')} 月`

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleYearSelect = (selectedYear: number) => {
    onChange(new Date(`${selectedYear}-${realMonth}`))
  }

  const handleMonthSelect = (selectedMonth: number) => {
    onChange(new Date(`${year}-${selectedMonth + 1}`))
    setOpen(false)
  }

  return (
    <div className={classes} ref={componentRef} data-testid="year-month-select">
      <button
        className="btn"
        type="button"
        onClick={handleClick}
      >
        {yearMonthText}
        <Icon icon={faAngleDown} className="ml-2" />
      </button>
      <div className={dropdownClasses}>
        <div className="row mx-0">
          <YearSelect onSelect={handleYearSelect} value={year} />
          <MonthSelect onSelect={handleMonthSelect} value={month} />
        </div>
      </div>
    </div>
  )
}

export default YearMonthSelect
