import React from 'react'
import { render } from '@testing-library/react'
import Message, { MessageProps } from './message'

const testProps: MessageProps = {
  text: 'test',
  type: 'info'
}

describe('test Message component', () => {
  it('should render correct component', () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = render(<Message {...testProps} />)
    const element = wrapper.queryByTestId('test-message')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('message')
    expect(wrapper.container.querySelector('.text-info')).toBeInTheDocument()
    expect(wrapper.queryByText('test')).toBeInTheDocument()
  })
})
