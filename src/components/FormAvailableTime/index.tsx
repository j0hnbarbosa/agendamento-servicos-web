import { useState, useEffect, FC, useContext } from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

import api from "@/services/api"
import Dropdown from "@/components/Dropdown"
import { User } from "@/types"
import { useTranslation } from "react-i18next"
import { TempStateContext } from "@/context/TempStateContenxt"

type fieldsType = 'userId' | 'startHour' | 'endHour' | 'workTypeId' | 'date'

export interface FormAvailableTimeProps {
  onChange: (key: string, value: any) => void
  fields: {[key in fieldsType]: any}
  onConfirm: () => void
}

const FormAvailableTime: FC<FormAvailableTimeProps> = ({
  onChange,
  fields = {},
  onConfirm,
}) => {
  const [workTypes, setWorkTypes] = useState([])
  const [users, setUsers] = useState<User[]>([])
  const isDisabled = !fields['userId'] || !fields['startHour'] || !fields['endHour'] || !fields['workTypeId'] || !fields['date']

  const { t } = useTranslation()

    const {
      showToast
    } = useContext(TempStateContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    onConfirm()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/workTypes')
        setWorkTypes(res.data)

        const resp = await api.get<User[]>('/users')
        setUsers(resp.data)
      } catch (error) {
        showToast({
          message: JSON.stringify(error),
          type: 'error'
        })
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
      <label>
        {t('availableTime.name-provider')}
        <Dropdown
          values={users.map((element) => ({ name: element.name, id: element.id, }))}
          currentValue={fields['userId']}
          onChange={(value) => onChange('userId', value)}
        />
      </label>

      <label className="w-fit">
        {t('availableTime.start-hour')}
        <div>
          <DatePicker
            selected={fields['startHour'] || ''}
            onChange={(date: any) => onChange('startHour', date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Hour"
            dateFormat="HH:mm"
          />
        </div>
      </label>

      <label className="w-fit">
        {t('availableTime.end-hour')}
        <div>
          <DatePicker
            selected={fields['endHour'] || ''}
            onChange={(date: any) => onChange('endHour', date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            // timeCaption="Hour"
            dateFormat="HH:mm"
          />
        </div>
      </label>

      <label className="w-fit">
        {t('availableTime.date')}
        <div>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={fields['date'] || ''}
            onChange={(date: any) => onChange('date', date)}
            minDate={new Date()}
          />
        </div>
      </label>

      <label>
        {t('availableTime.work-type')}
        <Dropdown
          values={workTypes}
          currentValue={fields['workTypeId']}
          onChange={(value) => onChange('workTypeId', value)}
        />
      </label>

      <button disabled={isDisabled} type="submit">
        {t('availableTime.register')}
      </button>
    </form>
  )
}

export default FormAvailableTime

