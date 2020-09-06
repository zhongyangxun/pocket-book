import React, { FC } from 'react'

export enum BillType {
  Income = '1',
  Expenditure = '0'
}

export interface BillItemProps {
  type: BillType;
  time: number | string;
  category: string;
  amount: number;
}

const BillItem: FC<BillItemProps> = (props: BillItemProps) => {
  const {
    type,
    time,
    category,
    amount
  } = props

  let sign = type === BillType.Income ? '+' : '-'
  if (amount < 0) {
    sign = ''
  }

  return (
    <li className="bill-item list-group-item">
      <div className="category">
        {category}
      </div>
      <div className="time">{time}</div>
      <div className="amount">{`${sign}${amount.toFixed(2)}`}</div>
    </li>
  )
}

export default BillItem
