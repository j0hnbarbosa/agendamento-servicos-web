import { FC, PropsWithChildren } from 'react'
import styles from './Modal.module.scss'

interface ModalProps extends PropsWithChildren {
  open: boolean
  onClose: () => void
  className?: string
}

const Modal: FC<ModalProps> = (props) => {
  const {
    open,
    children,
    onClose,
    className
  } = props

  if (!open) return null

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.centered}>
        <div className={`${styles.modal} ${className}`}>
          {children}
        </div>
      </div>
    </>

  )
}

export default Modal