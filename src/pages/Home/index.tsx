import { useContext, useEffect, useState } from "react"
import { BridgeGuardContext } from "@/context/BridgeGuard"
import api from "@/services/api"
import { AvailableUsersProps } from "@/types"
import { formatDate, formatHour } from "@/utils/getDateTime"
import { useTranslation } from "react-i18next"

function Home() {

  const context = useContext(BridgeGuardContext)

  const { t } = useTranslation()

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

  return (
    <>
      <h1 className='flex justify-center mb-8'>
        {t('home.welcome')}

      </h1>

      {context.isToShow && (
        <h1 className='flex justify-center'>
          {t('home.description')} <span className="font-bold ml-1 mr-1">{t('home.register-time')}</span>
        </h1>
      )}

      <section className='flex flex-col justify-center items-center my-4 p-8 border border-gray-500'>
        <span className="text-2xl font-bold mb-4">
          {t('home.available-appointments')}
        </span>

        <table>
          <thead className='border border-gray-400'>
            <tr>
              <th className='border border-gray-400 p-4'>{t('home.id')}</th>
              <th className='border border-gray-400 p-4'>{t('home.worker')}</th>
              <th className='border border-gray-400 p-4'>{t('home.date')}</th>
              <th className='border border-gray-400 p-4'>{t('home.start-time')}</th>
              <th className='border border-gray-400 p-4'>{t('home.end-time')}</th>
              <th className='border border-gray-400 p-4'>{t('home.type-work')}</th>
            </tr>
          </thead>

          <tbody>
            {availableHours?.length > 0 && availableHours?.map((element) => (
              <tr key={element?.id}>
                <td className='border border-gray-400 p-4'>
                  {element?.id}
                </td>
                <td className='border border-gray-400 p-4'>
                  {element?.users.name}
                </td>
                <td className='border border-gray-400 p-4'>
                  {formatDate(element?.date)}
                </td>
                <td className='border border-gray-400 p-4'>
                  {formatHour(element?.start_hour)}
                </td>
                <td className='border border-gray-400 p-4'>
                  {formatHour(element?.end_hour)}
                </td>
                <td className='border border-gray-400 p-4'>
                  {element?.workTypes.name}
                </td>

                {/* {<td className='border border-gray-400 p-4'>
                  <button onClick={() => onRemove(index)} className='bg-red-500 text-white p-2 rounded-md hover:bg-red-700'>Remove</button>
                </td>} */}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </>

  )
}

export default Home