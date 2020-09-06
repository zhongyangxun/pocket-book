import React, {
  FC,
  CSSProperties,
  MouseEvent,
  ReactNode,
  useEffect
} from 'react'
import classNames from 'classnames'
import Transition from '../Transition/transiton'
import Mask from './mask'

export type ModalSize = 'lg' | 'sm'

export interface ModalProps {
  visible: boolean;
  children: ReactNode;
  closable?: boolean;
  showFooter?: boolean;
  title?: string;
  cancelText?: string;
  okText?: string;
  center?: boolean;
  modalSize?: ModalSize;
  onOk?: (e: MouseEvent<HTMLButtonElement>) => void;
  onCancel?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  const {
    visible,
    children,
    closable,
    title,
    cancelText,
    okText,
    showFooter,
    modalSize,
    center,
    onOk,
    onCancel
  } = props

  useEffect(() => {
    if (visible) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [visible])

  const styles: CSSProperties = {
    display: 'block',
    pointerEvents: visible ? 'unset' : 'none'
  }

  const handleOk = (e: MouseEvent<HTMLButtonElement>) => {
    if (onOk) {
      onOk(e)
    }
  }

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    if (onCancel) {
      onCancel(e)
    }
  }

  const modalClasses = classNames('modal', {
    visible
  })

  const dialogClasses = classNames('modal-dialog', {
    [`modal-${modalSize}`]: !!modalSize,
    'modal-dialog-centered': center
  })

  const renderHeader = (modalTitle: string, modalClosable: boolean): ReactNode => {
    if (!modalTitle && !modalClosable) {
      return null
    }
    return (
      <div className="modal-header">
        <div className="modal-title">{title}</div>
        {
          modalClosable
          && (
            <button type="button" className="close" onClick={handleCancel}>
              <span>×</span>
            </button>
          )
        }
      </div>
    )
  }

  return (
    <>
      <div className={modalClasses} style={styles}>
        <Transition
          in={visible}
          timeout={300}
          animation="zoom-in-top"
        >
          <div className={dialogClasses}>
            <div className="modal-content">
              {renderHeader(title as string, closable as boolean)}
              <div className="modal-body">{children}</div>
              {
                showFooter
                  && (
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={handleCancel}>{cancelText}</button>
                      <button type="button" className="btn btn-primary" onClick={handleOk}>{okText}</button>
                    </div>
                  )
              }
            </div>
          </div>
        </Transition>
      </div>
      <Mask visible={visible} />
    </>
  )
}

Modal.defaultProps = {
  closable: true,
  showFooter: true,
  cancelText: 'Cancel',
  okText: 'OK'
}

export default Modal
