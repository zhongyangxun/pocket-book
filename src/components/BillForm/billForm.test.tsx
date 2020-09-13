import React from 'react'
import {
  render,
  fireEvent,
  RenderResult
} from '@testing-library/react'
import BillForm from './billForm'
import { formatDate } from '../../util'

let wrapper: RenderResult
let container: HTMLElement
let formElement: HTMLFormElement
let categorySelectElement: HTMLSelectElement
let dateInputElement: HTMLInputElement
let amountInputElement: HTMLInputElement
let submitBtnElement: HTMLButtonElement

describe('test BillForm component', () => {
  beforeEach(() => {
    wrapper = render(<BillForm />)
    container = wrapper.container
    formElement = wrapper.queryByTestId('test-bill-form') as HTMLFormElement
    categorySelectElement = container.querySelector('#add-category') as HTMLSelectElement
    dateInputElement = container.querySelector('#date') as HTMLInputElement
    amountInputElement = container.querySelector('#amount') as HTMLInputElement
    submitBtnElement = container.querySelector('[type=submit]') as HTMLButtonElement
  })

  it('should render correct component', () => {
    expect(formElement).toBeInTheDocument()
    expect(formElement).toHaveClass('bill-form')
    expect(categorySelectElement).toBeInTheDocument()
    expect(categorySelectElement.tagName).toBe('SELECT')
    expect(dateInputElement).toBeInTheDocument()
    expect(dateInputElement.tagName).toBe('INPUT')
    expect(amountInputElement).toBeInTheDocument()
    expect(amountInputElement.tagName).toBe('INPUT')
    expect(amountInputElement.type).toBe('text')
    expect(submitBtnElement).toBeInTheDocument()
    expect(submitBtnElement.tagName).toBe('BUTTON')
  })

  it('should show error messages when form submitted with empty form controls', () => {
    expect(dateInputElement.value).toBe(formatDate(new Date()))
    expect(categorySelectElement.value).toBe('')
    expect(amountInputElement.value).toBe('')
    fireEvent.submit(formElement)

    const emptyErrElementList = wrapper.queryAllByText('该项不能为空')
    expect(emptyErrElementList.length).toBe(2)
    emptyErrElementList.forEach((el) => {
      expect(el).toHaveClass('invalid-feedback')
    })
  })

  it('should validate the amount field when amountInputElement changes', () => {
    fireEvent.change(amountInputElement, {
      target: {
        value: 'aa'
      }
    })

    const amountErrElement = wrapper.queryByText('请输入数字（可精确到小数点后两位）')

    expect(amountErrElement).toBeInTheDocument()
    expect(amountErrElement).toHaveClass('invalid-feedback')

    fireEvent.change(amountInputElement, {
      target: {
        value: '100'
      }
    })
    expect(wrapper.queryByText('请输入数字（可精确到小数点后两位）')).not.toBeInTheDocument()
  })

  it('should change value of form controls fater form controls changed', async () => {
    fireEvent.change(dateInputElement, {
      target: {
        value: '2020-09-01'
      }
    })
    expect(dateInputElement.value).toBe('2020-09-01')

    fireEvent.change(categorySelectElement, {
      target: {
        value: ''
      }
    })
    expect(categorySelectElement.value).toBe('')

    fireEvent.change(amountInputElement, {
      target: {
        value: '100'
      }
    })
    expect(amountInputElement.value).toBe('100')
    expect(wrapper.queryByText('请输入数字（可精确到小数点后两位）')).not.toBeInTheDocument()

    fireEvent.submit(formElement)
    expect(wrapper.queryAllByText('该项不能为空').length).toBe(1)
  })
})
