import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react'
import { config } from 'react-transition-group'
import Modal, { ModalProps } from './modal'

config.disabled = true

const testProps: ModalProps = {
  visible: true,
  children: 'modal content',
  okText: 'ok',
  cancelText: 'cancel',
  onOk: jest.fn(),
  onCancel: jest.fn()
}

const invisibleProps: ModalProps = {
  visible: false,
  children: 'modal content'
}

let wrapper: RenderResult
let modalElement: HTMLElement
let container: HTMLElement

describe('test Modal component', () => {
  beforeEach(() => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    wrapper = render(<Modal {...testProps} />)
    modalElement = wrapper.queryByTestId('test-modal') as HTMLElement
    container = wrapper.container
  })

  it('should render correct component', () => {
    expect(modalElement).toBeInTheDocument()
    expect(modalElement).toHaveClass('modal')
    expect(modalElement).toHaveClass('visible')
    expect(wrapper.queryByText('modal content')).toBeInTheDocument()
    expect(container.querySelector('.modal-header')).toBeInTheDocument()
    expect(container.querySelector('.modal-content')).toBeInTheDocument()
    expect(container.querySelector('.modal-footer')).toBeInTheDocument()
    expect(container.querySelector('.close')).toBeInTheDocument()
    expect(wrapper.queryByText('ok')).toBeInTheDocument()
    expect(wrapper.queryByText('cancel')).toBeInTheDocument()
    expect(document.querySelectorAll('.modal-backdrop').length).toBe(1)
    expect(document.body).toHaveClass('modal-open')
  })

  it('should trigger corresponding callback after OK btn, cancel btn and close btn to be clicked', async () => {
    const closeBtnElement = container.querySelector('.close') as HTMLButtonElement
    const okBtnElement = wrapper.queryByText('ok') as HTMLButtonElement
    const cancelBtnElement = wrapper.queryByText('cancel') as HTMLButtonElement

    fireEvent.click(okBtnElement)
    expect(testProps.onOk).toBeCalled()
    fireEvent.click(closeBtnElement)
    expect(testProps.onCancel).toBeCalled()
    fireEvent.click(cancelBtnElement)
    expect(testProps.onCancel).toBeCalled()
  })

  it('should not render modal dialog and modal mask while visible prop is false', () => {
    cleanup()
    // eslint-disable-next-line react/jsx-props-no-spreading
    wrapper = render(<Modal {...invisibleProps} />)
    modalElement = wrapper.queryByTestId('test-modal') as HTMLElement
    container = wrapper.container

    expect(modalElement).toBeInTheDocument()
    expect(modalElement).toHaveClass('modal')
    expect(modalElement).not.toHaveClass('visible')
    expect(wrapper.queryByText('modal content')).not.toBeInTheDocument()
    expect(container.querySelector('.modal-header')).not.toBeInTheDocument()
    expect(container.querySelector('.modal-content')).not.toBeInTheDocument()
    expect(container.querySelector('.modal-footer')).not.toBeInTheDocument()
    expect(container.querySelector('.close')).not.toBeInTheDocument()
    expect(wrapper.queryByText('ok')).not.toBeInTheDocument()
    expect(wrapper.queryByText('cancel')).not.toBeInTheDocument()
    expect(document.querySelectorAll('.modal-backdrop').length).toBe(0)
    expect(document.body).not.toHaveClass('modal-open')
  })
})
