import { useCallback, useEffect, useState } from "react"

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
  // State to manage the toast message, type, and visibility
  const [toastState, setToastState] = useState({
    message: '',
    type: 'success', // default type
    isVisible: false,
  } as ToastState)

  // Effect to handle the auto-hiding of the toast
  useEffect(() => {
    let timer
    if (toastState.isVisible) {
      // Set a timer to hide the toast after the specified duration
      timer = setTimeout(() => {
        setToastState(prevState => ({ ...prevState, isVisible: false }))
      }, duration)
    }

    // Cleanup function to clear the timer if the component unmounts
    // or if the toast visibility changes before the timer finishes
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [toastState.isVisible, duration]) // Re-run effect when isVisible or duration changes

  /**
   * Function to show a toast message.
   * @param {string} message - The message to display in the toast.
   * @param {'success' | 'warning' | 'error'} type - The type of toast (determines styling).
   */
  const showToast = useCallback(({ message, type = 'success' }: ToastState) => {
    setToastState({
      message,
      type,
      isVisible: true,
    })
  }, []) // useCallback memoizes the function

  // Return the toast state and the function to show the toast
  return {
    toastState,
    showToast,
  }
}