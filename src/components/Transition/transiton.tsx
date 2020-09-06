import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right' | 'fade-in' | 'slide-in-top'

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  wrapper?: boolean,
}

const Transition: React.FC<TransitionProps> = (props: TransitionProps) => {
  const {
    children,
    className,
    animation,
    wrapper,
    ...restProps
  } = props
  const nodeRef = React.useRef(null)

  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames={className || animation}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      <div ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>
  )
}
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition
