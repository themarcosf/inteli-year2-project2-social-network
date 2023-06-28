import React from 'react'
import styles from './styles.module.scss'

type Props = {
  text: string;
  submit: Function;
  cancel: Function;
}

const DeleteConfirm: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>You really want to delete {props.text}</h2>

      <div className={styles.buttonContainer}>
        <button className={styles.submit} onClick={() => props.submit()}>Yes, delete</button>
        <button className={styles.cancel} onClick={() => props.cancel()}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteConfirm