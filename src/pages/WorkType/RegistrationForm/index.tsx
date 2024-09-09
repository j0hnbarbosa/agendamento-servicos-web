import { useTranslation } from "react-i18next"

const RegistrationForm = ({
  onChange,
  fields,
  onConfirm,
}) => {
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()
    onConfirm()
  }

  return (
    <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
      <label>
        {t('worktype.name')}
        <input type="text" value={fields['name'] || ''} onChange={e => onChange('name', e.target.value)} />
      </label>
      <br />

      <br />
      <button disabled={!fields['name']} type="submit">
        {t('worktype.register')}
      </button>
    </form>
  )
}

export default RegistrationForm

