import { useContext, useEffect, useState } from "react"
import { BridgeGuardContext } from "@/context/BridgeGuard"
import api from "@/services/api"
import { AvailableUsersProps } from "@/types"
import { formatDate, formatHour } from "@/utils/getDateTime"

function Home() {

  const context = useContext(BridgeGuardContext)

  const [availableHours, setAvailableHours] = useState<AvailableUsersProps[]>([])

  const fetchAvailableHours = async () => {
    try {
      const res = await api.get<AvailableUsersProps[]>('/availableHours')

      setAvailableHours(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAvailableHours()
  }, [])

  return (
    <>
      <h1 className='flex justify-center mb-8'>
        Hello this is the App to schedule appointments
      </h1>

      {context.isToShow && (
        <h1 className='flex justify-center'>
          To schedule an appointment, please go to the <span className="font-bold ml-1 mr-1">CADASTRAR HORÁRIO</span> page
        </h1>
      )}

      <section className='flex flex-col justify-center items-center my-4 p-8 border border-gray-500'>
        <span className="text-2xl font-bold mb-4">Available Appointments</span>

        <table>
          <thead className='border border-gray-400'>
            <tr>
              <th className='border border-gray-400 p-4'>ID</th>
              <th className='border border-gray-400 p-4'>Nome Provedor do Trabalho</th>
              <th className='border border-gray-400 p-4'>Data</th>
              <th className='border border-gray-400 p-4'>Hora Inicio</th>
              <th className='border border-gray-400 p-4'>Hora Fim</th>
              <th className='border border-gray-400 p-4'>Tipo Trabalho Provido</th>
            </tr>
          </thead>

          <tbody>
            {availableHours?.length > 0 && availableHours?.map((element) => (
              <tr key={element?.id}>
                <td className='border border-gray-400 p-4'>
                  {element?.id}
                </td>
                <td className='border border-gray-400 p-4'>
                  {element?.users.name}
                </td>
                <td className='border border-gray-400 p-4'>
                  {formatDate(element?.date)}
                </td>
                <td className='border border-gray-400 p-4'>
                  {formatHour(element?.start_hour)}
                </td>
                <td className='border border-gray-400 p-4'>
                  {formatHour(element?.end_hour)}
                </td>
                <td className='border border-gray-400 p-4'>
                  {element?.workTypes.name}
                </td>

                {/* {<td className='border border-gray-400 p-4'>
                  <button onClick={() => onRemove(index)} className='bg-red-500 text-white p-2 rounded-md hover:bg-red-700'>Remove</button>
                </td>} */}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </>

  )
}

export default Home