import { useEffect, useState } from 'react'
import './Admin.css'
import api from '../../services/api'

export interface UsersProps {
  id: number
  name: string
  email: string
  isProvider: boolean
}

const Admin = () => {
  const [users, setUsers] = useState<UsersProps[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resp = await api.get<UsersProps[]>('/users')
        setUsers(resp.data)

      } catch (error) {
        console.log(error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h1>Admin Page</h1>

      <section className='flex flex-col justify-center items-center my-4 p-8 border border-gray-500'>
        <span className="text-2xl font-bold">Available Users</span>

        <table>
          <thead className='border border-gray-400'>
            <tr>
              <th className='border border-gray-400 p-4'>ID</th>
              <th className='border border-gray-400 p-4'>Name</th>
              <th className='border border-gray-400 p-4'>Email</th>
              <th className='border border-gray-400 p-4'>Is Provider</th>
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

                {/* {<td className='border border-gray-400 p-4'>
                  <button onClick={() => onRemove(index)} className='bg-red-500 text-white p-2 rounded-md hover:bg-red-700'>Remove</button>
                </td>} */}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Admin