import React, { FC } from 'react'
import YearMonthItem from './yearMonthItem'

export interface YearSelectProps {
  onSelect: (value: number) => void;
  value: number;
}

const YearSelect: FC<YearSelectProps> = (props: YearSelectProps) => {
  const { onSelect, value } = props

  const nowYear = new Date().getFullYear()
  const years = new Array(10).fill(0).map((item, index) => {
    const year = nowYear - index
    return {
      value: year,
      text: `${year} 年`
    }
  })

  const handleYearSelect = (selectedYear: number) => {
    if (onSelect) {
      onSelect(selectedYear)
    }
  }

  return (
    <div className="year-select border-right pr-2">
      {
        years.map(({ value: itemValue, text }) => (
          <YearMonthItem
            key={itemValue}
            value={itemValue}
            text={text}
            isActive={value === itemValue}
            onSelect={handleYearSelect}
          />
        ))
      }
    </div>
  )
}

export default YearSelect
