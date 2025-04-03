
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Initialize value on mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}

export function useViewportSize() {
  const [size, setSize] = React.useState({
    width: 0,
    height: 0
  })

  React.useEffect(() => {
    // Initialize values on mount
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}
