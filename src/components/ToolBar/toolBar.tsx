import React, { FC } from 'react'
import Filter from '../Filter/filter'
import BillAdder from '../BillAdder'
import Summary from '../Summary/summary'

const ToolBar: FC = () => (
  <div className="tool-bar container my-3 p-3 bg-light bg-white rounded shadow-sm d-lg-flex justify-content-between align-items-center">
    <Filter className="mb-0 mb-md-2 mb-lg-0" />
    <BillAdder className="mb-2 mb-lg-0" />
    <Summary />
  </div>
)

export default ToolBar
