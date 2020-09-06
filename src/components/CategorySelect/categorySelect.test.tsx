/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { render } from '@testing-library/react'
import CategorySelect, { CategorySelectProps } from './categorySelect'

const testProps: CategorySelectProps = {
  placeholderText: 'category-select'
}

describe('test CategorySelector component', () => {
  it('should render correct component', () => {
    const wrapper = render(<CategorySelect {...testProps} />)
    const element = wrapper.queryByTestId('category-select')
    const placeholderElement = wrapper.queryByText('category-select')

    expect(element).toBeInTheDocument()
    expect(placeholderElement).toBeInTheDocument()
    expect(placeholderElement?.tagName).toBe('OPTION')
  })
})
