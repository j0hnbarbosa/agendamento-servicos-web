import { useContext } from "react"
import { BridgeGuardContext } from "@/context/BridgeGuard"

import { formatDate, formatHour } from "@/utils/getDateTime"
import { useTranslation } from "react-i18next"
import useAvailableHour from "@/pages/Home/hooks/useAvailableHour"
import CreateAppointmentModal from "@/pages/Home/CreateAppointmentModal"
import Main from "@/components/Main"

function Home() {

  const { isToShow } = useContext(BridgeGuardContext)

  const { t } = useTranslation()

  const {
    availableHours,
    handleRemove,
    handleOnChange,
    handleOnConfirm,
    fields,
    open,
    handleOpen,
    handleClose
  } = useAvailableHour()

  if (!isToShow) return (
    <span className="text-2xl font-bold mb-4">
      {t('home.available-appointments')}
    </span>
  )

  return (
    <>
      <Main>
        <div className='border-b border-gray-500 mb-1 px-2'>
          {t('home.welcome')}
        </div>

        {isToShow && (
          <h1 className='flex justify-center items-center gap-2'>
            {t('home.description')}
            <button
              onClick={handleOpen}
              className="max-w-44"
            >
              {t('home.create-appointment')}
            </button>
          </h1>
        )}

        <section className='flex flex-col justify-center items-center my-4 p-8'>
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
                    {element?.users?.name}
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
                    {element?.workTypes?.name}
                  </td>

                  {<td className='border border-gray-400 p-4'>
                    <button onClick={() => handleRemove(element.id)} className='bg-red-500 text-white p-2 rounded-md hover:bg-red-700'>Remove</button>
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Main>

      <CreateAppointmentModal
        open={open}
        onClose={handleClose}
        onConfirm={handleOnConfirm}
        fields={fields}
        onChange={handleOnChange}
      />

    </>

  )
}

export default Home