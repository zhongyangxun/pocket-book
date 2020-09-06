import React from 'react'
import { render } from '@testing-library/react'
import BillForm from './billForm'

describe('test BillForm component', () => {
  it('should render correct component', () => {
    const wrapper = render(<BillForm />)
    const { container } = wrapper
    const element = container.querySelector('.add-form')
    const categorySelectElement = container.querySelector('#add-category')
    const dateInputElement = container.querySelector('#date')
    const amountInputElement = container.querySelector('#amount')
    const submitBtnElement = container.querySelector('[type=submit]')

    expect(element).toBeInTheDocument()
    expect(categorySelectElement).toBeInTheDocument()
    expect(dateInputElement).toBeInTheDocument()
    expect(amountInputElement).toBeInTheDocument()
    expect(submitBtnElement).toBeInTheDocument()
  })
})
