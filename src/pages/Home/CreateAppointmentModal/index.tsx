import FormAvailableTime, { FormAvailableTimeProps } from "@/components/FormAvailableTime"
import Modal from "@/components/Modal"
import { FC } from "react"
import { useTranslation } from "react-i18next"

interface Props extends FormAvailableTimeProps {
  open: boolean
  onClose: () => void
}

const CreateAppointmentModal: FC<Props> = (props) => {
  const {
    open,
    onClose,
    onConfirm,
    onChange,
    fields,
  } = props

  const { t } = useTranslation()

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
      >
        <section className='flex flex-col justify-center items-center my-4 p-8 overflow-y-auto'>
          <span className="text-2xl font-bold">{t('availableTime.register-user')}</span>

          <div className='flex flex-col items-center w-full justify-center'>
            <div className='w-[300px]'>
              <FormAvailableTime
                fields={fields}
                onChange={onChange}
                onConfirm={onConfirm} />
            </div>
          </div>

        </section>
      </Modal>
    </>
  )
}

export default CreateAppointmentModal