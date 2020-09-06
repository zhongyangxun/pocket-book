import React from 'react'
import { config } from 'react-transition-group'
import {
  render,
  RenderResult,
  fireEvent,
  waitFor
} from '@testing-library/react'
import BillAdder from './billAdder'

config.disabled = true

let wrapper: RenderResult
let element: HTMLElement
let buttonElement: HTMLElement

describe('test BillAdder component', () => {
  beforeEach(() => {
    wrapper = render(<BillAdder />)
    element = wrapper.getByTestId('bill-adder')
    buttonElement = wrapper.getByText('添加账单')
  })

  it('should render the correct component', () => {
    const modalElement = wrapper.container.querySelector('.modal')
    const formElement = wrapper.container.querySelector('.add-form')
    expect(element).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
    expect(modalElement).toBeInTheDocument()
    expect(formElement).not.toBeInTheDocument()
  })

  it('should show dialog and BillForm dialog after button clicked', async () => {
    fireEvent.click(buttonElement)
    const dialogElement = wrapper.container.querySelector('.modal-dialog')
    const formElement = wrapper.container.querySelector('.add-form')
    const dialogCloseElement = wrapper.container.querySelector('.modal-dialog .close') as HTMLButtonElement

    await waitFor(() => {
      expect(dialogElement).toBeInTheDocument()
      expect(dialogCloseElement).toBeInTheDocument()
      expect(formElement).toBeInTheDocument()
    })

    fireEvent.click(dialogCloseElement)

    await waitFor(() => {
      expect(dialogElement).not.toBeInTheDocument()
      expect(dialogCloseElement).not.toBeInTheDocument()
      expect(formElement).not.toBeInTheDocument()
    })
  })
})
