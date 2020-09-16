import React from 'react'
import { render } from '@testing-library/react'
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
    const selectCategoryElement = container.querySelector('#filter-category') as HTMLSelectElement

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('test-class-name')
    expect(selectCategoryElement).toBeInTheDocument()
    expect(selectCategoryElement?.tagName).toBe('SELECT')
  })
})
