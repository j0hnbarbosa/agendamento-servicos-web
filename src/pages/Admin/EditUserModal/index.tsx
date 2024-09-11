import { FC } from 'react'
import Modal from '@/components/Modal'
import FormRegisterUser from '@/components/FormRegisterUser'
import { RegisterUserProps } from '@/components/FormRegisterUser/hooks/useRegisterUser'

interface EditUserModalProps extends RegisterUserProps {
  onClose: () => void
  open: boolean
}

const EditUserModal: FC<EditUserModalProps> = (props) => {
  const {
    onClose,
    open,
    values,
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
        values={values}
        isEdit
        refetchUsers={refetchUsers}
      />

    </Modal>
  )
}

export default EditUserModal