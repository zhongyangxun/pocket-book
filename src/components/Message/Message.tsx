import React, { FC, ReactElement } from 'react'
import { FontAwesomeIcon as Icon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import {
  IconDefinition,
  faInfoCircle,
  faCheckCircle,
  faTimesCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'

export type MessageType = 'info' | 'success' | 'danger' | 'warning'

export interface MessageProps {
  text: string;
  type: MessageType
}

const Message: FC<MessageProps> = (props: MessageProps) => {
  const { text, type } = props

  const renderIcon = (messageType: MessageType): ReactElement<FontAwesomeIconProps> => {
    let messageIcon: IconDefinition

    switch (messageType) {
      case 'success':
        messageIcon = faCheckCircle
        break
      case 'danger':
        messageIcon = faTimesCircle
        break
      case 'warning':
        messageIcon = faExclamationCircle
        break
      case 'info':
      default:
        messageIcon = faInfoCircle
        break
    }

    return <Icon icon={messageIcon} className={`text-${messageType}`} />
  }

  return (
    <div className="message my-2 text-center">
      <div className="message-content d-inline-flex bg-white px-4 py-2 shadow">
        <div className="icon mr-2">
          {renderIcon(type)}
        </div>
        <div className="text">
          {text}
        </div>
      </div>
    </div>
  )
}

export default Message
