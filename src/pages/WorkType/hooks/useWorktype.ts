import { useEffect, useState } from 'react'
import api from '@/services/api'
import { useTranslation } from 'react-i18next'

const useWorktype = () => {
  const [fields, setFields] = useState<{ name?: string }>({})
  const [workTypes, setWorkTypes] = useState([])
  const [tempMessage, setTempMessage] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const { t } = useTranslation()

  const handleOnChange = (key: string, value: any) => {
    setFields((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const fetchWorkTypes = async () => {
    try {
      const res = await api.get('/workTypes')
      setWorkTypes(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnConfirm = async () => {
    try {
      if (fields?.name === '') return ''

      await api.post('/createWorkType', fields)
      await fetchWorkTypes()

      setTempMessage(t('worktype.success-create'))

      setTimeout(() => {
        setTempMessage('')
      }, 2000)

      setFields({})
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = async (id: number) => {
    try {
      await api.delete(`/deleteWorkType/${id}`)
      await fetchWorkTypes()

    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    fetchWorkTypes()
  }, [])

  return ({
    fields,
    workTypes,
    tempMessage,
    openModal,
    handleRemove,
    handleOnConfirm,
    handleOnChange,
    handleOpenModal,
    handleCloseModal
  })
}

export default useWorktype