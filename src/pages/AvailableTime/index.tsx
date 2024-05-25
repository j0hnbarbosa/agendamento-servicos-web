import { useContext, useState } from 'react'
import RegistrationForm from './RegistrationForm';
import { TempStateContext } from '../../context/TempStateContenxt';
import TableDate from '../../components/TableDate';
import api from '../../services/api';

const AvailableTime = () => {
  const [fields, setFields] = useState({});
  const [tempMessage, setTempMessage] = useState('')

  const context = useContext(TempStateContext)

  const handleOnChange = (key: string, value: any) => {
    setFields((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleOnConfirm = async () => {
    try {
      await api.post('/createAvailableHour', fields)

      setTempMessage('Created successfully')

      setTimeout(() => {
        setTempMessage('')
      }, 2000)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div>Available Time</div>
      <section className='flex flex-col justify-center items-center my-4 p-8 border border-gray-500'>
        <span className="text-2xl font-bold">Register</span>

        <div className='flex flex-col items-center w-full justify-center'>
          <div className='w-[300px]'>
            <RegistrationForm
              fields={fields}
              onChange={handleOnChange}
              onConfirm={handleOnConfirm} />
          </div>

          {tempMessage && (
            <div className='text-green-600 mt-3'>
              {tempMessage}
            </div>)}
        </div>

      </section>

      {context.fields.length > 0 && (
        <TableDate
          values={context.fields}
        />)}
    </>
  )
}
export default AvailableTime