import { useRouteError } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function ErrorPage() {
  const error = useRouteError() as any

  const { t } = useTranslation()

  console.error(error)

  return (
    <div className="my-10 font-bold text-lg flex flex-col justify-cente items-center">
      <h1>{t('error.oops')}</h1>
      <p>{t('error.unexpected-error')}</p>
      <p className="text-red-600">
        <i>{error.statusText || error.message}</i>
      </p>
        <a className="text-blue-500 hover:underline" href="/">
        {t('error.back-home')}
        </a>
    </div>
  )
}