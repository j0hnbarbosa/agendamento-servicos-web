import { useTranslation } from 'react-i18next'
import useUser from '@/pages/Admin/hooks/useUser'

const Admin = () => {
  const { t } = useTranslation()

  const { users, handleDelete } = useUser()

  return (
    <div>
      <h1>{t("admin.title")}</h1>

      <section className='flex flex-col justify-center items-center my-4 p-8 border border-gray-500'>
        <span className="text-2xl font-bold">{t('admin.available-users')}</span>

        <table>
          <thead className='border border-gray-400'>
            <tr>
              <th className='border border-gray-400 p-4'>{t('admin.id')}</th>
              <th className='border border-gray-400 p-4'>{t('admin.name')}</th>
              <th className='border border-gray-400 p-4'>{t('admin.email')}</th>
              <th className='border border-gray-400 p-4'>{t('admin.is-provider')}</th>
            </tr>
          </thead>

          <tbody>
            {users?.length > 0 && users?.map((element) => (
              <tr key={element?.id}>
                <td className='border border-gray-400 p-4'>
                  {element?.id}
                </td>
                <td className='border border-gray-400 p-4'>
                  {element?.name}
                </td>
                <td className='border border-gray-400 p-4'>
                  {element?.email}
                </td>
                <td className='border border-gray-400 p-4'>
                  {element?.isProvider ? 'Yes' : 'No'}
                </td>

                {<td className='border border-gray-400 p-4'>
                  <button
                    onClick={() => handleDelete(element?.id)}
                    className='bg-red-500 text-white p-2 rounded-md hover:bg-red-700'>
                    {t('admin.delete')}
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Admin