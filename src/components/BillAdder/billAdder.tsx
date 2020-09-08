import React, { FC, useState, useContext } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from '../Modal/modal'
import BillForm, { BillFormFields } from './billForm'
import message from '../Message'
import { BillContext } from '../../context'
import { formatMonth } from '../../util'

interface BillAdderProps {
  className?: string;
}

const BillAdder: FC<BillAdderProps> = (props: BillAdderProps) => {
  const { className } = props
  const [showModal, setShowModal] = useState(false)
  const context = useContext(BillContext)
  const { loading } = context

  const classes = classNames('bill-adder', className)

  const onAddBtnClick = () => {
    setShowModal((prevShowModal) => !prevShowModal)
  }

  const handleModalCancel = () => {
    setShowModal(false)
  }

  const handleFormSuccess = (form: BillFormFields) => {
    setShowModal(false)
    message.success('添加成功！')
    const { date } = form
    const { changeMonth, getBillList } = context
    const month = formatMonth(new Date(date))
    if (changeMonth) {
      changeMonth(month)
    }
    if (getBillList) {
      const time = new Date(month).getTime()
      getBillList({ time })
    }
  }

  const handleFormFail = () => {
    setShowModal(false)
    message.error('添加失败，请稍后重试。')
  }

  return (
    <div className={classes} data-testid="bill-adder">
      <button
        className="btn btn-dark"
        type="button"
        onClick={onAddBtnClick}
        disabled={loading}
      >
        <Icon icon={faPlus} className="mr-1" />
        添加账单
      </button>
      <Modal
        visible={showModal}
        onCancel={handleModalCancel}
        showFooter={false}
        okText="确定"
        cancelText="取消"
        title="添加账单"
      >
        <BillForm
          onFinish={handleFormSuccess}
          onFail={handleFormFail}
        />
      </Modal>
    </div>
  )
}

export default BillAdder
