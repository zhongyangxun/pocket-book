import React, {
  FC,
  ChangeEvent,
  useContext
} from 'react'
import classNames from 'classnames'
import CategorySelect from '../CategorySelect/categorySelect'
import YearMonthSelect from '../YearMonthSelect/yearMonthSelect'
import { formatMonth } from '../../util'
import { BillContext } from '../../context'

export interface FilterProps {
  className?: string
}

const Filter: FC<FilterProps> = (props: FilterProps) => {
  const { className } = props
  const classes = classNames('form-inline', className)

  const context = useContext(BillContext)
  const {
    loading,
    month,
    category,
    changeMonth,
    changeCategory,
    getBillList
  } = context

  const handleDateChange = (date: Date) => {
    if (changeMonth) {
      changeMonth(formatMonth(date))
    }

    if (getBillList) {
      const time = date.getTime()
      getBillList({
        time,
        category
      })
    }
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    if (changeCategory) {
      changeCategory(value)
    }

    if (getBillList) {
      getBillList({
        time: month ? new Date(month).getTime() : undefined,
        category: value
      })
    }
  }

  return (
    <div className={classes} data-testid="test-filter">
      <div className="form-row align-items-left">
        <div className="form-group mx-2">
          <label htmlFor="filter-month">月份</label>
          <YearMonthSelect
            className="form-control mx-sm-3 p-0"
            onChange={handleDateChange}
            value={month ? new Date(month) : new Date()}
          />
        </div>
        <div className="form-group mx-2">
          <label htmlFor="filter-category">分类</label>
          <CategorySelect
            className="form-control mx-sm-3"
            placeholderText="全部"
            value={category}
            onChange={handleCategoryChange}
            disabled={loading}
            id="filter-category"
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
