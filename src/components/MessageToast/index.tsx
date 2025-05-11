// Simple Tailwind CSS classes for styling the toast
// Assumes Tailwind CSS is set up in your project
const toastClasses = {
  base: 'fixed top-5 right-5 p-4 rounded-md shadow-lg text-white transition-opacity duration-300 ease-in-out z-50', // Added z-50 for high stacking context
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  hidden: 'opacity-0 pointer-events-none',
  visible: 'opacity-100',
}

/**
 * Simple Toast component to display messages.
 * Renders a toast notification based on the state provided.
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
