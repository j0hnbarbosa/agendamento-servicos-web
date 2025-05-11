import { useEffect, useState } from "react"

interface ToastState {
  message: string
  type: 'success' | 'warning' | 'error'
  isVisible?: boolean
}

/**
 * Custom React hook to manage toast notifications.
 * Provides state and a function to show toast messages.
 * The toast automatically hides after a specified duration.
 */
export const useToast = (duration = 5000) => {
  const [toastState, setToastState] = useState({
    message: '',
    type: 'success',
    isVisible: false,
  } as ToastState)

  useEffect(() => {
    let timer
    if (toastState.isVisible) {
      timer = setTimeout(() => {
        setToastState(prevState => ({ ...prevState, isVisible: false }))
      }, duration)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [toastState.isVisible, duration])

  /**
   * Function to show a toast message.
   * @param {string} message - The message to display in the toast.
   * @param {'success' | 'warning' | 'error'} type - The type of toast (determines styling).
   */
  const showToast = ({ message, type = 'success' }: ToastState) => {
    setToastState({
      message,
      type,
      isVisible: true,
    })
  }

  return {
    toastState,
    showToast,
  }
}