import { Toast } from '@/components/MessageToast'
import { useToast } from '@/components/MessageToast/hooks/useToast'
import { createContext, useState } from 'react'

export interface AvailableTimeProps {
  date: string
  workType: string
  hour: string
  name: string
}

interface TempStateContextProps {
  setFields: (fields: AvailableTimeProps[]) => void
  fields: AvailableTimeProps[]
  showToast: ({
    message,
    type
  }: {
    message: string
    type: 'success' | 'error' | 'warning'
  }) => void
}

export const TempStateContext = createContext({} as TempStateContextProps)

export const TempStateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [fields, setFields] = useState<AvailableTimeProps[]>([])
  const { showToast, toastState } = useToast()

  const values = {
    setFields,
    fields,
    showToast
  }

  return (

    <TempStateContext.Provider value={values}>
      <>
        <Toast
          isVisible={toastState.isVisible}
          message={toastState.message}
          type={toastState.type}
        />

        {children}
      </>
    </TempStateContext.Provider>
  )
}
