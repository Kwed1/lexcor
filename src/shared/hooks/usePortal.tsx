import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const usePortal = (id: string = 'modal-root') => {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    let element = document.getElementById(id)
    let wasCreated = false

    if (!element) {
      element = document.createElement('div')
      element.setAttribute('id', id)
      element.style.position = 'fixed'
      element.style.top = '0'
      element.style.left = '0'
      element.style.width = '100%'
      element.style.height = '100%'
      element.style.pointerEvents = 'none'
      element.style.zIndex = '9999'
      document.body.appendChild(element)
      wasCreated = true
    }

    setContainer(element)

    return () => {
      if (wasCreated && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [id])

  return container
}

interface PortalProps {
  children: React.ReactNode
  id?: string
}

export const Portal: React.FC<PortalProps> = ({ children, id = 'modal-root' }) => {
  const container = usePortal(id)
  
  if (!container) return null
  
  return createPortal(
    <div style={{ pointerEvents: 'auto' }}>
      {children}
    </div>,
    container
  )
}
