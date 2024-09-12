import { useState } from 'react'

type ValuesProps = { name: string, id: number }

interface Props {
  values: ValuesProps[]
  currentValue: number
  onChange: (value: any) => void
}

function Dropdown({
  values,
  currentValue,
  onChange
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const currentValueInput = values.find((element) => element.id === currentValue)

  return (

    <div className="relative">
      <input
        type="text"
        onChange={() => { }}
        onClick={(e) => {
          e.preventDefault()

          setIsOpen(!isOpen)
        }}
        value={currentValueInput?.name || ''}
      />

      {isOpen && (
        <div className="z-10 overflow-y-scroll max-h-64 absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg ">
          <ul>
            {values && values.map((element: ValuesProps) => (
              <li
                key={element.id}
                className="py-2 px-4 hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault()

                  onChange(element.id)
                  setIsOpen(false)
                }}>
                {element.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown