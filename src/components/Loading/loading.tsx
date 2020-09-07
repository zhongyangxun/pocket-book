import React, { FC } from 'react'

export interface LoadingProps {
  text?: string;
}

const Loading: FC<LoadingProps> = (props: LoadingProps) => {
  const { text } = props
  return (
    <div className="loading text-center">
      <div className="loading-icon">
        <div className="spinner-border" />
      </div>
      {text && <span className="text">{text}</span>}
    </div>
  )
}

Loading.defaultProps = {
  text: '加载中...'
}

export default Loading
