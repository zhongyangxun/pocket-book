import React, { FC, useState } from 'react'
import YearMonthItem from './yearMonthItem'

export interface MonthSelectProps {
  onSelect: (value: number) => void;
  value: number;
}

const MonthSelect: FC<MonthSelectProps> = (props: MonthSelectProps) => {
  const { onSelect, value } = props
  const months = new Array(12).fill(0).map((item, index) => ({
    text: `${index + 1} 月`,
    value: index
  }))

  const [activeMonth, setActiveMonth] = useState(value)

  const handleMonthSelect = (selectedMonth: number) => {
    setActiveMonth(selectedMonth)
    if (onSelect) {
      onSelect(selectedMonth)
    }
  }

  return (
    <div className="month-select ml-2">
      {
        months.map(({ text, value: itemValue }) => (
          <YearMonthItem
            key={itemValue}
            text={text}
            value={itemValue}
            isActive={activeMonth === itemValue}
            onSelect={handleMonthSelect}
          />
        ))
      }
    </div>
  )
}

export default MonthSelect
