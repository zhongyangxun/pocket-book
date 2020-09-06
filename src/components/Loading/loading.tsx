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
      <span className="text">加载中...</span>
      {text && text}

    </div>
  )
}

export default Loading
