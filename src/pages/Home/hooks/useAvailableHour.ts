
import { useContext, useEffect, useState } from "react"

import api from "@/services/api"
import { AvailableUsersProps, } from "@/types"
import { TempStateContext } from "@/context/TempStateContenxt"

type fieldsType = 'userId' | 'startHour' | 'endHour' | 'workTypeId' | 'date'

const useAvailableHour = () => {
  const [availableHours, setAvailableHours] = useState<AvailableUsersProps[]>([])
  const [fields, setFields] = useState<{ [key in fieldsType] }>()
  const [open, setOpen] = useState(false)

  const {
    showToast
  } = useContext(TempStateContext)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const fetchAvailableHours = async () => {
    try {
      const res = await api.get<AvailableUsersProps[]>('/availableHours')

      setAvailableHours(res.data)
    } catch (error) {
      console.log(error)

      showToast({
        message: JSON.stringify(error),
        type: 'error'
      })
    }
  }

  const handleRemove = async (id: number) => {
    try {
      await api.delete(`/deleteAvailableHour/${id}`)
      fetchAvailableHours()
    } catch (error) {
      console.log(error)

      showToast({
        message: JSON.stringify(error),
        type: 'error'
      })
    }
  }

  const handleOnChange = (key: string, value: any) => {
    setFields((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleOnConfirm = async () => {
    try {
      await api.post('/createAvailableHour', fields)
      await fetchAvailableHours()
      handleClose()

      setFields(undefined)

    } catch (error) {
      console.log(error)

      showToast({
        message: JSON.stringify(error),
        type: 'error'
      })
    }
  }

  useEffect(() => {
    fetchAvailableHours()
  }, [])

  return ({
    availableHours,
    handleRemove,
    handleOnChange,
    handleOnConfirm,
    fields,
    open,
    handleOpen,
    handleClose
  })
}

export default useAvailableHour
