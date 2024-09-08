import { AvailableTimeProps } from "@/context/TempStateContenxt"
import { formatDate, formatHour } from "@/utils/getDateTime"

interface TableDateProps {
  values: AvailableTimeProps[]
  onRemove?: (id: number) => void
}

function TableDate({ values, onRemove }: TableDateProps) {
  return (
    <section className='flex flex-col justify-center items-center my-4 p-8 border border-gray-500'>
      <span className="text-2xl font-bold">Available Time</span>

      <table>
        <thead className='border border-gray-400'>
          <tr>
            <th className='border border-gray-400 p-4'>Date</th>
            <th className='border border-gray-400 p-4'>Name</th>
            <th className='border border-gray-400 p-4'>Hour</th>
            <th className='border border-gray-400 p-4'>Work Type</th>
          </tr>
        </thead>

        <tbody>
          {values?.length > 0 && values?.map((element, index) => (
            <tr key={`${index}-${element.name}`}>
              <td className='border border-gray-400 p-4'>
                {element?.name}
              </td>
              <td className='border border-gray-400 p-4'>
                {formatHour(element?.hour)}
              </td>
              <td className='border border-gray-400 p-4'>
                {element?.workType}
              </td>
              <td className='border border-gray-400 p-4'>
                {formatDate(element?.date)}
              </td>
              {onRemove && <td className='border border-gray-400 p-4'>
                <button onClick={() => onRemove(index)} className='bg-red-500 text-white p-2 rounded-md hover:bg-red-700'>Remove</button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default TableDate