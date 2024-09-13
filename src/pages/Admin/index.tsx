import { useTranslation } from 'react-i18next'
import useUser from '@/pages/Admin/hooks/useUser'
import Main from '@/components/Main'
import CreateUserModal from './CreateUserModal'
import EditUserModal from './EditUserModal'

const Admin = () => {
  const { t } = useTranslation()

  const {
    users,
    handleDelete,
    openCreateModal,
    handleCloseCreateModal,
    handleOpenCreateModal,
    handleOpenEditModal,
    currenUserToEdit,
    handleCloseEditModal,
    openEditModal,
    fetchUsers
  } = useUser()

  console.log('currenUserToEdit', currenUserToEdit)

  return (
    <>
      <Main>
        <div>
          <div className='border-b border-gray-500 mb-1 px-2'>
            {t("admin.title")}
          </div>

          <div className='flex justify-center w-full p-x'>
            <button
              onClick={handleOpenCreateModal}
              className='max-w-[180px] text-white p-2 rounded-md'>
              {t('admin.create')}
            </button>
          </div>

          <section className='flex flex-col justify-center items-center my-4 p-8'>
            <span className="text-2xl font-bold">
              {t('admin.available-users')}
            </span>

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

                    <td className='border border-gray-400 p-4'>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => handleOpenEditModal(element)}
                          className='bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-700'>
                          {t('admin.edit')}
                        </button>
                        <button
                          onClick={() => handleDelete(element?.id)}
                          className='bg-red-500 text-white p-2 rounded-md hover:bg-red-700'>
                          {t('admin.delete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </Main>

      <CreateUserModal
        onClose={handleCloseCreateModal}
        open={openCreateModal}
        refetchUsers={fetchUsers}
      />

      <EditUserModal
        onClose={handleCloseEditModal}
        open={openEditModal}
        values={currenUserToEdit}
        refetchUsers={fetchUsers}
      />

    </>
  )
}

export default Admin