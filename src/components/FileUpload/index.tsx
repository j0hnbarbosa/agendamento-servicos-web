import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"

const FileUpload = () => {
  const [file, setFile] = useState(null)
  const inputUploadRef = useRef(null)

  const { t } = useTranslation()

  const handleFileUpload = async (event) => {

    const file = event.target.files[0]
    const formData = new FormData()

    formData.append("file", file)

    setFile(URL.createObjectURL(file))
  }

  const handleClick = () => {
    inputUploadRef.current.click()
  }

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
      >
        {t('admin.profile-pic-upload')}
      </button>

      {file &&
        <div className="flex justify-center p-4">
          <img
            className="object-cover"
            width={32}
            height={32}
            src={file || ''}
            alt={t('admin.profile-pic-upload')}
          />
        </div>
      }

      <input
        ref={inputUploadRef}
        className="hidden"
        type="file"
        onChange={handleFileUpload}
      />
    </>
  )
}

export default FileUpload