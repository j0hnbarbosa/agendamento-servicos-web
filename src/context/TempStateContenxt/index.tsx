import { createContext, useState } from 'react'

export interface AvailableTimeProps {
  date: Date
  workType: string
  hour: Date
  name: string
}

interface TempStateContextProps {
  setFields: (fields: AvailableTimeProps[]) => void
  fields: AvailableTimeProps[]
}

export const TempStateContext = createContext({} as TempStateContextProps)

export const TempStateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [fields, setFields] = useState<AvailableTimeProps[]>([])

  console.log('fields', fields)
  const values = {
    setFields,
    fields
  }

  return (
    <TempStateContext.Provider value={values}>
      {children}
    </TempStateContext.Provider>
  )
}
