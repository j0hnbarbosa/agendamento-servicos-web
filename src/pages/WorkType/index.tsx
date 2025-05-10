import useWorktype from '@/pages/WorkType/hooks/useWorktype'
import { useTranslation } from 'react-i18next'
import ModalCreate from '@/pages/WorkType/ModalCreate'
import Main from '@/components/Main'

const WorkType = () => {
  const { t } = useTranslation()

  const {
    fields,
    workTypes,
    tempMessage,
    openModal,
    handleRemove,
    handleOnChange,
    handleOnConfirm,
    handleOpenModal,
    handleCloseModal
  } = useWorktype()

  return (
    <>
      <Main>
        <div className='border-b border-gray-500 mb-1 px-2'>
          {t('worktype.title')}
        </div>

        <div className='flex justify-center'>
          <button className='max-w-52' onClick={handleOpenModal}>
            {t('worktype.register-new-work')}
          </button>
        </div>

        <div className='flex w-full justify-center flex-col items-center overflow-y-auto h-[90%]'>
          <div className='w-[300px]'>
            {tempMessage && (
              <div className='text-green-600'>
                {tempMessage}
              </div>
            )}
          </div>
        </div>

        <div className='flex justify-center'>
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
            </table>
          )}
        </div>
      </Main>

      < ModalCreate
        open={openModal}
        onClose={handleCloseModal}
        fields={fields}
        onChange={handleOnChange}
        onConfirm={handleOnConfirm}
      />

    </>
  )
}

export default WorkType