export const getError = (error: any): string => {
  return error?.response?.data?.message || error?.message || 'An error occurred'
} 