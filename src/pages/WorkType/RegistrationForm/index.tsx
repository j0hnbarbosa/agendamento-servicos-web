const RegistrationForm = ({
  onChange,
  fields,
  onConfirm,
}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    onConfirm()
  }

  return (
    <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={fields['name'] || ''} onChange={e => onChange('name', e.target.value)} />
      </label>
      <br />

      <br />
      <button disabled={!fields['name']} type="submit">Register</button>
    </form>
  )
}

export default RegistrationForm

