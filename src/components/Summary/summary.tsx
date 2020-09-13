/* eslint-disable react/jsx-one-expression-per-line */
import React, { FC, useContext } from 'react'
import { BillContext, BillSummary } from '../../context'
import { BillType } from '../BillList/Item'

export interface SummaryProps {
  income: string | number;
  expenditure: string | number;
}

const { Income, Expenditure } = BillType

const Summary: FC = () => {
  const context = useContext(BillContext)
  const { summary } = context
  const { [Income]: income, [Expenditure]: expenditure } = summary as BillSummary
  const incomeAmount = income.toFixed(2)
  const expenditureAmount = expenditure.toFixed(2)

  const sum = income - expenditure
  const sumSign = sum > 0 ? '+' : ''
  const sumStr = `${sumSign}${sum.toFixed(2)}`

  return (
    <div className="summary d-block d-md-flex" data-testid="test-summary">
      <div className="income mx-2">
        <span className="font-weight-bold">收入：</span>
        <span className="income-amount">{incomeAmount}</span>
      </div>
      <div className="expenditure mx-2">
        <span className="font-weight-bold">支出：</span>
        <span className="expenditure-amount">{expenditureAmount}</span>
      </div>
      <div className="sum mx-2">
        <span className="font-weight-bold">总计：</span>
        <span className="sum-amount">{sumStr}</span>
      </div>
    </div>
  )
}

export default Summary
