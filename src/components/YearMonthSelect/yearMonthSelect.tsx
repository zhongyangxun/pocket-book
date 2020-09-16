import React, { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import MonthSelect from './monthSelect'
import YearSelect from './yearSelect'
import './_style.scss'

export interface YearMonthSelectProps {
  onChange: (date: Date) => void;
  defaultValue?: Date;
  className?: string;
}

const YearMonthSelect: FC<YearMonthSelectProps> = (props: YearMonthSelectProps) => {
  const { onChange, defaultValue, className } = props
  const [open, setOpen] = useState(false)
  const date = defaultValue || new Date()
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth())

  const classes = classNames('year-month-select', className)

  useEffect(() => {
    if (onChange) {
      onChange(new Date(`${year}-${month + 1}`))
    }
  }, [year, month])

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
    <div className={classes}>
      <button
        className="btn"
        type="button"
        onClick={handleClick}
      >
        {year}
        年
        {`${month + 1}`.padStart(2, '0')}
        月
        <Icon icon={faAngleDown} className="ml-2" />
      </button>
      <div className="dropdown-menu px-2" style={{ display: open ? 'block' : 'none' }}>
        <div className="row mx-0">
          <YearSelect onSelect={handleYearSelect} value={year} />
          <MonthSelect onSelect={handleMonthSelect} value={month} />
        </div>
      </div>
    </div>
  )
}

export default YearMonthSelect
