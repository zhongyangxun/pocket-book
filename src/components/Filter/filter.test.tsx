import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Filter, { FilterProps } from './filter'

const testProps: FilterProps = {
  className: 'test-class-name'
}

describe('test Filter component', () => {
  it('should render correct component', () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = render(<Filter {...testProps} />)
    const element = wrapper.queryByTestId('test-filter')
    const { container } = wrapper
    const inputMonthElement = container.querySelector('#filter-month') as HTMLInputElement
    const selectCategoryElement = container.querySelector('#filter-category') as HTMLSelectElement

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('test-class-name')
    expect(inputMonthElement).toBeInTheDocument()
    expect(inputMonthElement?.tagName).toBe('INPUT')
    fireEvent.change(inputMonthElement, {
      target: {
        value: '2020-09'
      }
    })
    expect(inputMonthElement.value).toBe('2020-09')
    expect(selectCategoryElement).toBeInTheDocument()
    expect(selectCategoryElement?.tagName).toBe('SELECT')
  })
})
