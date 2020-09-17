import React, {
  FC,
  useEffect,
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

export interface YearMonthSelectProps {
  onChange: (date: Date) => void;
  value?: Date;
  className?: string;
}

const YearMonthSelect: FC<YearMonthSelectProps> = (props: YearMonthSelectProps) => {
  const { onChange, value, className } = props
  const [open, setOpen] = useState(false)
  const date = value || new Date()
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth())
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

  const yearMonthText = `${year} 年 ${(month + 1).toString().padStart(2, '0')} 月`

  useEffect(() => {
    if (onChange) {
      onChange(new Date(`${year}-${month + 1}`))
    }
  }, [year, month])

  useEffect(() => {
    const newValueYear = value?.getFullYear() as number
    const newValueMonth = value?.getMonth() as number
    if (newValueMonth !== month) {
      setMonth(newValueMonth)
    }
    if (newValueYear !== year) {
      setYear(newValueYear)
    }
  }, [value])

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleYearSelect = (selectedYear: number) => {
    setYear(selectedYear)
  }

  const handleMonthSelect = (selectedMonth: number) => {
    setMonth(selectedMonth)
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
