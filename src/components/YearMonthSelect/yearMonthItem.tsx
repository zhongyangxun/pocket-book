/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react'
import classNames from 'classnames'

export interface YearMonthItemProps {
  text: string;
  value: number;
  disabled?: boolean;
  isActive?: boolean;
  onSelect: (value: number) => void;
}

const YearMonthItem: FC<YearMonthItemProps> = (props: YearMonthItemProps) => {
  const {
    onSelect,
    text,
    value,
    isActive
  } = props

  const classes = classNames('year-month-item dropdown-item', {
    active: isActive
  })

  const handleClick = (val: number) => {
    if (onSelect) {
      onSelect(val)
    }
  }

  return (
    <div
      className={classes}
      onClick={() => { handleClick(value) }}
    >
      {text}
    </div>
  )
}

export default YearMonthItem
