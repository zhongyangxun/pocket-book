import React, {
  FC,
  ChangeEvent,
  useContext
} from 'react'
import classNames from 'classnames'
import DatePicker from 'react-datepicker'
import CategorySelect from '../CategorySelect/categorySelect'
import { formatMonth } from '../../util'
import { BillContext } from '../../context'
import { BillParams } from '../../api/bill'

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

  const handleFormChange = () => {
    if (getBillList) {
      const parmas: BillParams = {
        time: month ? new Date(month).getTime() : undefined,
        category
      }

      getBillList(parmas)
    }
  }

  const handleDateChange = (date: Date) => {
    if (changeMonth) {
      changeMonth(formatMonth(date))
      handleFormChange()
    }
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    if (changeCategory) {
      changeCategory(value)
      handleFormChange()
    }
  }

  return (
    <div className={classes} data-testid="test-filter">
      <div className="form-row align-items-left">
        <div className="form-group mx-2">
          <label htmlFor="filter-month">月份</label>
          <DatePicker
            onChange={handleDateChange}
            className="form-control mx-sm-3"
            value={month}
            showMonthYearPicker
            maxDate={new Date()}
            id="filter-month"
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
