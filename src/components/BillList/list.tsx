import React, { FC } from 'react'
import BillItem, { BillType } from './Item'
import Loading from '../Loading/loading'
import NoData from '../Nodata/noData'
import { formatDate } from '../../util'
import './_style.scss'

export interface BillDataItem {
  id: string;
  type: BillType;
  time: number | string;
  category: string;
  categoryName: string;
  amount: number | string;
}

export interface BillListProps {
  list: BillDataItem[];
  loading?: boolean;
}

const List: FC<BillListProps> = (props: BillListProps) => {
  const { list, loading } = props

  return (
    <ul className="bill-list container list-group list-group-flush my-3 p-3 bg-white rounded shadow-sm">
      {loading && <Loading />}
      {!loading && list.length === 0 && (
        <NoData />
      )}
      {
        list.map((item) => (
          <BillItem
            key={item.id}
            amount={parseFloat(item.amount as string)}
            type={item.type}
            category={item.categoryName}
            time={formatDate(new Date(item.time))}
          />
        ))
      }
    </ul>
  )
}

export default List
