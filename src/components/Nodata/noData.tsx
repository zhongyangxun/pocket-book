import React, { FC } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faInbox } from '@fortawesome/free-solid-svg-icons'

export interface NodataProps {
  text?: string;
}

const NoData: FC<NodataProps> = (props: NodataProps) => {
  const { text } = props

  return (
    <div className="no-data text-center my-3">
      <div className="icon text-black-50">
        <Icon icon={faInbox} size="6x" />
      </div>
      <p className="text text-secondary">{text}</p>
    </div>
  )
}

NoData.defaultProps = {
  text: '暂无数据'
}

export default NoData
