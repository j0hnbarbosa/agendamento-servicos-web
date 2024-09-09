import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

import api from "@/services/api"
import Dropdown from "@/components/Dropdown"
import { UsersProps } from "@/pages/Admin"
import { useTranslation } from "react-i18next"

const RegistrationForm = ({
  onChange,
  fields,
  onConfirm,
}) => {
  const [workTypes, setWorkTypes] = useState([])
  const [users, setUsers] = useState<UsersProps[]>([])
  const isDisabled = !fields['userId'] || !fields['startHour'] || !fields['endHour'] || !fields['workTypeId'] || !fields['date']

  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()
    onConfirm()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/workTypes')
        setWorkTypes(res.data)

        const resp = await api.get<UsersProps[]>('/users')
        setUsers(resp.data)
      } catch (error) {
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

      <label>
        {t('availableTime.start-hour')}
        <div>
          <DatePicker
            selected={fields['startHour'] || ''}
            onChange={(date: any) => onChange('startHour', date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Hour"
            dateFormat="HH:MM"
          />
        </div>
      </label>

      <label>
        {t('availableTime.end-hour')}
        <div>
          <DatePicker
            selected={fields['endHour'] || ''}
            onChange={(date: any) => onChange('endHour', date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Hour"
            dateFormat="HH:MM"
          />
        </div>
      </label>

      <label>
        {t('availableTime.date')}
        <div>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={fields['date'] || ''}
            onChange={(date: any) => onChange('date', date)}
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

export default RegistrationForm

