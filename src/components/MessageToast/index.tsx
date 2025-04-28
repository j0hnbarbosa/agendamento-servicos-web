import { useState, useEffect, useCallback } from 'react'
// Removed createPortal import

// Simple Tailwind CSS classes for styling the toast
// Assumes Tailwind CSS is set up in your project
const toastClasses = {
  base: 'fixed bottom-5 right-5 p-4 rounded-md shadow-lg text-white transition-opacity duration-300 ease-in-out z-50', // Added z-50 for high stacking context
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  hidden: 'opacity-0 pointer-events-none',
  visible: 'opacity-100',
}

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

/**
 * Simple Toast component to display messages.
 * Renders a toast notification based on the state provided by the useToast hook.
 * This version renders directly within the component tree (no Portal).
 */
export const Toast = ({ message, type, isVisible }) => {
  // Determine the CSS classes based on the toast type and visibility
  const typeClass = toastClasses[type] || toastClasses.success
  const visibilityClass = isVisible ? toastClasses.visible : toastClasses.hidden

  // Don't render anything if not visible
  if (!isVisible && visibilityClass === toastClasses.hidden) {
    return null
  }

  // Render the toast element directly
  return (
    <div className={`${toastClasses.base} ${typeClass} ${visibilityClass}`}>
      {message}
    </div>
  )
}
