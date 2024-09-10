import { useEffect, useState } from 'react'
import api from '@/services/api'
import { User } from '@/types'

const useUser = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id: number) => {
    setLoading(true)

    try {
      await api.delete(`/deleteUser/${id}`)
      setUsers(users.filter((user) => user.id !== id))

    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resp = await api.get<User[]>('/users')
        setUsers(resp.data)

      } catch (error) {
        console.log(error)
      }
    }

    fetchUsers()
  }, [])

  return ({
    users,
    handleDelete,
    loading
  })
}

export default useUser