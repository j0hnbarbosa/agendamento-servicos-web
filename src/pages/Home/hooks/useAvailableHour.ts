
import { useEffect, useState } from "react"

import api from "@/services/api"
import { AvailableUsersProps } from "@/types"

const useAvailableHour = () => {
  const [availableHours, setAvailableHours] = useState<AvailableUsersProps[]>([])

  const fetchAvailableHours = async () => {
    try {
      const res = await api.get<AvailableUsersProps[]>('/availableHours')

      setAvailableHours(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAvailableHours()
  }, [])

  return ({
    availableHours,
  })
}

export default useAvailableHour
