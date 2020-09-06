import React, {
  FC,
  useState,
  ChangeEvent,
  FocusEvent,
  FormEvent
} from 'react'
import classNames from 'classnames'
import { AxiosResponse } from 'axios'
import CategorySelect from '../CategorySelect/categorySelect'
import { formatDate } from '../../util'
import { addBillItem } from '../../api/bill'

export type BillFieldElement = HTMLInputElement | HTMLSelectElement

export type BillFieldName = 'category' | 'amount' | 'date'

export type BillFormFields = {
  [key in BillFieldName]: string
}

export type BillFormError = BillFormFields

export interface BillFormProps {
  onFinish?: (form: BillFormFields, res: AxiosResponse) => void;
}

const BillForm: FC<BillFormProps> = (props: BillFormProps) => {
  const { onFinish } = props
  const [form, setForm] = useState<BillFormFields>({
    category: '',
    amount: '',
    date: ''
  })

  const [formErr, setFormErr] = useState<BillFormError>({
    category: '',
    amount: '',
    date: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<BillFieldElement>) => {
    const { value, name } = e.currentTarget
    setForm({
      ...form,
      [name]: value
    })

    setFormErr({
      ...formErr,
      [name]: ''
    })

    if (name === 'amount') {
      const amountReg = /(^(-[1-9]|[1-9])\d*(\.?\d{1,2})?$)|(^(0|-0)\.(\d[1-9]|[1-9]))$/

      if (!amountReg.test(value)) {
        setFormErr({
          ...formErr,
          [name]: '请输入数字（可精确到小数点后两位）'
        })
      }
    }
  }

  const handleFocus = (e: FocusEvent<BillFieldElement>) => {
    const { name, value } = e.currentTarget
    const fieldName = name as BillFieldName

    if (formErr[fieldName] && !value) {
      setFormErr({
        ...formErr,
        [name]: ''
      })
    }
  }

  const validateEmpty = (): boolean => {
    let passValidate = true

    Object.entries(form).forEach(([key, value]) => {
      if (value === '') {
        passValidate = false
        setFormErr((prevFormErr) => ({
          ...prevFormErr,
          [key]: '该项不能为空'
        }))
      }
    })

    return passValidate
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateEmpty()) {
      const { category, date, amount } = form
      const time = new Date(date).getTime()
      setLoading(true)
      addBillItem({
        category,
        time,
        amount: parseFloat(amount)
      }).then((res) => {
        setLoading(false)

        if (onFinish) {
          onFinish(form, res as AxiosResponse)
        }
      })
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="add-category">分类</label>
        <CategorySelect
          id="add-category"
          className={classNames('custom-select', {
            'is-invalid': !!formErr.category
          })}
          name="category"
          value={form.category}
          onChange={handleChange}
          onFocus={handleFocus}
          disabled={loading}
        />
        <div className="invalid-feedback">
          {formErr.category}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="date">
          日期
        </label>
        <input
          className={classNames('form-control', {
            'is-invalid': !!formErr.date
          })}
          type="date"
          id="date"
          name="date"
          max={formatDate(new Date())}
          required
          value={form.date}
          onChange={handleChange}
          onFocus={handleFocus}
          disabled={loading}
        />
        <div className="invalid-feedback">
          {formErr.date}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="amount">金额</label>
        <input
          className={classNames('form-control', {
            'is-invalid': !!formErr.amount
          })}
          type="text"
          id="amount"
          name="amount"
          required
          value={form.amount}
          onChange={handleChange}
          onFocus={handleFocus}
          disabled={loading}
        />
        <div className="invalid-feedback">
          {formErr.amount}
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {
        loading
          ? (
            <>
              <span className="spinner-border spinner-border-sm mr-2" />
              正在提交...
            </>
          )
          : '提交'
        }
      </button>
    </form>
  )
}

export default BillForm
