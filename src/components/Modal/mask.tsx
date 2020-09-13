import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import Transition from '../Transition/transiton'

export interface MaskProps {
  visible: boolean;
}

const Mask: FC<MaskProps> = (props: MaskProps) => {
  const {
    visible
  } = props

  return ReactDOM.createPortal(
    (
      <Transition
        in={visible}
        timeout={300}
        animation="fade-in"
      >
        <div className="modal-backdrop show" />
      </Transition>
    ),
    document.body
  )
}

export default Mask
