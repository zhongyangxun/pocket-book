import React from 'react'
import { render } from '@testing-library/react'
import { BillContext, IBillContext } from '../../context'
import { BillType } from '../BillList/Item'
import Summary from './summary'

const { Income, Expenditure } = BillType

const incomeAmount = 30000
const expenditureAmount = 5000

const testContext: IBillContext = {
  summary: {
    [Income]: incomeAmount,
    [Expenditure]: expenditureAmount
  }
}

const sum = incomeAmount - expenditureAmount
const sumSign = sum > 0 ? '+' : ''
const sumStr = `${sumSign}${sum.toFixed(2)}`

describe('test Summary component', () => {
  it('should render the correct component with context', () => {
    const wrapper = render(
      <BillContext.Provider value={testContext}>
        <Summary />
      </BillContext.Provider>
    )

    const summaryElement = wrapper.queryByTestId('test-summary')
    expect(summaryElement).toBeInTheDocument()
    expect(wrapper.queryByText((incomeAmount).toFixed(2))).toBeInTheDocument()
    expect(wrapper.queryByText((expenditureAmount).toFixed(2))).toBeInTheDocument()
    expect(wrapper.queryByText(sumStr)).toBeInTheDocument()
  })
})
