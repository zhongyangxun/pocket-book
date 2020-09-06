import React, { FC, useState } from 'react'
import Header from './components/Header/header'
import List, { BillDataItem } from './components/BillList/list'
import { BillType } from './components/BillList/Item'
import ToolBar from './components/ToolBar/toolBar'
import { getBillList, BillParams } from './api/bill'
import { formatDate } from './util'
import { BillContext, IBillContext, BillSummary } from './context'

const App: FC = () => {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<BillDataItem[]>([])
  const [category, setCategory] = useState('')
  const nowMonth = formatDate(new Date(), { hasDay: false })
  const [month, setMonth] = useState(nowMonth)
  const [summary, setSummary] = useState <BillSummary>({
    [BillType.Income]: 0,
    [BillType.Expenditure]: 0
  })

  const requestBillList = (params: BillParams = {}) => {
    setLoading(true)
    getBillList(params).then((res) => {
      setLoading(false)
      const { list: billList, typeSummary } = res.data
      setList(billList)
      setSummary(typeSummary)
    })
  }

  const passedContext: IBillContext = {
    loading,
    summary,
    category,
    changeCategory: setCategory,
    month,
    changeMonth: setMonth,
    getBillList: requestBillList
  }

  return (
    <div className="App bg-light">
      <Header />
      <BillContext.Provider value={passedContext}>
        <ToolBar />
        <List list={list} loading={loading} />
      </BillContext.Provider>
    </div>
  )
}

export default App
