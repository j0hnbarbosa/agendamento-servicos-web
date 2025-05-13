import { FC } from "react"
import { useTranslation } from "react-i18next"
import { RegisterUserProps, useRegisterUser } from "@/components/FormRegisterUser/hooks/useRegisterUser"
// import FileUpload from "@/components/FileUpload"

const FormRegisterUser: FC<RegisterUserProps> = (props) => {
  const { t } = useTranslation()

  const {
    isSignup = true,
    onClose,
    values,
    isEdit,
    refetchUsers
  } = props

  const {
    name,
    email,
    password,
    isProvider,
    error,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleIsProviderChange,
    handleSubmit
  } = useRegisterUser({ isSignup, onClose, values, isEdit, refetchUsers })

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{t('signup.title')}</h2>

      {/* <FileUpload /> */}

      <div className="mb-4">
        <label htmlFor="name">
          {t('signup.name')}
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email">
          {t('signup.email')}
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password">
          {t('signup.password')}
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required={!isEdit}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="isProvider"
          className='select-none flex items-center whitespace-nowrap hover:cursor-pointer'
        >
          {t('signup.is-provider')}
          <input
            type="checkbox"
            id="isProvider"
            checked={isProvider}
            className='w-fit ml-3 hover:cursor-pointer'
            onChange={handleIsProviderChange}
          />
        </label>
      </div>

      {
        error && <div className="text-red-700 py-3 font-bold text-sm">{error}</div>
      }

      <button type="submit">
        {isEdit ? t('signup.edit-btn') : t('signup.signup-btn')}
      </button>
    </form>
  )
}

export default FormRegisterUser