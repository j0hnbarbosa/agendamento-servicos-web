import { useEffect, useState } from 'react'
import api from '@/services/api'
import { User } from '@/types'

const useUser = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [currenUserToEdit, setCurrentUserToEdit] = useState<User>()
  const [openEditModal, setOpenEditModal] = useState(false)

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

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false)
  }

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true)
  }

  const handleOpenEditModal = (user: User) => {
    setCurrentUserToEdit(user)
    setOpenEditModal(true)
  }

  const handleCloseEditModal = () => {
    setCurrentUserToEdit(undefined)
    setOpenEditModal(false)
  }

  const fetchUsers = async () => {
    try {
      const resp = await api.get<User[]>('/users')
      setUsers(resp.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return ({
    users,
    handleDelete,
    loading,
    openCreateModal,
    handleCloseCreateModal,
    handleOpenCreateModal,
    handleOpenEditModal,
    currenUserToEdit,
    handleCloseEditModal,
    openEditModal,
    fetchUsers
  })
}

export default useUser