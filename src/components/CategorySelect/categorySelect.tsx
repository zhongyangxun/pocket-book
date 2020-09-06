import React, {
  FC,
  SelectHTMLAttributes,
  useEffect,
  useState
} from 'react'
import { getBillCategories } from '../../api/bill'
import { BillType } from '../BillList/Item'

export type CategorySelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  placeholderText?: string;
  billType?: BillType;
}

export interface CategoryItem {
  id: string;
  type: BillType;
  name: string;
}

const CategorySelect: FC<CategorySelectProps> = (props: CategorySelectProps) => {
  const { placeholderText, billType, ...restProps } = props
  const [cateList, setCateList] = useState<CategoryItem[]>([])

  useEffect(() => {
    getBillCategories().then((res) => {
      setCateList(res.data)
    })
  }, [])

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <select {...restProps}>
      <option value="">{placeholderText}</option>
      {
        cateList.map(({ id, name, type }) => {
          if (billType) {
            return billType === type
              ? <option value={id} key={id}>{name}</option>
              : null
          }

          return <option value={id} key={id}>{name}</option>
        })
      }
    </select>
  )
}

CategorySelect.defaultProps = {
  placeholderText: '请选择分类'
}

export default CategorySelect
