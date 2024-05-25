import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import api from "../../../services/api";
import Dropdown from "../../../components/Dropdown";
import { UsersProps } from "../../Admin/Admin";

const RegistrationForm = ({
  onChange,
  fields,
  onConfirm,
}) => {
  const [workTypes, setWorkTypes] = useState([]);
  const [users, setUsers] = useState<UsersProps[]>([]);
  const isDisabled = !fields['userId'] || !fields['startHour'] || !fields['endHour'] || !fields['workTypeId'] || !fields['date']

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm()
  };

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
        Nome Prestador:
        <Dropdown
          values={users.map((element) => ({ name: element.name, id: element.id, }))}
          currentValue={fields['userId']}
          onChange={(value) => onChange('userId', value)}
        />
      </label>

      <label>
        Hora Inicio:
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
        Hora Fim:
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
        Date:
        <div>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={fields['date'] || ''}
            onChange={(date: any) => onChange('date', date)}
          />
        </div>
      </label>

      <label>
        Work Type
        <Dropdown
          values={workTypes}
          currentValue={fields['workTypeId']}
          onChange={(value) => onChange('workTypeId', value)}
        />
      </label>

      <button disabled={isDisabled} type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;

