import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

describe('test App component', () => {
  it('should render correct component', () => {
    const wrapper = render(<App />)
    const { container } = wrapper
    const appElement = wrapper.queryByTestId('test-app')

    expect(appElement).toBeInTheDocument()
    expect(appElement).toHaveClass('App')
    expect(container.querySelector('.header')).toBeInTheDocument()
    expect(container.querySelector('.tool-bar')).toBeInTheDocument()
    expect(container.querySelector('.bill-list')).toBeInTheDocument()
  })
})
