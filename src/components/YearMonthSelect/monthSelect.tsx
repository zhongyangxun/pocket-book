import React, { FC } from 'react'
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

  const handleMonthSelect = (selectedMonth: number) => {
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
            isActive={value === itemValue}
            onSelect={handleMonthSelect}
          />
        ))
      }
    </div>
  )
}

export default MonthSelect
