import { RefObject, useEffect } from 'react'

const useClickOutside = (ref: RefObject<HTMLElement>, handler: Function) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const targetNode = event.target as Node
      if (!ref.current || ref.current.contains(targetNode)) {
        return
      }
      handler(event)
    }
    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutside
