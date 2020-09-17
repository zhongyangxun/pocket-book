import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import YearMonthSelect, { YearMonthSelectProps } from './yearMonthSelect'

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()
const yearMonthText = `${year} 年 ${(month + 1).toString().padStart(2, '0')} 月`

const testProps: YearMonthSelectProps = {
  onChange: jest.fn(),
  value: date,
  className: 'test-class'
}

const createStyleFile = () => {
  const cssFile: string = `
    .dropdown-menu {
      display: none;
    }
    .dropdown-menu.show {
      display: block;
    }
  `

  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult
let container: HTMLElement
let yearMonthSelectElement: HTMLElement
let buttonElement: HTMLButtonElement
let dropDownMenuElement: HTMLElement

describe('test YearMonthSelect component', () => {
  beforeEach(() => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    wrapper = render(<YearMonthSelect {...testProps} />)
    container = wrapper.container
    container.append(createStyleFile())
    yearMonthSelectElement = wrapper.queryByTestId('year-month-select') as HTMLElement
    buttonElement = wrapper.queryByText(yearMonthText) as HTMLButtonElement
    dropDownMenuElement = container.querySelector('.dropdown-menu') as HTMLElement
  })

  it('should render the correct component', () => {
    expect(yearMonthSelectElement).toBeInTheDocument()
    expect(yearMonthSelectElement).toHaveClass('test-class')
    expect(buttonElement).toBeInTheDocument()
    expect(dropDownMenuElement).toBeInTheDocument()
    expect(dropDownMenuElement).not.toBeVisible()
    expect(container.querySelectorAll('.month-select .dropdown-item').length).toBe(12)
    expect(container.querySelectorAll('.year-select .dropdown-item').length).toBe(10)
  })

  it('should toggle the dropdown menu after button clicked', () => {
    expect(dropDownMenuElement).not.toHaveClass('show')
    expect(dropDownMenuElement).not.toBeVisible()
    fireEvent.click(buttonElement)
    expect(dropDownMenuElement).toHaveClass('show')
    expect(dropDownMenuElement).toBeVisible()
    fireEvent.click(buttonElement)
    expect(dropDownMenuElement).not.toHaveClass('show')
    expect(dropDownMenuElement).not.toBeVisible()
  })

  it('should close the dropdown menu when other areas of the page are clicked', () => {
    fireEvent.click(buttonElement)
    expect(dropDownMenuElement).toHaveClass('show')
    expect(dropDownMenuElement).toBeVisible()
    fireEvent.click(document.body)
    expect(dropDownMenuElement).not.toHaveClass('show')
    expect(dropDownMenuElement).not.toBeVisible()
  })

  it('should trigger onChange after year or month selected', () => {
    const selectMonth = 3
    const monthItem = wrapper.queryByText(`${selectMonth} 月`) as HTMLElement
    expect(monthItem).toBeInTheDocument()
    fireEvent.click(monthItem)
    expect(testProps.onChange).toBeCalledWith(new Date(`${year}-${selectMonth}`))

    const selectYear = year - 1
    const yearItem = wrapper.queryByText(`${selectYear} 年`) as HTMLElement
    fireEvent.click(yearItem)
    expect(testProps.onChange).toBeCalledWith(new Date(`${selectYear}-${selectMonth}`))
  })
})
