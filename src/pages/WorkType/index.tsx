import { useState } from 'react'
import RegistrationForm from './RegistrationForm'
import api from '../../services/api'
import { useTranslation } from 'react-i18next'

const WorkType = () => {
  const [fields, setFields] = useState<{ name?: string }>({})
  const [workTypes, setWorkTypes] = useState([])
  const [tempMessage, setTempMessage] = useState('')

  const { t } = useTranslation()

  const handleOnChange = (key: string, value: any) => {
    setFields((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleOnConfirm = async () => {
    try {
      if (fields?.name === '') return ''

      await api.post('/createWorkType', fields)
      const res = await api.get('/workTypes')

      setTempMessage(t('worktype.success-create'))

      setTimeout(() => {
        setTempMessage('')
      }, 2000)

      setWorkTypes(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = async (id: number) => {
    try {
      await api.delete(`/workType/${id}`)
      const res = await api.get('/workTypes')

      setWorkTypes(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        {t('worktype.title')}
      </div>
      <section className='flex flex-col justify-center items-center my-4 p-8 border border-gray-500'>
        <span className="text-2xl font-bold">
          {t('worktype.register')}
        </span>
        <span className="text-sm mb-8">
          {t('worktype.register-description')}
        </span>

        <div className='flex w-full justify-center flex-col items-center'>
          <div className='w-[300px]'>
            <RegistrationForm
              fields={fields}
              onChange={handleOnChange}
              onConfirm={handleOnConfirm} />
          </div>
          {tempMessage && (
            <div className='text-green-600'>
              {tempMessage}
            </div>)}
        </div>

        {workTypes.length > 0 && (
          <table className='mt-10'>
            <thead className='border border-gray-400'>
              <tr>
                <th className='border border-gray-400 p-2'>
                  {t('worktype.work-type')}
                </th>
              </tr>
            </thead>

            {workTypes.map((element: { name: string, id: number }) => (
              <tr key={element.id}>
                <td className='border border-gray-400 p-2'>
                  {element?.name}
                </td>
                {<td className='border border-gray-400 p-4' >
                  <button
                    onClick={() => handleRemove(element.id)}
                    className='bg-red-500 text-white p-2 rounded-md hover:bg-red-700'
                  >
                    {t('worktype.remove')}
                  </button>
                </td>}
              </tr>
            ))}
          </table>)
        }
      </section >

    </>
  )
}

export default WorkType