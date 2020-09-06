/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { render } from '@testing-library/react'
import BillList, { BillListProps, BillDataItem } from './BillLlist'
import { BillType } from './Item'

const testList: BillDataItem[] = [
  {
    id: '78',
    category: 's73ijpispio',
    categoryName: '工资',
    amount: 30000,
    time: 1598572800000,
    type: '1' as BillType
  },
  {
    amount: 300,
    category: '3tqndrjqgrg',
    categoryName: '日常饮食',
    id: '76',
    time: 1598400000000,
    type: '0' as BillType
  }
]

const testListProps: BillListProps = {
  list: testList
}

const emptyListProps: BillListProps = {
  list: []
}

const loadingProps: BillListProps = {
  loading: true,
  list: testList
}

const loadingEmptyProps: BillListProps = {
  loading: true,
  list: []
}

describe('test BillList component', () => {
  it('should render correct list with list data', () => {
    const wrapper = render(<BillList {...testListProps} />)
    const { container } = wrapper
    const listElement = wrapper.queryByTestId('bill-list')

    expect(listElement).toBeInTheDocument()
    expect(wrapper.queryByText('工资')).toBeInTheDocument()
    expect(container.querySelectorAll('.bill-item').length).toBe(2)
    expect(container.querySelector('.loading')).not.toBeInTheDocument()
    expect(container.querySelector('.no-data')).not.toBeInTheDocument()
  })

  it('should show NoData component when the list is empty', () => {
    const wrapper = render(<BillList {...emptyListProps} />)
    const { container } = wrapper
    const listElement = wrapper.queryByTestId('bill-list')

    expect(listElement).toBeInTheDocument()
    expect(wrapper.queryByText('工资')).not.toBeInTheDocument()
    expect(container.querySelector('.bill-item')).not.toBeInTheDocument()
    expect(container.querySelector('.loading')).not.toBeInTheDocument()
    expect(container.querySelector('.no-data')).toBeInTheDocument()
  })

  it('should only show Loading  Component when the loading prop is true with list data', () => {
    const wrapper = render(<BillList {...loadingProps} />)
    const { container } = wrapper
    const listElement = wrapper.queryByTestId('bill-list')

    expect(listElement).toBeInTheDocument()
    expect(wrapper.queryByText('工资')).not.toBeInTheDocument()
    expect(container.querySelector('.bill-item')).not.toBeInTheDocument()
    expect(container.querySelector('.loading')).toBeInTheDocument()
    expect(container.querySelector('.no-data')).not.toBeInTheDocument()
  })

  it('should only show Loading component when loading prop is true with empty list', () => {
    const wrapper = render(<BillList {...loadingEmptyProps} />)
    const { container } = wrapper
    const listElement = wrapper.queryByTestId('bill-list')

    expect(listElement).toBeInTheDocument()
    expect(wrapper.queryByText('工资')).not.toBeInTheDocument()
    expect(container.querySelector('.bill-item')).not.toBeInTheDocument()
    expect(container.querySelector('.loading')).toBeInTheDocument()
    expect(container.querySelector('.no-data')).not.toBeInTheDocument()
  })
})
