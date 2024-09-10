import RegistrationForm from "@/pages/WorkType/RegistrationForm"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Props } from "@/pages/WorkType/RegistrationForm"
import Modal from "@/components/Modal"

interface ModalCreateProps extends Props {
  open: boolean
  onClose: () => void
}

const ModalCreate: FC<ModalCreateProps> = (props) => {
  const { t } = useTranslation()

  const {
    open,
    onClose,
    fields,
    onChange,
    onConfirm
  } = props

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <>
        <section className='flex flex-col justify-center items-center my-4 p-8'>
          <span className="text-2xl font-bold">
            {t('worktype.register')}
          </span>
          <span className="text-sm mb-8">
            {t('worktype.register-description')}
          </span>

          <div className='flex w-full justify-center flex-col items-center'>
            <div className='w-[300px]'>
              <RegistrationForm
                fields={fields}
                onChange={onChange}
                onConfirm={handleConfirm} />
            </div>
          </div>
        </section >
      </>
    </Modal>
  )
}

export default ModalCreate