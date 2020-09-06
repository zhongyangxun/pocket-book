import React, {
  FC,
  ChangeEvent,
  useContext,
  useEffect
} from 'react'
import classNames from 'classnames'
import CategorySelect from '../CategorySelect/categorySelect'
import { formatDate } from '../../util'
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
    changeCategory
  } = context

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (changeMonth) {
      changeMonth(value)
    }
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    if (changeCategory) {
      changeCategory(value)
    }
  }

  useEffect(() => {
    const { getBillList } = context
    if (getBillList) {
      const parmas: BillParams = {
        time: month ? new Date(month).getTime() : undefined,
        category
      }

      getBillList(parmas)
    }
  }, [month, category])

  return (
    <div className={classes}>
      <div className="form-row align-items-left">
        <div className="form-group mx-2">
          <label>月份</label>
          <input
            className="form-control mx-sm-3"
            onChange={handleDateChange}
            type="month"
            name="month"
            value={month}
            max={formatDate(new Date(), { hasDay: false })}
            disabled={loading}
          />
        </div>
        <div className="form-group mx-2">
          <label>分类</label>
          <CategorySelect
            className="form-control mx-sm-3"
            placeholderText="全部"
            value={category}
            onChange={handleCategoryChange}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
