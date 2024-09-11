import { FC } from 'react'
import Modal from '@/components/Modal'
import FormRegisterUser from '@/components/FormRegisterUser'
import { RegisterUserProps } from '@/components/FormRegisterUser/hooks/useRegisterUser'

interface CreateUserModalProps extends RegisterUserProps {
  onClose: () => void
  open: boolean
}

const CreateUserModal: FC<CreateUserModalProps> = (props) => {
  const {
    onClose,
    open,
    refetchUsers
  } = props

  return (
    <Modal
      onClose={onClose}
      open={open}
      className='min-w-96 p-4'
    >
      <FormRegisterUser
        isSignup={false}
        onClose={onClose}
        refetchUsers={refetchUsers}
      />

    </Modal>
  )
}

export default CreateUserModal